import React from "react";
import PropTypes from "prop-types";
import "./button.css";

export const Button = ({
  label,
  btnStyle,

  backgroundColor,
  ...props
}) => {
  return (
    <button
      type="button"
      className={["button", `button--${btnStyle}`].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  btnStyle: PropTypes.oneOf(["solid", "outline", "text"]),
  onClick: PropTypes.func,
};
Button.defaultProps = {
  btnStyle: "solid",
  onClick: undefined,
};
