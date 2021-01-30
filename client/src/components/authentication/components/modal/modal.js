import React from "react";
import Panel from "components/atoms/panel";
import Button from "components/atoms/button";
import PropTypes from "prop-types";

import "./modal.css";

export const Modal = ({
  children,
  showModal,
  showClose,
  className,
  ...props
}) => {
  return (
    <div
      key="modal"
      className="modal"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        showModal();
      }}
    >
      <Panel
        className={["modal--content", className ? className : ""].join(" ")}
        onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
      >
        {showClose && (
          <Button btnStyle="text" onClick={showModal} className="modal--close">
            <span class="material-icons modal--close-icon ">close</span>
          </Button>
        )}
        {children}
      </Panel>
    </div>
  );
};

Modal.propTypes = {
  showModal: PropTypes.func,
  showClose: PropTypes.bool,
};
Modal.defaultProps = {
  showModal: () => console.log("No showModal function"),
  showClose: true,
};
