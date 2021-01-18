import React from "react";
import PropTypes from "prop-types";
import "./button.css";

export const Button = ({ btnStyle, backgroundColor, className, ...props }) => {
  return (
    <button
      type="button"
      className={[
        "button",
        `button--${btnStyle}`,
        className ? className : "",
      ].join(" ")}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  btnStyle: PropTypes.oneOf(["solid", "outline", "text"]),
  onClick: PropTypes.func,
};
Button.defaultProps = {
  btnStyle: "solid",
  onClick: undefined,
};
