<template>
  <div class="lds-dual-ring" :style="cssVars"></div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    variant: {
      type: String,
      required: false,
      default: "solid",
      validator: function(value) {
        return ["solid", "outline"].includes(value);
      },
    },
  },
  computed: {
    cssVars: function() {
      return {
        "--color": this.variant === "solid" ? "#fff" : "#5f2eea",
      };
    },
  },
};
</script>

<style scoped lang="scss">
.lds-dual-ring {
  display: inline-block;
  vertical-align: middle;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: 3px solid var(--color);
  border-color: var(--color) transparent var(--color) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
