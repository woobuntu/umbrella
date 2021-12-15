import React from "react";
import PropTypes from "prop-types";

// atoms
import { Title } from "atoms/Title";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { VerticalCardBody } from "atoms/Container";
import CardFooter from "components/Card/CardFooter";
import FloatRightButton from "atoms/Buttons/FloatRightButton";

export default function FormCard({
  cardHeaderProps: { title, description, color },
  children,
  floatRightButtonProps,
}) {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color={color}>
            <Title size={4}>{title}</Title>
            <p>{description}</p>
          </CardHeader>
          <VerticalCardBody>{children}</VerticalCardBody>
          <CardFooter
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <FloatRightButton buttonProps={floatRightButtonProps.buttonProps}>
              {floatRightButtonProps.children}
            </FloatRightButton>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

FormCard.defaultProps = {
  floatRightButtonProps: {
    onClick: () => {},
  },
};

FormCard.propTypes = {
  cardHeaderProps: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.oneOf([
      "warning",
      "success",
      "danger",
      "info",
      "primary",
      "rose",
    ]),
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  floatRightButtonProps: PropTypes.shape({
    children: PropTypes.string,
    buttonProps: PropTypes.shape({
      onClick: PropTypes.func,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "danger",
        "rose",
        "white",
        "twitter",
        "facebook",
        "google",
        "linkedin",
        "pinterest",
        "youtube",
        "tumblr",
        "github",
        "behance",
        "dribbble",
        "reddit",
        "instagram",
        "transparent",
      ]),
    }),
  }),
};
