<template>
  <Modal @close="$emit('close')">
    <h3>Awesome, you're almost there</h3>
    <p v-if="!isLoading">
      {{
        resentEmail
          ? "Well that's not good. We've sent you another link, so you should be on your way in a hot second"
          : "We’ve emailed you a magic link to take you the rest of the way"
      }}
    </p>
    <spinner v-if="isLoading" />

    <Button
      variant="text"
      type="button"
      class="modal__resend"
      id="resend-email"
      @click="resendEmail"
      >Didn't receive it?</Button
    >
  </Modal>
</template>

<script>
import Modal from "@/features/Atoms/Modal.vue";
import Button from "@/features/Atoms/Button.vue";
import Spinner from "@/features/Atoms/Spinner";

export default {
  name: "CheckEmail",
  components: {
    Modal,
    Button,
    Spinner
  },
  data: function() {
    return {
      resentEmail: false,
      isLoading: false
    };
  },
  methods: {
    async resendEmail() {
      this.resentEmail = true;
    }
  }
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
