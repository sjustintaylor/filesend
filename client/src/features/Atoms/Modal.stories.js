import Modal from "./Modal.vue";

export default {
  title: "Atoms/Modal",
  component: Modal,
  argTypes: {
    close: {
      description: "Fires a close modal event",
      table: { type: { summary: "No payload" } },
      action: "Close Modal",
    },
  },
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal },
  template: '<Modal v-bind="$props" @close="close" />',
});

export const BaseModal = Template.bind({});
BaseModal.args = {};
