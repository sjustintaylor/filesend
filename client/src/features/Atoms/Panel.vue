<template>
  <div id="panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Panel",
};
</script>

<style scoped lang="scss">
@use "@/assets/colors" as colors;
@use "@/assets/responsive" as breakpoints;
#panel {
  font-family: inherit;
  padding: 2rem;
  background-color: colors.$panelColor;
  @media screen and (max-width: breakpoints.$small) {
    padding: 1rem;
  }
  @media screen and (max-width: breakpoints.$medium) {
    width: 100%;
  }
  @media screen and (min-width: breakpoints.$large) {
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 16px;
    filter: drop-shadow(0px 32px 64px rgba(17, 17, 17, 0.08));
  }
}
</style>
