<template>
  <div>
    <Panel id="panel">
      <h3>FileSend</h3>
      <p class="text_large">Easy file sharing with simple access controls.</p>
      <h4>Sign Up</h4>
      <TextInput
        v-model="email"
        :setError="errors.emailError"
        class="inputs"
        :required="true"
        placeholder="Email Address"
        type="email"
        errorMessage="Your email address is required"
      />
      <TextInput
        :setError="errors.inviteError"
        v-model="referralCode"
        class="inputs"
        :required="true"
        placeholder="Invite code"
        type="text"
        errorMessage="An invite code is required"
      />
      <div id="controls">
        <Button variant="solid" @click="signup">
          <Spinner v-if="isLoading" />
          {{ isLoading ? "" : "Let's do this" }}
        </Button>
      </div>
      <p>
        Q: Why do I need an invite? <br />A: Because we’re still in closed beta
        as we prepare for launch. Drop us a line at send@sjustintaylor.com.au
        and we’ll send you an invite.
      </p>
    </Panel>
    <transition name="fade">
      <CheckEmail v-if="showModal" @close="showModal = false" />
    </transition>
  </div>
</template>

<script>
import Button from "@/features/Atoms/Button.vue";
import TextInput from "@/features/Atoms/TextInput.vue";
import Panel from "@/features/Atoms/Panel.vue";
import Spinner from "@/features/Atoms/Spinner";
import CheckEmail from "@/features/Authentication/CheckEmail";
export default {
  name: "SignUp",
  components: {
    Button,
    TextInput,
    Panel,
    Spinner,
    CheckEmail
  },
  data: function() {
    return {
      email: "",
      referralCode: "",
      isLoading: false,
      showModal: false,
      errors: {
        emailError: false,
        inviteError: false
      }
    };
  },

  methods: {
    async signup() {
      this.errors.emailError = false;
      this.errors.inviteError = false;
      if (this.email.length === 0) this.errors.emailError = true;
      if (this.referralCode.length === 0) this.errors.inviteError = true;
      if (this.errors.emailError || this.errors.inviteError) return;
      this.isLoading = true;
      try {
        console.log("sign up");
        this.showModal = true;
      } catch (error) {
        console.error(error);
      }
      this.isLoading = false;
    }
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/colors" as colors;
@use "@/assets/responsive" as breakpoints;
@use "@/assets/typography";
#controls {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 2rem;
  align-items: flex-end;
  margin-bottom: 2rem;
  & p {
    margin-top: 2rem;
  }
  & #spinner {
    margin-right: 0.5rem;
  }
}
.inputs {
  max-width: 100%;
  margin-bottom: 2rem;
}
h3 {
  line-height: 0;
  text-decoration-line: underline;
}
@media screen and (min-width: breakpoints.$medium) {
  .inputs {
    margin-left: 2rem;
    margin-right: 2rem;
  }
  #controls {
    margin-right: 2rem;
  }
}
@media screen and (min-width: breakpoints.$large) {
  #panel {
    max-width: breakpoints.$small;
    margin-top: 4.5rem;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
