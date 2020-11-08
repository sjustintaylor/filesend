<template>
  <button :type="type" @click="$emit('btn-click')" :class="classObject">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: { type: String, required: true, default: "Button" },
    variant: {
      type: String,
      default: "solid",
      required: false,
      validator: function(value) {
        return ["solid", "outline", "text"].includes(value);
      },
    },
    type: {
      type: String,
      required: false,
      default: "button",
      validator: function(value) {
        return ["button", "submit"].includes(value);
      },
    },
  },
  computed: {
    classObject: function() {
      return {
        solid: this.variant === "solid",
        outline: this.variant === "outline",
        text: this.variant === "text",
      };
    },
  },
};
</script>

<style scoped lang="scss">
@use "sass:color";
@use "../../assets/colors" as base;
button {
  border-radius: 40px;
  padding: 8px 16px;
  color: base.$textColor;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  line-height: 1.5rem;
  min-width: 7.5rem;
  transition: all 0.15s;

  &.solid {
    background-color: base.$baseColor;
    border: 2px solid base.$baseColor;
    &:hover,
    &:focus {
      border: 2px solid base.$hoverColor;
      background-color: base.$hoverColor;
    }
    &:active {
      background-color: color.adjust(base.$hoverColor, $lightness: -10%);
    }
  }
  &.outline {
    color: base.$baseColor;
    background-color: transparent;
    border: 2px solid base.$baseColor;
    &:hover {
      border: 2px solid base.$hoverColor;
    }
    &:focus {
      background-color: base.$focusColor;
      color: base.$hoverColor;
    }
    &:active {
      background-color: base.$hoverColor;
      border-color: base.$hoverColor;
      color: base.$textColor;
    }
  }
  &.text {
    border: none;
    background-color: transparent;
    color: base.$baseColor;
    &:hover {
      color: base.$hoverColor;
    }
    &:active {
      color: base.$textColor;
    }
    &:focus {
      background-color: base.$focusColor;
    }
  }
}
</style>
