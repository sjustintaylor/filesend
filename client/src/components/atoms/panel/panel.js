import React from "react";
import PropTypes from "prop-types";
import "./panel.scss";

export const Panel = ({ ...props }) => {
  return <div className="panel panel-responsive">{props.children}</div>;
};

Panel.propTypes = {};
Panel.defaultProps = {};
