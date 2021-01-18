import React from "react";
import useHooks from "./hooks";
import "./authentication.css";
import Panel from "components/atoms/panel";
import Input from "components/atoms/text-input";
import Button from "components/atoms/button";
import PuffLoader from "react-spinners/PuffLoader";

export const Authentication = ({ ...props }) => {
  const { loading } = useHooks();
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
      />
      <Button
        variant="solid"
        className="auth__control auth__control--margin-top "
      >
        {loading ? (
          <div className="auth__spinner">
            <PuffLoader size="1.5rem" color="white" />
          </div>
        ) : (
          "Let's do this"
        )}
      </Button>
      <p className="auth__control auth__control--margin-top text--align-right ">
        There's no need to sign up, an account will be created automatically for
        you.
      </p>
    </Panel>
  );
};
