import React from "react";
import Authentication from "components/authentication";
const config = {
  title: "Pages/Authentication",
  component: Authentication,
};
export default config;

const Template = (args) => <Authentication {...args} />;

export const Default = Template.bind({});
Default.args = {};
