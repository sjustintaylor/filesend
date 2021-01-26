import React from "react";
import PropTypes from "prop-types";
import Modal from "components/authentication/components/modal";
import Button from "components/atoms/button";
import "./checkEmail.css";

export const CheckEmail = ({ showModal, ...props }) => {
  return (
    <Modal showModal={showModal} className="checkEmail">
      <h2 className="checkEmail--text__center">Awesome, you're almost there</h2>
      <p className="checkEmail--text__center">
        We’ve emailed you a magic link to take you the rest of the way
      </p>
      <Button btnStyle="text">Didn't receive it? </Button>
    </Modal>
  );
};

CheckEmail.propTypes = {
  showModal: PropTypes.func,
};
CheckEmail.defaultProps = {
  showModal: () => console.log("No showModal Prop"),
};
