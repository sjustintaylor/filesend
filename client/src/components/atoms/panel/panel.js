import React from "react";
import PropTypes from "prop-types";
import "./panel.css";

export const Panel = ({ ...props }) => {
  return <div className="panel ">{props.children}</div>;
};

Panel.propTypes = {};
Panel.defaultProps = {};
