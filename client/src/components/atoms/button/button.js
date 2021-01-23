import React from "react";
import PropTypes from "prop-types";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";
import "./button.css";

export const Button = ({ btnStyle, loading, className, ...props }) => {
  return (
    <button
      type="button"
      className={[
        "button",
        `button--${btnStyle}`,
        className ? className : "",
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <div className="button--spinner">
          <PuffLoader
            size="1.5rem"
            color={
              btnStyle === "solid"
                ? "white"
                : getComputedStyle(document.documentElement).getPropertyValue(
                    "--primary"
                  )
            }
          />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};

Button.propTypes = {
  btnStyle: PropTypes.oneOf(["solid", "outline", "text"]),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};
Button.defaultProps = {
  btnStyle: "solid",
  onClick: undefined,
  loading: false,
};
