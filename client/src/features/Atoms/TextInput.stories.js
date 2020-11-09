import TextInput from "./TextInput.vue";

export default {
  title: "Atoms/TextInput",
  component: TextInput,
  argTypes: {
    input: {
      description: "Fired when the input changes. Can be used with v-model",
      table: { type: { summary: "string" } },
      action: "input",
    },
    value: {
      description: "The initial value of the input",
      control: { type: "text" },
    },
    type: {
      description:
        "Sets the type of the input. Email inputs are auto validated",
      table: {
        type: {
          required: true,
          summary: "Valid types: text, email, password",
        },
      },
      control: { type: "select", options: ["email", "text", "password"] },
    },
    placeholder: {
      description: "Sets the placeholder text for the input",
      table: {
        type: {},
      },
      control: { type: "text" },
    },
    required: {
      description:
        "Is this input required? The element will change to an error status if the element loses focus without input",
      control: { type: "boolean" },
    },
    errorMessage: {
      description:
        "The error message to display to the user if the input is required or if setError is true",
      control: { type: "text" },
    },
    setError: {
      description:
        "Sets the input state to invalid. Use to provide feedback on input from an entire form",
      control: { type: "boolean" },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput },
  template: '<text-input v-bind="$props" @input="input"/>',
});

export const Text = Template.bind({});
Text.args = {
  type: "text",
  placeholder: "Random text",
  required: true,
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

export const RequiredInput = Template.bind({});
RequiredInput.args = {
  type: "email",
  placeholder: "Email address",
  errorMessage: "Email address is required",
  required: true,
  value: "Hello",
};
