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
  margin-left: auto;
  margin-right: auto;
  font-family: inherit;
  padding: 2rem;
  max-width: 960px;
  background-color: base.$panelColor;
  border-radius: 16px;
  filter: drop-shadow(0px 32px 64px rgba(17, 17, 17, 0.08));
}
</style>
