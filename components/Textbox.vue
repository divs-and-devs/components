<template>
  <div class="textbox" :class="{ error: isInvalid }">
    <label v-if="label">{{ label }}</label>
    <div
      class="input"
      :class="[{ search: type == 'search', disabled }, 'addon-' + addonAlign]"
    >
      <input
        ref="input"
        :type="internalType"
        :value="value"
        :disabled="disabled"
        v-bind="$attrs"
        v-on="listeners"
        @keydown.enter="$emit('enter')"
      >

      <span v-if="type === 'password'" class="right panel addon clickable">
        <d-icon
          :name="internalType === 'password' ? 'eye-off' : 'eye'"
          @click="togglePassword"
        />
      </span>
      <div v-if="!!$slots.default" class="addon" :class="addonType">
        <slot />
      </div>
      <div v-if="icon" class="addon" :class="addonType">
        <span class="icon">
          <d-icon :name="icon" />
        </span>
      </div>
    </div>
    <transition name="fade">
      <p v-if="isInvalid" class="error-text">
        {{ errorMessage || invalid }}
      </p>
    </transition>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    /**
     * @values email, password, search, tel, text, url
     */
    type: {
      default: 'text',
      type: String,
      required: false
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * @values icons
     */
    icon: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * this prop changes the style of an addon
     * @default "transparent"
     */
    addonType: {
      type: String,
      default: 'transparent',
      validator: value => ['transparent', 'panel'].includes(value)
    },

    addonAlign: {
      type: String,
      default: 'right',
      validator: value => ['left', 'right'].includes(value)
    },

    value: {
      default: '',
      type: undefined,
      required: false
    },

    /**
     * Displays an error message beneath the textbox.
     */
    errorMessage: {
      default: '',
      type: String,
      required: false
    },

    /**
     * Disables text editing.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      internalType: this.type,
      isInvalid: !!this.errorMessage
    };
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: $event => this.$emit('input', $event.target.value),
        click: $event => this.$emit('click', $event),
        invalid: () => {
          this.$emit('invalid');
          this.isInvalid = true;
        },
        keypress: this.onEnter,
        keydown: this.onEnter
      };
    },

    invalid: {
      set (value) {
        this.$el.querySelector('input').setCustomValidity(value ?? '');
      },
      get () {
        return this.$el.querySelector('input').validationMessage;
      }
    }
  },

  watch: {
    value () {
      this.isInvalid = false;
    },

    errorMessage () {
      this.isInvalid = !!this.errorMessage.trim();
    }
  },

  methods: {
    focus () {
      if (this.$refs.input) {
        this.$refs.input.focus();
        return;
      }

      this.$el.querySelector('input').focus();
    },

    blur () {
      if (this.$refs.input) {
        this.$refs.input.blur();
        return;
      }

      this.$el.querySelector('input').blur();
    },

    select () {
      this.$refs.input.select();
    },

    onEnter (event) {
      event.stopPropagation();
      if (event.key === 'Enter' && event.target)
        this.$emit('enter', event.target.value);
    },

    togglePassword () {
      this.internalType = this.internalType !== 'text' ? 'text' : this.type;
    }
  }
};
</script>

<style lang="scss" scoped>
.textbox {
  margin: 1rem 0;
  min-height: 2.5rem;

  label {
    font-family: $body-font, sans-serif;
    font-size: 0.8rem;
    display: block;
    margin: 0.5rem 0;
    transition: color 250ms ease;
  }

  .error-text {
    color: $error;
    font-family: $body-font, sans-serif;
    font-size: 0.8em;
    margin-top: 0.5em;
    text-align: left;
  }

  &.error .input {
    --input-border: #{$error};
    --icon-color: #{$error};
  }

  > .input {
    --input-background: #{$background};
    --input-border: #{$shade-300};
    --input-color: #{$text-color};
    background-color: var(--input-background);
    border: 1px solid var(--input-border);
    color: var(--input-color);
    border-radius: $border-radius;
    display: flex;
    align-items: stretch;
    height: 2.5rem;
    overflow: clip;
    box-sizing: border-box;
    transition: background-color 250ms ease, color 250ms ease,
      border-color 250ms ease;

    > * {
      max-height: 2.5rem;
    }

    &.disabled {
      --input-background: #{$shade-200};
      --input-color: #{$shade-400};

      pointer-events: none;
      user-select: none;
    }

    &:focus-within,
    &:not(:disabled):hover {
      --input-background: #{$background};
      --icon-color: #{$primary};
      --input-border: #{$primary};
    }

    &:invalid {
      --input-background: #{$error-fade};
      --input-border: #{$error};
      --icon-color: #{$error};
    }

    input {
      border: none;
      background: none;
      flex: 1;
      color: $shade-600;
      transition: background-color 250ms ease, box-shadow 250ms ease;
      font-size: 1rem;
      font-family: $body-font, sans-serif;
      font-weight: normal;
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      -moz-appearance: textfield;

      &::placeholder {
        color: $shade-400;
        opacity: 1;
        user-select: none;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        box-shadow: 0 0 0 100px $warning-fade;
        background-color: $warning-fade;
        color: $warning-text;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        display: none;
        appearance: none;
        margin: 0;
      }
    }

    &.addon-right {
      padding-right: 0;

      .addon {
        border-left: 1px solid var(--input-border, $shade-200);
      }
    }

    &.addon-left {
      padding-left: 0;

      .addon {
        order: -1;
        border-right: 1px solid var(--input-border, $shade-200);
      }
    }

    .addon {
      transition: border-color 250ms ease;
      display: flex;

      &.panel {
        background-color: $shade-200;
      }

      > .icon {
        height: 1em;
        width: 1em;
        padding: 0.75em;
        transition: color 250ms ease;
        color: var(--iconColor, $shade-400);
        place-self: center;

        svg {
          vertical-align: initial;
        }
      }

      > * {
        max-height: 100%;
        margin: 0;
      }

      > button {
        border-radius: 0;
        margin: 0;
      }

      > .menu::v-deep > button {
        margin: 0;
        border-radius: 0;
        background: none;
      }

      &::v-deep .dropdown {
        button {
          border: none;
          background: none;
        }

        &.active button {
          color: $primary;
          background: none;
        }
      }
    }

    button {
      margin: 0;
      height: 2.5rem;
    }
  }
}
</style>
