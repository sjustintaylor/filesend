import React from "react";
import PropTypes from "prop-types";
import "./panel.css";

export const Panel = ({ className, ...props }) => {
  return (
    <div className={["panel", className ? className : ""].join(" ")}>
      {props.children}
    </div>
  );
};

Panel.propTypes = {};
Panel.defaultProps = {};
