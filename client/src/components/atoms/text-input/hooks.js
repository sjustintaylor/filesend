import { useEffect, useState } from "react";
export default (initialValue) => {
  const [text, setText] = useState("");
  const [touched, setTouched] = useState(false);
  const [focus, setFocus] = useState(false);
  // Safe set text from an event
  const updateText = (value) => {
    setText(value.target.value ? value.target.value : "");
  };
  const updateFocus = (e) => {
    if (!touched) setTouched(true);
    setFocus(e.type === "focus" ? true : false);
  };
  // Set initial value
  useEffect(() => {
    setText(initialValue ? initialValue : "");
  }, []);
  return { text, updateText, touched, focus, updateFocus };
};
