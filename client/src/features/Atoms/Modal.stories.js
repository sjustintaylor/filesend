import Modal from "./Modal.vue";

export default {
  title: "Atoms/Modal",
  component: Modal,
  argTypes: {
    click: {
      description: "Fires every time the button is clicked",
      table: { type: { summary: "No payload" } },
      action: "clicked",
    },
  },
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal },
  template: '<Modal v-bind="$props" @click="click"/>',
});

export const BaseModal = Template.bind({});
BaseModal.args = {};
