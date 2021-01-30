import React from "react";
import PropTypes from "prop-types";
import useHooks from "./hooks";
import Login from "./components/login";
import LoggingIn from "./components/loggingIn";
import CheckEmail from "components/authentication/components/checkEmail";

export const Authentication = ({ token, ...props }) => {
  const {
    loading,
    email,
    setEmail,
    setLoginState,
    modalVisible,
    showModal,
  } = useHooks(token);
  return (
    <>
      {token ? (
        <LoggingIn />
      ) : (
        <>
          {modalVisible && (
            <CheckEmail
              showModal={showModal}
              setLoginState={setLoginState}
              loading={loading}
            />
          )}
          <Login
            modalVisible={modalVisible}
            loading={loading}
            setLoginState={setLoginState}
            email={email}
            setEmail={setEmail}
          />
        </>
      )}
    </>
  );
};
Authentication.propTypes = {
  token: PropTypes.string,
};
Authentication.defaultProps = {
  token: "",
};
