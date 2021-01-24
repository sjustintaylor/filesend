import React from "react";
import Panel from "components/atoms/panel";
import "./modal.css";

export const Modal = ({ children, ...props }) => {
  return (
    <div className="modal">
      <Panel className="modal--content">{children}</Panel>
    </div>
  );
};
