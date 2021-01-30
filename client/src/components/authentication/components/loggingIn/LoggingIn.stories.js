import React from "react";
import { LoggingIn } from "./loggingIn";

const config = {
  title: "Pages/Authentication/Logging In",
  component: LoggingIn,
};
export default config;

const Template = (args) => <LoggingIn {...args} />;

export const Default = Template.bind({});
Default.args = {};
