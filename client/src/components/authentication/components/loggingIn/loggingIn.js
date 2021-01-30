import React from "react";
import PropTypes from "prop-types";
import PuffLoader from "react-spinners/PuffLoader";
import "./loggingIn.css";
import Modal from "../modal";

export const LoggingIn = ({ ...props }) => {
  return (
    <Modal showClose={false} showModal={() => {}} className="logging-in">
      <h2>Good to see you again</h2>
      <p>Hang on, we're just setting everything up</p>
      <PuffLoader
        size="1.5rem"
        color={getComputedStyle(document.documentElement).getPropertyValue(
          "--primary"
        )}
      />
    </Modal>
  );
};

LoggingIn.propTypes = {};
LoggingIn.defaultProps = {};
