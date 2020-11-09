<template>
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
</template>

<script>
import Button from "@/features/Atoms/Button.vue";
import TextInput from "@/features/Atoms/TextInput.vue";
import Panel from "@/features/Atoms/Panel.vue";
import Spinner from "@/features/Atoms/Spinner";
export default {
  name: "SignIn",
  components: {
    Button,
    TextInput,
    Panel,
    Spinner,
  },
  data: function() {
    return {
      email: "",
      isLoading: false,
    };
  },
  methods: {
    async login() {
      this.isLoading = !this.isLoading;
      // this.isLoading = true;
      // try {
      // } catch (error) {
      //   console.error(error);
      // }
      // this.isLoading = false;
      // Show the email modal
    },
    signup() {
      console.log("Sign up");
    },
  },
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
</style>
