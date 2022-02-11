<template>
  <button
    class="checkbox"
    tabindex="0"
    :class="[{ selected, disabled, truncate, content: !!$slots.default }, color]"
    :disabled="disabled"
    role="checkbox"
    type="button"
    :aria-selected="selected"
    @click="toggle"
  >
    <span class="box" />
    <span class="content">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: [Boolean, Array],
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    truncate: {
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

    name: {
      type: String,
      default: undefined
    }
  },

  data () {
    return { internalValue: this.value };
  },

  computed: {
    selected () {
      if (Array.isArray(this.internalValue))
        return this.internalValue.includes(this.name);

      return this.internalValue;
    }
  },

  watch: {
    value () {
      this.internalValue = this.value;
    }
  },

  methods: {
    toggle () {
      if (this.disabled) return;

      if (Array.isArray(this.internalValue)) {
        const index = this.internalValue.indexOf(this.name);
        if (index >= 0) this.internalValue.splice(index, 1);
        else this.internalValue.push(this.name);
        this.$emit('input', this.internalValue);
        return;
      }

      this.internalValue = !this.internalValue;
      this.$emit('input', this.internalValue);
    },

    click () {
      this.toggle();
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  margin: 0.5rem 0;
  padding: 0;
  user-select: none;
  cursor: pointer;
  position: relative;
  appearance: none;
  background: none;
  font: inherit;
  border: none;
  text-align: left;

  @include colors(--color);

  &:focus-visible {
    .box {
      outline: 2px solid var(--color);
      outline-offset: 2px;
    }
  }

  &:disabled {
    cursor: default;
    --color: #{$shade-400};

    .box {
      background-color: $shade-200;
      border-color: $shade-400;
    }
  }

  &.truncate,
  &.truncate .content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  &:not(.content) {
    display: inline-flex;
    vertical-align: middle;

    .box {
      margin-right: 0;
    }
  }

  .box {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 0.5em;
    flex-shrink: 0;
    border: 1px solid $shade-400;
    border-radius: math.div($border-radius, 2);
    box-sizing: border-box;
    vertical-align: middle;
    color: $shade-400;
    transition: background-color 200ms ease, border-color 200ms ease;
    background-color: $background;

    &::after {
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      opacity: 0;
      background: {
        position: center;
        repeat: no-repeat;
        size: 0.5rem;
        image: url("data:image/svg+xml,%3Csvg width='12' height='9' viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.3332 0.888672L3.99984 8.222L0.666504 4.88867' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' /%3E%3C/svg%3E%0A");
      }
      transition: opacity 200ms ease;
    }
  }

  &.selected .box {
    background-color: var(--color, $primary);
    border-color: var(--color, $primary);
    color: var(--color, $primary);

    &::after {
      opacity: 1;
    }
  }

  .content {
    line-height: 1rem;
    vertical-align: middle;
  }
}
</style>
