<template>
  <component
    :is="component"
    class="icon"
    :class="[color, { filled }]"
    :style="{ '--size': size }"
    :alt="name"
    aria-hidden="hidden"
    v-on="$listeners"
  />
</template>

<script>
export default {
  props: {

    /**
     * @values icons
     */
    name: {
      type: String,
      default: 'help-circle'
    },

    /**
     * @values colors
     */
    color: {
      type: String,
      default: undefined
    },

    filled: {
      type: Boolean,
      default: false
    },

    size: {
      type: [String, Number],
      default: 1
    }
  },

  computed: {
    component () {
      try {
        return require(`@/assets/icons/${this.name || 'help-circle'}.svg?inline`);
      } catch {
        return require('@/assets/icons/help-circle.svg?inline');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  svg {
    display: inline-block;
    height: 1em;
    width: 1em;
    font-size: calc(var(--size, 1rem) * 1rem);
    fill: transparent;
    stroke: currentColor;
    vertical-align: middle;
    transition: fill 200ms ease, stroke 200ms ease;

    &::v-deep .fill-only {
      opacity: 0;
    }

    &.filled {
      fill: currentColor;
      stroke: $background;

      &::v-deep .fill-only {
        opacity: 1;
      }
    }

    @include colors(color);
  }
</style>
