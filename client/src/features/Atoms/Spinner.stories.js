import Spinner from "./Spinner.vue";

export default {
  title: "Atoms/Spinner",
  component: Spinner,
  argTypes: {},
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Spinner },
  template: '<Spinner v-bind="$props" />',
});

export const BaseSpinner = Template.bind({});
BaseSpinner.args = {};
