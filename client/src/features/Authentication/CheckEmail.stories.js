import CheckEmail from "./CheckEmail.vue";

export default {
  title: "Features/Check Email",
  component: CheckEmail,
  argTypes: {},
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CheckEmail },
  template: '<check-email v-bind="$props" />',
});

export const BaseCheckEmail = Template.bind({});
BaseCheckEmail.args = {};
