import React from "react";
import PropTypes from "prop-types";

// organisms
import FormCard from "./FormCard";
import PhoneNumberForm from "molecules/PhoneNumberForm";
import { AddressForm } from "molecules";
import { NameInput } from "atoms/Form";
import MemoInput from "atoms/Form/MemoInput";
import useDefaultDeliveryFormCard from "hooks/useDefaultDeliveryFormCard";

export default function DefaultDeliveryFormCard({
  defaultDeliveryInfoFromServer,
}) {
  const {
    nameInputProps,
    phoneNumberFormProps,
    addressFormProps,
    memoInputProps,
    floatRightButtonProps,
  } = useDefaultDeliveryFormCard({
    defaultDeliveryInfoFromServer,
  });

  return (
    <FormCard
      cardHeaderProps={{
        title: "기본 배송지 정보",
        description:
          "입력된 배송지 정보는 상품 주문시 배송 정보의 기본값으로 설정됩니다",
        color: "warning",
      }}
      floatRightButtonProps={floatRightButtonProps}
    >
      <NameInput {...nameInputProps} />
      <PhoneNumberForm {...phoneNumberFormProps} />
      <AddressForm {...addressFormProps} />
      <MemoInput {...memoInputProps} />
    </FormCard>
  );
}

// DefaultDeliveryFormCard.defaultProps = {};

DefaultDeliveryFormCard.propTypes = {
  defaultDeliveryInfoFromServer: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    postCode: PropTypes.string,
    address: PropTypes.string,
    detailAddress: PropTypes.string,
    memo: PropTypes.string,
  }),
};
