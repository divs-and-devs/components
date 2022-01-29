<template>
  <div class="number-input" :class="{ invalid: isInvalid }">
    <label v-if="label">{{ label }}</label>

    <div
      class="numberbox"
      :class="[{ disabled, 'is-dragging': isDragging }, type]"
    >
      <div class="input-field">
        <input
          ref="input"
          type="number"
          :value="value"
          :min="min"
          :max="max"
          :disabled="disabled"
          :placeholder="placeholder || min"
          :required="required"
          @invalid="isInvalid = true"
          @input="updateValue"
          @blur="clampValue"
          @keypress.stop
        >
        <span v-if="type == 'currency'" class="preview">
          {{ currencyValue }}
        </span>
      </div>

      <div
        v-if="type == 'number'"
        class="addon"
        aria-hidden="true"
        @dblclick.prevent
        @click.prevent
        @pointerdown="startDragging"
        @pointerup="stopDragging"
      >
        <span class="arrow positive" @click="addValue">
          <svg width="6" height="4" viewBox="0 0 6 4" fill="none">
            <path d="M0 4H6L3 0L0 4Z" fill="#788090" />
          </svg>
        </span>
        <span class="arrow negative" @click="substractValue">
          <svg width="6" height="4" viewBox="0 0 6 4" fill="none">
            <path d="M0 0H6L3 4L0 0Z" fill="#788090" />
          </svg>
        </span>
      </div>

      <div
        v-else-if="type == 'percentage'"
        class="addon percentage"
        aria-hidden="true"
        @dblclick.prevent
        @click.prevent
        @pointerdown="startDragging"
        @pointerup="stopDragging"
      >
        %
      </div>

      <div
        v-else-if="type == 'currency'"
        class="addon currency"
        aria-hidden="true"
      >
        &euro;
      </div>
    </div>
    <p v-if="isInvalid" class="error">
      <template v-if="invalid">
        {{ invalid }}
      </template>
      <template v-else>
        Dit veld is verplicht.
      </template>
    </p>
  </div>
</template>

<script>
import clamp from '../helpers/Clamp';

export default {
  name: 'NumberInput',

  props: {
    type: {
      type: String,
      validator: value =>
        ['number', 'currency', 'percentage'].includes(value),
      default: 'number'
    },

    currency: {
      type: String,
      default: 'EUR'
    },

    label: {
      type: String,
      default: ''
    },

    min: {
      type: [String, Number],
      required: false,
      default: 0
    },

    value: {
      type: Number,
      required: false,
      default: undefined
    },

    max: {
      type: [String, Number],
      required: false,
      default: undefined
    },

    placeholder: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      startY: 0,
      isDragging: false,
      isInvalid: false
    };
  },

  computed: {
    currencyValue () {
      if (
        this.value === undefined ||
        this.value == null ||
        Number.isNaN(this.value)
      )
        return '0';

      const formatter = new Intl.NumberFormat('nl', {
        style: 'currency',
        currency: this.currency
      });

      return formatter.format(this.value).replace(',00', ',-');
    },

    invalid: {
      set (value) {
        if (this.$el)
          this.$el.querySelector('input').setCustomValidity(value ?? '');
      },
      get () {
        if (this.$el) return this.$el.querySelector('input').validationMessage;
        return '';
      }
    }
  },

  watch: {
    value () {
      this.isInvalid = false;
    }
  },

  methods: {
    focus () {
      if (!this.$refs.input) this.$el.querySelector('input').focus();
      else this.$refs.input.focus();
    },

    updateValue (event) {
      if (!event.target.value && !this.required) this.$emit('input', undefined);
      else this.$emit('input', event.target.valueAsNumber || 0);
    },

    clampValue () {
      const internalValue = Number(this.$refs.input.value);

      if (internalValue === '' && !this.required)
        this.$emit('input', undefined);
      else if (Number.isNaN(internalValue)) this.$emit('input', 0);
      else if (this.min !== undefined && this.value < Number(this.min))
        this.$emit('input', Number(this.min));
      else if (this.max !== undefined && this.value > Number(this.max))
        this.$emit('input', Number(this.max));
      else this.$emit('input', this.value);
    },

    startDragging (e) {
      this.startY = e.clientY;
      this.isDragging = true;
      e.preventDefault();
      e.target.addEventListener('pointermove', this.drag);
      e.target.setPointerCapture(e.pointerId);
      e.target.requestPointerLock();
    },

    stopDragging (e) {
      this.isDragging = false;
      e.preventDefault();
      e.target.removeEventListener('pointermove', this.drag);
      e.target.releasePointerCapture(e.pointerId);
      document.exitPointerLock();
    },

    drag (e) {
      const scale = window.innerHeight / ((this.max ?? 200) - (this.min ?? 0));
      this.$emit(
        'input',
        Math.floor(
          clamp(
            (this.value ?? 0) + e.movementY / scale,
            Number(this.min),
            Number(this.max)
          )
        )
      );
    },

    addValue () {
      if (Number.isNaN(Number(this.value))) this.$emit('input', 0);
      else if (this.value < Number(this.max))
        this.$emit('input', this.value + 1);
    },

    substractValue () {
      if (Number.isNaN(Number(this.value))) this.$emit('input', 0);
      else if (this.value > Number(this.min))
        this.$emit('input', this.value - 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.number-input {
  margin: 1rem 0;

  label {
    font-family: $body-font, sans-serif;
    font-size: 0.8rem;
    display: block;
    margin: 0.5rem 0;
    transition: color 250ms ease;
  }

  .error {
    color: $error;
    font-family: $body-font, sans-serif;
    font-size: 0.8em;
    text-align: left;
    margin-top: 0.5rem;
  }

  &.invalid {
    .numberbox {
      border-color: $error;

      .addon {
        border-left-color: $error;
      }
    }
  }

  .numberbox {
    height: 2.5rem;
    width: 100%;
    display: flex;
    border: 1px solid $shade-300;
    background: $shade-100;
    border-radius: $border-radius;
    overflow: clip;
    transition: border-color 250ms ease;

    &:focus-within,
    &.is-dragging {
      border-color: $primary;
      background-color: $background;

      .addon {
        border-left-color: $primary;
      }
    }

    &.currency {
      height: auto;
      .input-field input {
        margin-top: 0.5rem;
      }
    }

    &.disabled {
      pointer-events: none;

      .input-field {
        background-color: $shade-200;
        color: $shade-400;
      }

      .addon {
        background-color: $shade-200;
      }
    }

    .input-field {
      width: 100%;
      height: 100%;
      flex-direction: column;
      padding: 0 1em;
      transition: background-color 250ms ease, color 250ms ease;

      @include flex(stretch, stretch);

      .preview {
        font-size: 0.8rem;
        color: $shade-500;
        margin-block: 0.5rem;
      }
    }

    input {
      font-family: $body-font;
      font-size: 1rem;
      font-weight: 400;
      appearance: textfield;
      border: none;
      background-image: none;
      box-shadow: none;
      color: inherit;
      background: inherit;
      height: inherit;
      padding: 0;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &::placeholder {
        color: $shade-400;
        opacity: 1;
        user-select: none;
      }
    }

    .addon {
      height: 1fr;
      width: 2.5rem;
      flex-shrink: 0;
      user-select: none;
      background-color: $shade-200;
      color: $shade-400;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      transition: background-color 250ms ease;
      border-left: 1px solid $shade-300;
      cursor: row-resize;

      &.currency {
        cursor: default;
      }

      &.percentage {
        @include flex;

        font-family: monospace;
        font-size: 1rem;
      }

      .icon {
        margin-top: 0.75rem;
      }

      > .arrow {
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
