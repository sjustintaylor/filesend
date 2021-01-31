import React from "react";
import Panel from "components/atoms/panel";
import Input from "components/atoms/text-input";

import Button from "components/atoms/button";

import "./login.css";
import PropTypes from "prop-types";

export const Login = ({
  loading,
  email,
  setEmail,
  setLoginState,
  modalVisible,

  ...props
}) => {
  return (
    <Panel className="auth">
      <h3 className="auth__heading">FileSend</h3>
      <p className="text_large">
        Easy file sharing with simple access controls.
      </p>

      <h4>Log In</h4>
      <Input
        type="email"
        required={true}
        errorMessage="Necessary so we can send you a magic link to continue logging in"
        placeholder="Email address"
        className="auth__email"
        text={email}
        updateText={setEmail}
      />
      <Button
        variant="solid"
        className="auth__control auth__control--margin-top"
        onClick={() => setLoginState("magicLink")}
        loading={!modalVisible && loading}
      >
        Let's do this
      </Button>
      <p className="auth__control auth__control--margin-top text--align-right ">
        There's no need to sign up, an account will be created automatically for
        you.
      </p>
    </Panel>
  );
};

Login.propTypes = {
  loading: PropTypes.bool,
  setEmail: PropTypes.func,
  setLoginState: PropTypes.func,
};
Login.defaultProps = {
  loading: false,
};