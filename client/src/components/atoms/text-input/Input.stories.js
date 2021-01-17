import React from "react";
import Input from "components/atoms/text-input";
const config = {
  title: "Atoms/Text Input",
  component: Input,
};
export default config;

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};
