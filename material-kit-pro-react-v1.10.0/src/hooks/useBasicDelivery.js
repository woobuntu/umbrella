import { useMutation } from "@apollo/client";
import { UPDATE_DELIVERY } from "graphql/mutation";
import { useReducer, useRef, useState, useEffect, useCallback } from "react";
import { basicReducer } from "reducers";
import useAddress from "./useAddress";
import usePhoneNumber from "./usePhoneNumber";

export default function useBasicDelivery(profileData) {
  const [{ name, memo }, dispatch] = useReducer(basicReducer, {
    name: "",
    memo: "",
  });

  const [updateDelivery] = useMutation(UPDATE_DELIVERY);

  const [isEditing, setIsEditing] = useState(false);

  const phoneNumberProps = usePhoneNumber({ isEditing });
  const addressProps = useAddress({ isEditing });

  const ref = useRef();

  const setName = (e) => dispatch({ type: "name", value: e.target.value });
  const customInputPropsForName = {
    state: name,
    action: setName,
    labelText: "이름",
    formControlProps: {
      style: {
        width: "50%",
      },
    },
    inputProps: {
      disabled: isEditing ? false : true,
      inputRef: ref,
      id: "delivery-name",
      name: "deliveryName",
      autoComplete: "delivery-name",
    },
  };
  useEffect(() => {
    if (isEditing) {
      ref.current.focus();
    }
  }, [isEditing]);

  const setMemo = (e) => dispatch({ type: "memo", value: e.target.value });
  const customInputPropsForMemo = {
    state: memo,
    action: setMemo,
    labelText: "배송요청사항",
    inputProps: {
      disabled: isEditing ? false : true,
      id: "memo",
      name: "memo",
      autoComplete: "memo",
    },
  };

  useEffect(() => {
    if (profileData) {
      const {
        profile: { userDeliveryRelations },
      } = profileData;

      const [basicDelivery] = userDeliveryRelations
        .filter((userDeliveryRelation) => userDeliveryRelation.default)
        .map(({ delivery }) => delivery);

      // 이름 초기값
      dispatch({ type: "name", value: basicDelivery.name });

      // 배송요청사항 초기값
      dispatch({ type: "memo", value: basicDelivery.memo || "" });

      // 핸드폰번호 초기값
      const {
        customSelectPropsForFirstNumber: { action: setFirstNumber },
        customInputPropsForSecondNumber: { action: setSecondNumber },
        customInputPropsForThirdNumber: { action: setThirdNumber },
      } = phoneNumberProps;
      const [first, second, third] = basicDelivery.phone.split("-");
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

      // 주소 초기값
      const {
        daumApiProps: { setPostCode, setAddress },
        customInputPropsForDetailAddress: { action: setDetailAddress },
      } = addressProps;
      const { postCode, address, detailAddress } = basicDelivery;
      setPostCode(postCode);
      setAddress(address);
      setDetailAddress({ target: { value: detailAddress } });
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

        const [basicDelivery] = (
          profileData ? profileData.profile.userDeliveryRelations : []
        )
          .filter((userDeliveryRelation) => userDeliveryRelation.default)
          .map(({ delivery }) => delivery);

        const {
          customInputPropsForPostCode: { state: postCode },
          customInputPropsForAddress: { state: address },
          daumApiProps: { setPostCode, setAddress },
          customInputPropsForDetailAddress: {
            state: detailAddress,
            action: setDetailAddress,
          },
        } = addressProps;

        if (
          name === basicDelivery.name &&
          `${firstNumber}-${secondNumber}-${thirdNumber}` ===
            basicDelivery.phone &&
          postCode === basicDelivery.postCode &&
          address === basicDelivery.address &&
          detailAddress === basicDelivery.detailAddress &&
          memo === basicDelivery.memo
        ) {
          setIsEditing(false);
          return;
        }

        const variables = {
          deliveryId: basicDelivery.id,
          updateDeliveryInput: {
            postCode: postCode,
            address: address,
            detailAddress: detailAddress,
            memo,
            name,
            phone: `${firstNumber}-${secondNumber}-${thirdNumber}`,
          },
        };
        updateDelivery({ variables }).then(({ data: { updateDelivery } }) => {
          dispatch({ type: "name", value: updateDelivery.name });
          dispatch({ type: "memo", value: updateDelivery.memo });

          const [first, second, third] = updateDelivery.phone.split("-");
          setFirstNumber({ target: { value: first } });
          setSecondNumber({ target: { value: second } });
          setThirdNumber({ target: { value: third } });

          setPostCode(updateDelivery.postCode);
          setAddress(updateDelivery.address);
          setDetailAddress({ target: { value: updateDelivery.detailAddress } });

          setIsEditing(false);
        });
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
    addressProps,
    customInputPropsForMemo,
    editButtonProps,
  };
}
