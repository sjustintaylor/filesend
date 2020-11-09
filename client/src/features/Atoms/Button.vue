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
@use "@/assets/colors" as colors;
@use '../../assets/resets';

button {
  font-family: inherit;
  border-radius: 40px;
  padding: 8px 16px;
  color: colors.$textColor;
  font-weight: 600;
  line-height: 1.5rem;
  min-width: 7.5rem;
  transition: all 0.15s;

  &.solid {
    background-color: colors.$baseColor;
    border: 2px solid colors.$baseColor;
    &:hover,
    &:focus {
      border: 2px solid colors.$hoverColor;
      background-color: colors.$hoverColor;
    }
    &:active {
      background-color: color.adjust(colors.$hoverColor, $lightness: -10%);
    }
  }
  &.outline {
    color: colors.$baseColor;
    background-color: transparent;
    border: 2px solid colors.$baseColor;
    &:hover {
      border: 2px solid colors.$hoverColor;
    }
    &:focus {
      background-color: colors.$focusColor;
      color: colors.$hoverColor;
    }
    &:active {
      background-color: colors.$hoverColor;
      border-color: colors.$hoverColor;
      color: colors.$textColor;
    }
  }
  &.text {
    border: none;
    background-color: transparent;
    color: colors.$baseColor;
    &:hover {
      color: colors.$hoverColor;
    }
    &:active {
      color: colors.$textColor;
    }
    &:focus {
      background-color: colors.$focusColor;
    }
  }
}
</style>
