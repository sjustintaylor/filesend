import { useEffect, useState } from "react";
import {
  sendMagicLink,
  exchangeToken,
} from "components/authentication/actions";

export default (token) => {
  // Authentication hooks
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    if (loginState === "magicLink") {
      sendMagicLink(setLoading, email).then(() => {
        showModal();
      });
    } else if (loginState === "getToken" && token) {
      exchangeToken(setLoading, token);
    }
  }, [loginState, token, email]);

  // Modal hooks
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  return { loading, setEmail, setLoginState, modalVisible, showModal };
};
