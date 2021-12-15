import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "graphql/mutation";
import { BASKETS } from "graphql/query";
import { PROFILE } from "graphql/query";
import { useEffect, useReducer, useRef, useState } from "react";
import { profileReducer } from "reducers";
import usePhoneNumber from "./usePhoneNumberLegacy";

export default function useBasicProfile(profileData) {
  const [{ name, email }, dispatch] = useReducer(profileReducer, {
    name: "",
    email: "",
  });

  const [
    updateProfile,
    { loading: updateProfileLoading, error: updateProfileError },
  ] = useMutation(UPDATE_PROFILE);

  const [isEditing, setIsEditing] = useState(false);

  const phoneNumberProps = usePhoneNumber({ isEditing });

  const ref = useRef();

  const setName = (e) => dispatch({ type: "name", value: e.target.value });
  const customInputPropsForName = {
    // state: name,
    // action: setName,
    labelText: "이름",
    formControlProps: {
      style: {
        width: "50%",
      },
    },
    inputProps: {
      disabled: isEditing ? false : true,
      inputRef: ref,
      id: "orderer-name",
      name: "ordererName",
      autoComplete: "orderer-name",
    },
  };
  useEffect(() => {
    if (isEditing) {
      ref.current.focus();
    }
  }, [isEditing]);

  const setEmail = (e) => dispatch({ type: "email", value: e.target.value });
  const customInputPropsForEmail = {
    // state: email,
    // action: setEmail,
    labelText: "이메일",
    inputProps: {
      disabled: isEditing ? false : true,
      id: "orderer-email",
      name: "ordererEmail",
      autoComplete: "orderer-email",
    },
  };

  useEffect(() => {
    if (profileData) {
      const { profile } = profileData;
      dispatch({ type: "name", value: profile.name || "" });
      dispatch({ type: "email", value: profile.email });
      const {
        customSelectPropsForFirstNumber: { action: setFirstNumber },
        customInputPropsForSecondNumber: { action: setSecondNumber },
        customInputPropsForThirdNumber: { action: setThirdNumber },
      } = phoneNumberProps;
      const [first, second, third] = profile.phone.split("-");
      setFirstNumber({ target: { value: first } });
      setSecondNumber({
        target: {
          value: second,
        },
      });
      setThirdNumber({
        target: {
          value: third,
        },
      });
    }
  }, [profileData]);

  const editButtonProps = {
    onClick: () => {
      if (isEditing) {
        const {
          customSelectPropsForFirstNumber: {
            state: firstNumber,
            action: setFirstNumber,
          },
          customInputPropsForSecondNumber: {
            state: secondNumber,
            action: setSecondNumber,
          },
          customInputPropsForThirdNumber: {
            state: thirdNumber,
            action: setThirdNumber,
          },
        } = phoneNumberProps;
        const variables = {
          updateUserInput: {
            name,
            phone: `${firstNumber}-${secondNumber}-${thirdNumber}`,
            email,
          },
        };

        if (
          name === profileData.name &&
          `${firstNumber}-${secondNumber}-${thirdNumber}` ===
            profileData.phone &&
          email === profileData.email
        ) {
          setIsEditing(false);
          return;
        }

        updateProfile({ variables, refetchQueries: [PROFILE, BASKETS] }).then(
          ({ data: { updateProfile } }) => {
            dispatch({ type: "name", value: updateProfile.name });
            dispatch({ type: "email", value: updateProfile.email });

            const [first, second, third] = updateProfile.phone.split("-");
            setFirstNumber({ target: { value: first } });
            setSecondNumber({ target: { value: second } });
            setThirdNumber({ target: { value: third } });

            setIsEditing(false);
          }
        );
      } else {
        setIsEditing(true);
      }
    },
    color: isEditing ? "info" : "primary",
    text: isEditing ? "저장하기" : "수정하기",
  };

  return {
    customInputPropsForName,
    phoneNumberProps,
    customInputPropsForEmail,
    editButtonProps,
  };
}
