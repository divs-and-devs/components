<template>
  <ul class="menu-bar">
    <slot />
  </ul>
</template>

<script>
export default {
  provide () {
    return {
      inMenu: true,
      direction: 'inline',
      close: () => {}
    };
  },

  computed: {
    visibleItems () {
      return this.$slots.default.filter(x => !!x.tag).slice(0, 5);
    }
  }
};
</script>

<style lang="scss" scoped>
  .menu-bar {
    display: flex;
    max-width: 100vw;
    overflow-x: auto;
    background: $shade-100;
    border-bottom: 1px solid $shade-200;
    scrollbar-gutter: stable;
    scrollbar-width: thin;

    &::v-deep > li {
      display: inline-block;
      width: max-content;
      min-width: max-content;
      flex-shrink: 0;

      > span:first-child {
        margin-left: 0;
      }

      > svg {
        transform: rotate(90deg);
      }

      .tooltip {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
</style>
