<template>
  <button
    class="switch switch-container"
    :class="[{ small, truncate, hasContent: !!$slots.default }, align]"
    :disabled="disabled"
    role="switch"
    :aria-checked="value"
    :aria-readonly="disabled"
    type="button"
    @click="toggle()"
    @keydown.left.stop="toggle(false)"
    @keydown.right.stop="toggle(true)"
  >
    <p v-show="$slots.default" class="text">
      <slot />
    </p>
    <div class="switch" :class="[{ active: internalValue }, color]">
      <span class="knob" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'Switch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    /**
     * @values "left", "right"
     */

    align: {
      type: String,
      default: 'right',
      validator: value => ['left', 'right'].includes(value)
    },

    truncate: {
      type: Boolean
    },

    small: {
      type: Boolean,
      default: false
    },

    /**
     * @values colors
     */
    color: {
      type: String,
      default: 'primary'
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      internalValue: this.value
    };
  },

  watch: {
    value () {
      this.internalValue = this.value;
    }
  },

  methods: {
    click () {
      this.toggle();
    },

    toggle (state) {
      this.internalValue = state ?? !this.internalValue;

      this.$emit('input', this.internalValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.switch-container {
  font: inherit;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  gap: 1rem;
  margin: 1rem 0;

  @include flex(space-between, center);
  @include colors(--color);

  &:focus-visible .switch {
    outline: 2px solid var(--color, $primary);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: default;

    .switch {
      background-color: $shade-400;
      border-color: $shade-400;

      .knob {
        background-color: $shade-200;
      }

      &.active {
        background-color: $shade-500 !important;
        border-color: $shade-500 !important;
      }
    }
  }

  &:not(.hasContent) {
    display: inline-block;
    width: fit-content;

    .switch {
      margin: 0;
    }
  }

  &.left {
    .text {
      order: 1;
    }
  }

  &.truncate,
  &.truncate .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .text {
    flex: 1;
    text-align: left;
    user-select: none;
    line-height: 100%;
    padding: 2px 0;
  }

  .switch {
    background-color: $shade-300;
    border-radius: $border-radius * 3;
    height: 1.5em;
    width: 3em;
    border: 2px solid $shade-300;
    position: relative;
    contain: strict;
    color: #fff;
    transition: background-color 100ms ease-in-out,
      border-color 100ms ease-in-out;

    &.active {
      @include colors;
      @include colors(border-color);

      .knob {
        left: 1.5em;
      }
    }

    .knob {
      position: absolute;
      display: inline-block;
      height: 1.5em;
      width: 1.5em;
      background-color: currentColor;
      border-radius: $border-radius * 3;
      left: 0;
      transition: left 100ms cubic-bezier(0.455, 0.03, 0.515, 0.955),
        color 100ms ease;
    }
  }

  &.small {
    gap: 0.5em;

    .switch {
      font-size: 0.5rem;
    }
  }
}
</style>
