import MyButton from "./Button.vue";

export default {
  title: "Atoms/Button",
  component: MyButton,
  argTypes: {
    variant: {
      description: "Sets the button's display type",
      table: { type: { summary: "solid, outline, text" } },
      control: { type: "select", options: ["solid", "outline", "text"] },
    },
    label: {
      description: "Sets the button text",
    },
    "btn-click": {
      description: "Fires every time the button is clicked",
      table: { type: { summary: "No payload" } },
      action: "btn-clicked",
    },
    type: {
      description: "Sets the button type",
      table: { type: { summary: "Valid types: button, submit" } },
      control: {
        type: "select",
        options: ["button", "submit"],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: '<my-button @btn-click="onClick" v-bind="$props" />',
});

export const Solid = Template.bind({});
Solid.args = {
  label: "Button",
};

export const Outline = Template.bind({});
Outline.args = {
  variant: "outline",
  label: "Button",
};

export const Text = Template.bind({});
Text.args = {
  variant: "text",
  label: "Button",
};
