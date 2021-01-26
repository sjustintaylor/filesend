import React from "react";
import { CheckEmail } from "./checkEmail";

const config = {
  title: "Pages/Authentication/CheckEmail",
  component: CheckEmail,
};
export default config;

const Template = (args) => <CheckEmail {...args} />;

export const Default = Template.bind({});
Default.args = {};
