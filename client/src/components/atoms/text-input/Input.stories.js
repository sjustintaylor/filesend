import React from "react";
import Input from "components/atoms/text-input";
const config = {
  title: "Atoms/Text Input",
  component: Input,
};
export default config;

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Hello",
  errorMessage: "Oh fuck",
};

export const ErrorHandling = Template.bind({});
ErrorHandling.args = {
  placeholder: "Hello",
  errorMessage: "Nice error message",
  required: true,
  type: "email",
};
