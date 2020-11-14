<template>
  <div id="modal" @click.self="$emit('close')">
    <Panel class="modal__content" v-on:click.stop>
      <button class="close" @click.stop="$emit('close')">
        <span class="material-icons">
          close
        </span>
      </button>
      <slot></slot>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/features/Atoms/Panel.vue";
// import Button from "@/features/Atoms/Button.vue";
export default {
  name: "Modal",
  components: {
    Panel
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/colors" as colors;
@use "@/assets/responsive" as breakpoints;
#modal {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal__content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  text-align: center;
}
@media screen and (max-width: breakpoints.$large) {
  .modal__content {
    padding-bottom: 3rem;
    border-radius: 16px 16px 0 0;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
@media screen and (min-width: breakpoints.$medium) {
  .close {
    margin-right: -4rem;
  }
}
@media screen and (min-width: breakpoints.$large) {
  .modal__content {
    margin-left: auto;
    margin-right: auto;
    margin-top: 3rem;
    max-width: breakpoints.$medium;
  }
}
.close {
  margin: 0;
  align-self: flex-end;
  text-align: right;
  width: 3rem;
  font-size: 24px;
  padding: 0;
  background-color: transparent;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-color: transparent;

  padding-right: 1rem;
  padding-left: 1rem;
  color: colors.$inputPlaceholder;
  transition: 0.2s ease all;
  &:hover,
  &:focus {
    color: colors.$inputCaption;
  }
  &:active {
    color: colors.$inputText;
  }
}
</style>
