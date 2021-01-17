import React from "react";
import Panel from "components/atoms/panel";
const config = {
  title: "Atoms/Panel",
  component: Panel,
};
export default config;

const Template = (args) => <Panel {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div>Hello</div>,
};
