<template>
  <div>
    <Panel id="panel">
      <h3>FileSend</h3>
      <p class="text_large">Easy file sharing with simple access controls.</p>
      <h4>Log In</h4>
      <TextInput
        v-model="email"
        id="email"
        :required="true"
        placeholder="Email Address"
        type="email"
        errorMessage="Your email address is required"
      />
      <div id="controls">
        <Button variant="solid" @click="login">
          <Spinner v-if="isLoading" />
          {{ isLoading ? "" : "Let's do this" }}
        </Button>
        <p>Don't have an account?</p>
        <Button variant="outline" @click="signup"> Sign me up</Button>
      </div>
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
  name: "SignIn",
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
      isLoading: false,
      showModal: false
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        console.log("hello");
      } catch (error) {
        console.error(error);
      }
      this.isLoading = false;
      this.showModal = true;
    },
    signup() {
      this.$router.push({ name: "SignUp" });
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
  & p {
    margin-top: 2rem;
  }
  & #spinner {
    margin-right: 0.5rem;
  }
}

#email {
  max-width: 100%;
}
h3 {
  line-height: 0;
  text-decoration-line: underline;
}
h4 {
  text-align: left;
}
@media screen and (min-width: breakpoints.$medium) {
  #email {
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
