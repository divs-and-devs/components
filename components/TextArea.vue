<template>
  <div class="text-area" :class="{ error: error || isInvalid, disabled }">
    <label v-if="label" :for="label">
      {{ label }}
    </label>

    <textarea
      v-model="content"
      v-bind="$attrs"
      :name="label"
      :disabled="disabled"
      :maxlength="max"
      @invalid="isInvalid = true"
      @input="handleInput"
      @keydown.stop
    />
    <p v-if="max" class="count">
      {{ content.length }}/{{ max }}
    </p>
    <p v-if="error || isInvalid" class="error">
      {{ error || invalid }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: false,
      default: null
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    error: {
      type: String,
      required: false,
      default: undefined
    },

    value: {
      type: String,
      required: false,
      default: ''
    },

    max: {
      type: [String, Number],
      default: undefined
    }
  },

  data () {
    return {
      content: this.value,
      isInvalid: false
    };
  },

  computed: {
    invalid: {
      set (value) {
        this.$el.querySelector('textarea')?.setCustomValidity(value ?? '');
      },
      get () {
        return this.$el?.querySelector('textarea')?.validationMessage;
      }
    }
  },

  watch: {
    value (newValue) {
      this.isInvalid = false;
      this.content = newValue;
    }
  },

  methods: {
    handleInput () {
      this.$emit('input', this.content);
    }
  }
};
</script>

<style lang="scss" scoped>
.text-area {
  margin: 1rem 0;

  label {
    font-family: $body-font, sans-serif;
    font-size: 0.8rem;
    display: block;
    margin: 0.5rem 0;
    transition: color 250ms ease;
  }

  textarea {
    border-radius: $border-radius;
    min-height: 12rem;
    padding: 0.75rem 1rem;
    resize: none;
    outline: none;
    background-color: $background;
    color: $text-color;
    border: 1px solid $shade-300;
    transition: background-color 250ms ease, box-shadow 250ms ease,
      border-color 250ms ease;
    width: 100%;
    font: inherit;
    box-sizing: border-box;
    resize: vertical;

    &:focus-within,
    &:not(:disabled):hover {
      background: $background;
      border-color: $primary;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      background-color: $warning-fade;
    }

    &::placeholder {
      color: $shade-400;
      opacity: 1;
      user-select: none;
    }
  }

  .error {
    color: $error;
    font-family: $body-font, sans-serif;
    font-size: 0.8em;
    margin-top: 0.5em;
    text-align: left;
  }

  .count {
    margin-top: -1.25em;
    margin-right: 1em;
    text-align: right;
    z-index: 1;
    opacity: 0.5;
    font-size: 0.8rem;
    pointer-events: none;
  }

  &.disabled {
    textarea {
      color: $shade-400;
    }

    textarea {
      background: $shade-200;
    }
  }

  &:invalid,
  &.error {
    textarea {
      border-color: $error;
    }
  }
}
</style>
