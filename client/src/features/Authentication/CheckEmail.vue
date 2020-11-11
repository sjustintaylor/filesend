<template>
  <Modal>
    <h3>Awesome, you're almost there</h3>
    <p>We’ve emailed you a magic link to take you the rest of the way</p>
    <Button variant="text" type="button" class="modal__resend"
      >Didn't receive it?</Button
    >
  </Modal>
</template>

<script>
import Modal from "@/features/Atoms/Modal.vue";
import Button from "@/features/Atoms/Button.vue";
export default {
  name: "CheckEmail",
  components: {
    Modal,
    Button,
  },
};
</script>

<style scoped lang="scss">
.modal__resend {
  align-self: center;
}
h3 {
  margin-top: 0;
  font-weight: 700;
}
p {
  padding-bottom: 2rem;
}
</style>
