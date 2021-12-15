import { useMutation } from "@apollo/client";
import { UPDATE_DELIVERY } from "graphql/mutation";
import { PROFILE } from "graphql/query";
import { useReducer, useState } from "react";
import { addressReducer } from "reducers";
import { phoneNumberReducer } from "reducers";
import useFocusOnClickEditButton from "./useFocusOnClickEditButton";
import useFocusOnCompleteAddressSearch from "./useFocusOnCompleteAddressSearch";
import useSetInitialDefaultDeliveryInfo from "./useSetInitialDefaultDeliveryInfo";

export default function useDefaultDeliveryFormCard({
  defaultDeliveryInfoFromServer,
}) {
  // state 및 handler 생성
  const [name, setName] = useState("");
  const [{ firstNumber, secondNumber, thirdNumber }, phoneNumberDispatch] =
    useReducer(phoneNumberReducer, {
      firstNumber: "010",
      secondNumber: "",
      thirdNumber: "",
    });
  const [{ postCode, address, detailAddress }, addressDispatch] = useReducer(
    addressReducer,
    {
      postCode: "",
      address: "",
      detailAddress: "",
    }
  );
  const [memo, setMemo] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const disabled = isEditing ? false : true;

  // '수정하기'버튼을 클릭했을 때 nameInput에 focus하기
  const nameInputRef = useFocusOnClickEditButton({
    isEditing,
  });

  // 서버에서 받아온 기본 배송지 정보로 초기값 세팅하기
  useSetInitialDefaultDeliveryInfo({
    defaultDeliveryInfoFromServer,
    setName,
    phoneNumberDispatch,
    addressDispatch,
    setMemo,
  });

  const detailAddressInputRef = useFocusOnCompleteAddressSearch({
    isEditing,
    postCode,
    address,
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
      onChange: (e) =>
        phoneNumberDispatch({ type: "firstNumber", value: e.target.value }),
    },
    customInputPropsForSecondNumber: {
      inputProps: {
        value: secondNumber,
        onChange: (e) =>
          phoneNumberDispatch({ type: "secondNumber", value: e.target.value }),
      },
    },
    customInputPropsForThirdNumber: {
      inputProps: {
        value: thirdNumber,
        onChange: (e) =>
          phoneNumberDispatch({ type: "thirdNumber", value: e.target.value }),
      },
    },
  };

  const addressFormProps = {
    disabled,
    customInputPropsForPostCode: {
      inputProps: {
        value: postCode,
        onChange: (value) => addressDispatch({ type: "postCode", value }),
      },
    },
    onConfirm: ({ postCode, address }) => {
      addressDispatch({ type: "postCode", value: postCode });
      addressDispatch({ type: "address", value: address });
    },
    customInputPropsForAddress: {
      inputProps: {
        value: address,
        onChange: (value) => addressDispatch({ type: "address", value }),
      },
    },
    customInputPropsForDetailAddress: {
      inputProps: {
        value: detailAddress,
        onChange: (e) =>
          addressDispatch({ type: "detailAddress", value: e.target.value }),
        inputRef: detailAddressInputRef,
      },
    },
  };

  const memoInputProps = {
    inputProps: {
      disabled,
      value: memo,
      onChange: (e) => setMemo(e.target.value),
    },
  };

  const [updateDelivery] = useMutation(UPDATE_DELIVERY);
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
          name === defaultDeliveryInfoFromServer.name &&
          phone === defaultDeliveryInfoFromServer.phone &&
          postCode === defaultDeliveryInfoFromServer.postCode &&
          address === defaultDeliveryInfoFromServer.address &&
          detailAddress === defaultDeliveryInfoFromServer.detailAddress &&
          memo === defaultDeliveryInfoFromServer.email
        ) {
          return setIsEditing(false);
        }

        // 서버로 update요청을 보내 응답받은 값으로 화면 재렌더링
        updateDelivery({
          variables: {
            updateDefaultDeliveryInput: {
              name,
              phone,
              postCode,
              address,
              detailAddress,
              memo,
            },
          },
          refetchQueries: [PROFILE],
        }).then(() => {
          setIsEditing(false);
        });
      },
    },
  };

  return {
    nameInputProps,
    phoneNumberFormProps,
    addressFormProps,
    memoInputProps,
    floatRightButtonProps,
  };
}
