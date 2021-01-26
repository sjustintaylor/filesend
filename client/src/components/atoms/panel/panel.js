import React from "react";
import PropTypes from "prop-types";
import "./panel.css";

export const Panel = ({ className, ...props }) => {
  return (
    <div
      className={["panel", className ? className : ""].join(" ")}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
      }}
    >
      {props.children}
    </div>
  );
};

Panel.propTypes = {};
Panel.defaultProps = {};
