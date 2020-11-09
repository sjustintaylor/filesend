<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Panel",
};
</script>

<style scoped lang="scss">
@use "../../assets/colors" as base;
div {
  margin-top: 4rem;
  font-family: inherit;
  padding: 2rem;
  max-width: 960px;
  margin: 4rem auto;
  min-height: 3rem;
  background-color: base.$panelColor;
  border-radius: 16px;
  filter: drop-shadow(0px 32px 64px rgba(17, 17, 17, 0.08));
}
</style>
