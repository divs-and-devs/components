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
    name: {
      type: String,
      default: 'help-circle'
    },
    color: {
      type: String,
      default: 'text-color'
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

    &.filled {
      fill: currentColor;
      stroke: $background;
    }

    @include colors(color);
  }
</style>
