<template>
  <div>
    <input
      placeholder="   "
      :type="type"
      :required="isRequired"
      v-model="input"
      @blur="touched = true"
      :class="{
        invalid: setError || (touched && isRequired && input.length === 0),
      }"
      @input="$emit('input', $event.target.value)"
    />
    <button v-if="input.length > 0" id="clear" @click="input = ''">
      <span class="material-icons">
        close
      </span>
    </button>
    <label :class="labelClasses" v-if="placeholder">{{ placeholder }}</label>
    <span
      v-if="
        (errorMessage && isRequired && touched && input.length === 0) ||
          setError
      "
      >{{ errorMessage }}</span
    >
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: true,
      default: "text",
      validator: (value) => ["email", "text", "password"].includes(value),
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      required: true,
      default: false,
    },
    errorMessage: {
      type: String,
      required: false,
      default: "",
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
      touched: false,
    };
  },
  mounted() {
    this.input = this.value;
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
@use "@/assets/colors" as colors;
div {
  margin: 0;
  padding: 0;
  background-color: transparent;
  font-family: inherit;
  max-width: 25rem;
  font-weight: 400;
  font-size: 1rem;
  line-height: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: colors.$inputText;
  transition: 0.2s ease all;
  position: relative;
  span {
    padding-left: 1rem;
    max-width: 100%;
    flex-basis: 100%;
  }
  input {
    font-family: inherit;
    display: block;
    box-sizing: border-box;
    transition: 0.2s ease all;
    height: 3.5rem;
    border-radius: 1rem;
    background-color: colors.$inputBackground;
    border: 2px solid colors.$inputBackground;
    width: 100%;
    padding-left: 1.75rem;
    padding-right: 3.25rem;
    padding-top: 1.25rem;
    font-size: 1rem;

    &:active,
    &:focus {
      border: 2px solid colors.$inputBorder;
      background-color: transparent;
    }
    &:focus ~ label {
      top: 0;
      font-weight: bold;
      font-size: 0.875rem;
    }
    &:not(:placeholder-shown):invalid {
      border: 2px solid colors.$inputError;
      background-color: colors.$inputErrorBg;
    }
  }
  #clear {
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
  label {
    transition: 0.2s ease all;
    font-size: 1rem;
    top: 0.875rem;
    left: 1.75rem;
    position: absolute;
    pointer-events: none;
    color: colors.$inputPlaceholder;
  }
}
.hold {
  top: 0;
  font-weight: bold;
  font-size: 0.875rem;
}
.invalid {
  border: 2px solid colors.$inputError;
  background-color: colors.$inputErrorBg;
}
</style>
