import React from "react";
import PropTypes from "prop-types";
import useHooks from "./hooks";
import "./authentication.css";
import Login from "./components/login";

export const Authentication = ({ token, ...props }) => {
  const {
    loading,
    setEmail,
    setLoginState,
    modalVisible,
    showModal,
  } = useHooks(token);
  return <Login props={(loading, setEmail, setLoginState)} />;
};
Authentication.propTypes = {
  token: PropTypes.string,
};
Authentication.defaultProps = {
  token: "",
};
