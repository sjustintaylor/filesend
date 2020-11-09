import Panel from "./Panel.vue";

export default {
  title: "Atoms/Panel",
  component: Panel,
  argTypes: {},
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Panel },
  template: '<panel v-bind="$props" />',
});

export const BasePanel = Template.bind({});
BasePanel.args = {};
