import React from "react";
import Files from "components/files";

const config = {
  title: "Files/Main Screen",
  component: Files,
};
export default config;

const Template = (args) => <Files />;

export const UploadScreen = Template.bind({});
UploadScreen.args = {};
