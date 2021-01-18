import { useState } from "react";

export default () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  return { loading };
};
