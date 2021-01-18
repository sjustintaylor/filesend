import { useState } from "react";

export default () => {
  const [loading, setLoading] = useState(false);

  return { loading };
};
