import React from "react";
import PropTypes from "prop-types";
import useHooks from "./hooks";
import "./input.css";

export const Input = ({
  type,
  initialValue,
  placeholder,
  errorMessage,
  required,
  className,
  ...props
}) => {
  const { text, updateText, touched, updateFocus, focus } = useHooks(
    initialValue
  );

  return (
    <div className={className}>
      <div className="input">
        <input
          className={[
            "input__input",
            `${
              required && touched && !focus && text.length === 0
                ? "input__input--left-blank"
                : ""
            }`,
          ].join(" ")}
          type={type}
          value={text}
          onChange={updateText}
          onBlur={updateFocus}
          onFocus={updateFocus}
        />
        <button className="input__clear-btn" onClick={() => updateText("")}>
          <span className="material-icons">close</span>
        </button>
        {placeholder && (
          <label
            className={[
              "input__placeholder",
              `${text.length > 0 ? "input__placeholder--hold-up" : ""}`,
            ].join(" ")}
          >
            {placeholder}
          </label>
        )}
        {required && touched && !focus && text.length === 0 && (
          <span className="input__error-message">{errorMessage}</span>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  initialValue: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password"]).isRequired,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
};
Input.defaultProps = {
  type: "text",
  required: false,
};
