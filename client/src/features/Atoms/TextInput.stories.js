import TextInput from "./TextInput.vue";

export default {
  title: "Atoms/TextInput",
  component: TextInput,
  argTypes: {
    type: {
      control: { type: "select", options: ["email", "text", "password"] },
    },
    placeholder: { control: { type: "text" } },
    close: {
      control: { type: "select", options: ["true", "false"] },
    },
    required: {
      control: { type: "select", options: ["true", "false"] },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput },
  template: '<text-input v-bind="$props" />',
});

export const Text = Template.bind({});
Text.args = {
  type: "text",
  placeholder: "Random text",
};

export const Email = Template.bind({});
Email.args = {
  type: "email",
  placeholder: "Email address",
};
export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "Password",
};
