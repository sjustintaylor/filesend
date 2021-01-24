import React from "react";
import { Modal } from "./modal";

const config = {
  title: "Pages/Authentication/Modal",
  component: Modal,
};
export default config;

const Template = (args) => <Modal {...args}>Hello</Modal>;

export const Default = Template.bind({});
Default.args = {};
