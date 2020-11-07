<template>
  <div>
    <input
      placeholder="   "
      :type="type"
      :required="isRequired"
      v-model="input"
      :class="{ invalid: setError }"
      @input="$emit('input-change', input)"
    />
    <button v-if="close" id="close" @click="input = ''">
      <span class="material-icons">
        close
      </span>
    </button>
    <label :class="labelClasses" v-if="placeholder">{{ placeholder }}</label>
    <span v-if="caption">{{ caption }}</span>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => ["email", "text", "password"].includes(value),
    },
    placeholder: {
      type: String,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    close: { type: Boolean, default: true },
    required: {
      type: Boolean,
      required: true,
      default: false,
    },
    caption: {
      type: String,
      required: false,
    },
    setError: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: function() {
    return {
      input: "",
    };
  },
  computed: {
    labelClasses: function() {
      return {
        hold: this.input.length > 0,
      };
    },
    isRequired: function() {
      return Boolean(this.required);
    },
  },
};
</script>

<style scoped lang="scss">
@use "../../assets/colors" as base;
div {
  width: 20rem;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: base.$inputText;
  transition: 0.2s ease all;
  position: relative;
  span {
    padding-left: 1rem;
    max-width: 20rem;
    flex-basis: 100%;
  }
  input {
    display: block;
    box-sizing: border-box;
    transition: 0.2s ease all;
    height: 3.5rem;
    border-radius: 1rem;
    background-color: base.$inputBackground;
    border: 2px solid base.$inputBackground;
    width: 100%;
    padding-left: 1.75rem;
    padding-right: 3.25rem;
    padding-top: 1.25rem;
    font-size: 1rem;

    &:active,
    &:focus {
      border: 2px solid base.$inputBorder;
      background-color: transparent;
    }
    &:focus ~ label {
      top: 0;
      font-weight: bold;
      font-size: 0.875rem;
    }
    &:not(:placeholder-shown):invalid {
      border: 2px solid base.$inputError;
      background-color: base.$inputErrorBg;
    }
  }
  #close {
    margin-left: -3rem;
    width: 3rem;
    font-size: 24px;
    padding: 0;
    background-color: transparent;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 1rem;
    color: base.$inputPlaceholder;
    transition: 0.2s ease all;
    &:hover,
    &:focus {
      color: base.$inputCaption;
    }
    &:active {
      color: base.$inputText;
    }
  }
  label {
    transition: 0.2s ease all;
    font-size: 1rem;
    top: 0.875rem;
    left: 1.75rem;
    position: absolute;
    pointer-events: none;
    color: base.$inputPlaceholder;
  }
}
.hold {
  top: 0;
  font-weight: bold;
  font-size: 0.875rem;
}
.invalid {
  border: 2px solid base.$inputError;
  background-color: base.$inputErrorBg;
}
</style>
