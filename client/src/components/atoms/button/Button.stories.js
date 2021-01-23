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

const Template = (args) => <Button {...args}>Button</Button>;

export const Solid = Template.bind({});
Solid.args = {};

export const Outline = Template.bind({});
Outline.args = {
  btnStyle: "outline",
};

export const Text = Template.bind({});
Text.args = {
  btnStyle: "text",
};

export const SolidLoading = Template.bind({});
SolidLoading.args = {
  loading: true,
};

export const OutlineLoading = Template.bind({});
OutlineLoading.args = {
  loading: true,
  btnStyle: "outline",
};

export const TextLoading = Template.bind({});
TextLoading.args = {
  loading: true,
  btnStyle: "text",
};
