import React from "react";
import PropTypes from "prop-types";

// organisms
import FormCard from "./FormCard";

// molecules
import PhoneNumberForm from "molecules/PhoneNumberForm";

// atoms
import { NameInput, EmailInput } from "atoms/Form";

// hooks
import { useUserInfoFormCard } from "hooks";

export default function UserInfoFormCard({ userInfoFromServer }) {
  const {
    nameInputProps,
    phoneNumberFormProps,
    emailInputProps,
    floatRightButtonProps,
  } = useUserInfoFormCard({ userInfoFromServer });

  return (
    <FormCard
      cardHeaderProps={{
        title: "회원정보",
        description:
          "입력된 회원 정보는 상품 주문시 주문자 정보의 기본값으로 설정됩니다",
        color: "success",
      }}
      floatRightButtonProps={floatRightButtonProps}
    >
      <NameInput {...nameInputProps} />
      <PhoneNumberForm {...phoneNumberFormProps} />
      <EmailInput {...emailInputProps} />
    </FormCard>
  );
}

UserInfoFormCard.defaultProps = {
  userInfoFromServer: {
    name: "",
    phone: "",
    email: "",
  },
};

UserInfoFormCard.propTypes = {
  userInfoFromServer: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};
