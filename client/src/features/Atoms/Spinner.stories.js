import Spinner from "./Spinner.vue";

export default {
  title: "Atoms/Spinner",
  component: Spinner,
  argTypes: {
    variant: {
      description: "Sets the spinner context",
      control: { type: "select", options: ["solid", "outline"] },
    },
  },
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Spinner },
  template: '<Spinner v-bind="$props" />',
});

export const BaseSpinner = Template.bind({});
BaseSpinner.args = {
  variant: "outline",
};
