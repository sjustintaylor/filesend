import { useEffect, useState } from "react";
import {
  sendMagicLink,
  exchangeToken,
} from "components/authentication/actions";
import { useInputHooks } from "components/atoms/text-input";
import { useHistory } from "react-router-dom";

export default (token) => {
  const history = useHistory();
  const { text: email, updateText: setEmail } = useInputHooks();
  // Authentication hooks
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useState();

  useEffect(() => {
    if (loginState === "magicLink" && !testEmail(email)) {
      setLoginState(undefined);
    } else if (loginState === "magicLink" && testEmail(email)) {
      setLoading(true);
      sendMagicLink(setLoading, email).then(() => {
        setLoading(false);
        setLoginState(undefined);
        // Leaves CheckEmail modal open if resending
        if (!modalVisible) {
          showModal();
        }
      });
    } else if (loginState === "getToken" && token) {
      setLoading(true);
      exchangeToken(setLoading, token).then(() => {
        setLoading(false);
        history.push("/");
      });
    }
  }, [loginState, token, email]);

  // Modal hooks
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  return {
    email,
    setEmail,
    loading,
    setEmail,
    setLoginState,
    modalVisible,
    showModal,
  };
};

const testEmail = (email) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
