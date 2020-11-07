import MyButton from "./Button.vue";

export default {
  title: "Atoms/Button",
  component: MyButton,
  argTypes: {
    variant: {
      control: { type: "select", options: ["solid", "outline", "text"] },
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
