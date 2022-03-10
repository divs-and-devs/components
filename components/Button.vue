<template>
  <button
    :class="classes"
    :type="submit ? 'submit' : 'button'"
    :disabled="disabled"
    @click="click"
    @click.middle="openNewTab"
  >
    <d-icon
      v-if="icon"
      :style="{ fontSize: iconSize == 1 ? undefined : iconSize + 'rem' }"
      :name="icon"
    />
    <span>
      <slot />
    </span>
    <span v-if="loading" class="loading">
      <slot name="loader">
        <d-spinner />
      </slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {

    /**
     * @values primary, secondary, tertiary, danger, link
     */
    type: {
      type: String,
      default: 'primary',
      validator: input =>
        ['primary', 'secondary', 'tertiary', 'danger', 'link'].includes(input)
    },

    /**
     * @values inline, block
     */
    size: {
      type: String,
      default: 'inline',
      validator: value => ['inline', 'block'].includes(value)
    },

    /**
     * @values icons
     */
    icon: {
      type: String,
      default: undefined
    },

    iconSize: {
      type: [Number, String],
      default: 1
    },

    iconAlign: {
      type: String,
      validator: value => ['left', 'right'].includes(value),
      default: 'left'
    },

    disabled: {
      type: Boolean,
      default: false,
      required: false
    },

    to: {
      type: String,
      default: undefined,
      required: false
    },

    newTab: {
      type: Boolean,
      default: false,
      required: false
    },

    submit: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return [
        this.type,
        `icon-${this.iconAlign}`,
        {
          'icon-only': this.iconOnly,
          'has-icon': this.icon,
          loading: this.loading,
          block: this.size === 'block'
        }
      ];
    },

    iconOnly () {
      return !this.$slots.default;
    }
  },

  methods: {
    openNewTab (event) {
      if ((this.disabled || !this.to) && !event) {
        this.$emit('click', event);
        return;
      }

      if (
        this.to.startsWith('http') ||
        this.to.startsWith('mailto:') ||
        this.to.startsWith('//')
      ) {
        window.open(this.to, '_blank');
        return;
      }

      const routerdata = this.$router.resolve({ path: this.to });
      window.open(routerdata.href, '_blank');
    },

    openHere () {
      if (this.disabled || !this.to) return;

      if (
        this.to.startsWith('http') ||
        this.to.startsWith('mailto:') ||
        this.to.startsWith('//')
      ) {
        location.href = this.to;
        return;
      }

      this.$router.push({ path: this.to });
    },

    click (event) {
      if (!this.to) return this.$emit('click', event);

      if (this.disabled) return;

      if (this.newTab) this.openNewTab();
      else this.openHere();
    }
  }
};
</script>
<style lang="scss" scoped>
button {
  display: inline-flex;
  justify-content: space-between;
  box-sizing: border-box;
  border: none;
  user-select: none;
  font-family: inherit;
  font-size: 1rem;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  border-radius: $border-radius;
  background: $shade-300;
  color: $text-color;
  cursor: pointer;
  line-height: 2rem;
  padding: 0.25rem 1.5rem;
  margin: 1rem 0.5rem;
  transition: background-color 100ms ease, color 100ms ease, border 100ms ease;

  &.block:not(.icon-only) {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    margin-inline: 0;

    span {
      flex: 1;
    }
  }

  form > & {
    margin-inline: 0;
  }

  span {
    vertical-align: middle;
    text-align: center;
  }

  > .icon {
    place-self: center;
  }

  &.icon-left.has-icon:not(.icon-only) {
    padding-left: 1rem;

    > .icon {
      order: -1;
      margin-right: .75rem;
    }
  }

  &.icon-right.has-icon:not(.icon-only) {
    padding-right: 1rem;

    > .icon {
      order: 1;
      margin-left: .75rem;
    }
  }

  &.loading {
    cursor: progress;
    position: relative;

    span:first-of-type {
      opacity: 0;
    }

    span.loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .spinner {
      position: relative;
      top: 0.333rem;
      margin-top: -0.333rem;
    }
  }

  &.icon-only {
    display: inline-block;
    aspect-ratio: 1 / 1;
    padding: 0.25rem;
    margin: 0.5rem;
    line-height: 1em;

    svg + span {
      margin-left: 0;
    }
  }

  &:disabled {
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid var(--color, $primary);
    outline-offset: 2px;
  }

  &.primary {
    background: $primary;
    color: $primary-text;

    &.icon-only {
      min-width: 2.5rem;
    }

    &.loading {
      background-color: $primary-shade !important;

      .spinner {
        color: $primary-fade;
        --color: #{$primary} !important;
      }
    }

    &:hover {
      background-color: $primary-shade;
      color: $shade-100;
    }

    body.dark &:hover {
      color: $text-color;
    }

    &:active {
      background-color: $text-color;
      color: $primary-text;
    }

    body.dark &:active {
      color: $text-color;
      background-color: $shade-100;
    }

    &:disabled,
    body.dark &:disabled {
      background-color: $shade-500;
      color: $primary-text;
    }
  }

  &.link,
  &.secondary {
    background: transparent;
    color: $primary;

    &:hover {
      color: $primary-shade;
    }

    body.dark &:hover {
      color: $primary-fade;
    }

    &.loading {
      color: $primary-shade !important;
    }

    body.dark &.loading {
      color: $primary-fade !important;
    }

    &:active,
    body.dark &:active {
      color: $text-color;
    }

    &:disabled,
    body.dark &:disabled {
      color: $shade-500;
    }
  }

  &.tertiary {
    background: transparent;
    color: $shade-500;

    &:hover {
      color: $shade-300;
    }

    body.dark &:hover {
      color: $shade-700;
    }

    &.loading {
      color: $primary !important;
    }

    &:active,
    body.dark &:active {
      color: $shade-800;
    }

    &:disabled,
    body.dark &:disabled {
      color: $shade-300;
    }
  }

  &.danger {
    background: $error;
    color: $error-text;

    &:not(.loading):hover {
      background-color: $error-shade;
      color: $background;
    }

    body.dark &:not(.loading):hover {
      color: $text-color;
    }

    &.loading {
      background-color: $error-shade !important;

      .spinner {
        color: $error;
        --color: #{$background} !important;
      }
    }

    &:active {
      background-color: $text-color;
      color: $background;
    }

    body.dark &:active {
      color: $text-color;
      background-color: $shade-100;
    }

    &:disabled,
    body.dark &:disabled {
      background-color: $shade-500;
      color: $background;
    }
  }

  &.link {
    line-height: 1em;
    margin: 0;
    padding: 0;
    min-width: 0;
  }
}
</style>
