import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

// molecules
import UserNameAndPosition from "./UserNameAndPosition";

// atoms
import { Thumbnail } from "atoms/Image";

const useStyles = makeStyles({
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
    },
  },
});

export default function UserBasicInfo({ thumbnailProps, name, position }) {
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <Thumbnail {...thumbnailProps} />
      {/* 이런 조건부 렌더링이 있어도 되는 것인가... */}
      {name && position && (
        <UserNameAndPosition name={name} position={position} />
      )}
    </div>
  );
}

UserBasicInfo.propTypes = {
  thumbnailProps: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  name: PropTypes.string,
  position: PropTypes.string,
};
