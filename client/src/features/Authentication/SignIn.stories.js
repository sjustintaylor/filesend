import SignIn from "./SignIn.vue";

export default {
  title: "Features/Sign In",
  component: SignIn,
  argTypes: {},
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SignIn },
  template: '<sign-in v-bind="$props" />',
});

export const BaseSignIn = Template.bind({});
BaseSignIn.args = {};
