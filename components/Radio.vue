<template>
  <div class="radio" :class="[direction, { disabled, invalid }]">
    <label v-if="label">{{ label }}</label>

    <p v-if="invalid" class="error">
      Select one of the following options.
    </p>

    <input
      type="text"
      hidden
      :required="required"
      :value="value"
      @invalid="invalid = true"
    >

    <button
      v-for="(text, option) in options"
      :key="option"
      class="radio-button"
      :class="{ checked: value == option }"
      type="button"
      :disabled="disabled"
      @click.prevent="select(option)"
    >
      <span class="check" :class="color" />

      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    options: {
      type: Object,
      default: () => ({}),
      required: true
    },

    label: {
      type: String,
      default: undefined
    },

    direction: {
      type: String,
      default: 'block',
      validator: value => ['inline', 'block'].includes(value)
    },

    color: {
      type: String,
      default: 'primary'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    },

    value: {
      type: String,
      default: undefined,
      required: false
    }
  },

  data () {
    return {
      invalid: false
    };
  },

  methods: {
    select (value) {
      this.invalid = false;
      if (this.disabled) return;

      this.$emit('input', value);
    }
  }
};
</script>

<style lang="scss" scoped>
.radio {
  margin: 0.5rem 0;

  label {
    font-family: $body-font, sans-serif;
    font-size: 0.8rem;
    display: block;
    margin: 0.5rem 0;
    transition: color 250ms ease;
    flex: 0 0 100%;
  }

  .error {
    color: $error;
    font-family: $body-font, sans-serif;
    font-size: 0.8em;
    margin-bottom: 0.5em;
    text-align: left;
    flex: 0 0 100%;
  }

  &.invalid .radio-button {
    > .check {
      border-color: $error;
      background-color: $error-fade;

      body.dark & {
        background-color: $error-shade;
      }
    }
  }

  &.disabled > .radio-button,
  .radio-button:disabled {
    cursor: default;

    .check {
      background-color: $shade-100;
      color: $shade-500 !important;
    }

    &:focus-visible .check {
      outline: none;
      border: 1px solid $shade-500;
    }
  }

  &.inline {
    display: flex;
    column-gap: 1rem;
    flex-wrap: wrap;
  }

  &.block {
    display: block;

    .radio-button {
      margin: 0.5rem 0;
    }
  }

  > .radio-button {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: flex-start;
    appearance: none;
    font: inherit;
    border: none;
    background-color: transparent;
    padding: 0;

    &:focus-visible .check {
      outline: 2px solid $primary;
      outline-offset: 2px;
      border-color: currentColor;
    }

    .check {
      display: inline-flex;
      width: 1em;
      height: 1em;
      margin-right: 0.5em;
      border-radius: 1em;
      border: 1px solid $shade-500;
      background-color: $background;
      box-sizing: border-box;
      align-content: stretch;
      justify-content: stretch;
      padding: 2px;
      transition: border-color 250ms ease-in-out, color 250ms ease-in-out;

      @include colors(color);

      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        transform: scale(0);
        border-radius: 50%;
        background-color: currentColor;
        transition: transform 100ms ease-in-out;
      }
    }

    &.checked .check {
      border-color: currentColor;

      &::after {
        transform: scale(1);
      }
    }
  }
}
</style>
