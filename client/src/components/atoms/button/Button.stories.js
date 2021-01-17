import React from "react";
import Button from "components/atoms/button";
const config = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    onClick: {
      description: "Fires every time the button is clicked",
      table: { type: { summary: "No payload" } },
      action: "clicked",
    },
  },
};
export default config;

const Template = (args) => <Button {...args} />;

export const Solid = Template.bind({});
Solid.args = {
  label: "Button",
};

export const Outline = Template.bind({});
Outline.args = {
  btnStyle: "outline",
  label: "Button",
};

export const Text = Template.bind({});
Text.args = {
  btnStyle: "text",
  label: "Button",
};
