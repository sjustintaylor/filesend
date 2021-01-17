import React from "react";
import PropTypes from "prop-types";
// import "./button.scss";

export const Button = ({ label, type, onClick, ...props }) => {
  return (
    <button type="button" {...props}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  btnStyle: PropTypes.oneOf(["text", "outline", "solid"]),
  onClick: PropTypes.func,
};
Button.defaultProps = {
  btnStyle: "solid",
  onClick: undefined,
};
