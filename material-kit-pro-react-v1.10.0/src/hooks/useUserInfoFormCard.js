import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "graphql/mutation";
import { PROFILE } from "graphql/query";
import { useReducer, useState } from "react";
import { phoneNumberReducer } from "reducers";
import useFocusOnClickEditButton from "./useFocusOnClickEditButton";
import useSetInitialUserInfo from "./useSetInitialUserInfo";

export default function useUserInfoFormCard({ userInfoFromServer }) {
  // state 및 handler 생성
  const [name, setName] = useState("");
  const [{ firstNumber, secondNumber, thirdNumber }, dispatch] = useReducer(
    phoneNumberReducer,
    {
      firstNumber: "010",
      secondNumber: "",
      thirdNumber: "",
    }
  );
  const [email, setEmail] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const disabled = isEditing ? false : true;

  // '수정하기'버튼을 클릭했을 때 nameInput에 focus하기
  const nameInputRef = useFocusOnClickEditButton({
    isEditing,
  });

  // 서버에서 받아온 사용자 정보로 초기값 세팅하기
  useSetInitialUserInfo({
    userInfoFromServer,
    setName,
    dispatch,
    setEmail,
  });

  // props making
  const nameInputProps = {
    inputProps: {
      disabled,
      inputRef: nameInputRef,
      value: name,
      onChange: (e) => setName(e.target.value),
    },
  };

  const phoneNumberFormProps = {
    disabled,
    customSelectPropsForFirstNumber: {
      value: firstNumber,
      onChange: (e) => dispatch({ type: "firstNumber", value: e.target.value }),
    },
    customInputPropsForSecondNumber: {
      inputProps: {
        value: secondNumber,
        onChange: (e) =>
          dispatch({ type: "secondNumber", value: e.target.value }),
      },
    },
    customInputPropsForThirdNumber: {
      inputProps: {
        value: thirdNumber,
        onChange: (e) =>
          dispatch({ type: "thirdNumber", value: e.target.value }),
      },
    },
  };

  const emailInputProps = {
    inputProps: {
      disabled,
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
  };

  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const floatRightButtonProps = {
    children: isEditing ? "저장하기" : "수정하기",
    buttonProps: {
      color: isEditing ? "info" : "primary",
      onClick: () => {
        // 수정시작
        if (!isEditing) return setIsEditing(true);

        const phone = `${firstNumber}-${secondNumber}-${thirdNumber}`;

        // 바뀐 값이 없다면 서버로 요청 보내지 않고 종료
        if (
          name === userInfoFromServer.name &&
          phone === userInfoFromServer.phone &&
          email === userInfoFromServer.email
        ) {
          return setIsEditing(false);
        }

        // 서버로 update요청을 보내 응답받은 값으로 화면 재렌더링
        updateProfile({
          variables: {
            updateUserInput: {
              name,
              phone,
              email,
            },
          },
          refetchQueries: [PROFILE],
        }).then(
          ({
            data: {
              updateProfile: {
                name: updatedName,
                phone: updatedPhone,
                email: updatedEmail,
              },
            },
          }) => {
            // 어차피 refetch를 할 거면 아래의 구문이 필요없는 것인지...
            // const [
            //   updatedFirstNumber,
            //   updatedSecondNumber,
            //   updatedThirdNumber,
            // ] = updatedPhone.split("-");

            // setName(updatedName);
            // dispatch({ type: "firstNumber", value: updatedFirstNumber });
            // dispatch({ type: "secondNumber", value: updatedSecondNumber });
            // dispatch({ type: "thirdNumber", value: updatedThirdNumber });
            // setEmail(updatedEmail);
            setIsEditing(false);
          }
        );
      },
    },
  };

  // props 반환
  return {
    nameInputProps,
    phoneNumberFormProps,
    emailInputProps,
    floatRightButtonProps,
  };
}
