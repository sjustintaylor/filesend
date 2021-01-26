import React from "react";
import Panel from "components/atoms/panel";
import PropTypes from "prop-types";
import "./modal.css";

export const Modal = ({ children, showModal, ...props }) => {
  return (
    <div
      className="modal"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        showModal();
      }}
    >
      <Panel
        className="modal--content"
        onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
      >
        {children}
      </Panel>
    </div>
  );
};

Modal.propTypes = {
  showModal: PropTypes.func,
};
Modal.defaultProps = {
  showModal: () => console.log("No showModal function"),
};
