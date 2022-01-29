<template>
  <section :class="['container', background, { screen, center }]">
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      default: ''
    },

    center: {
      type: Boolean,
      default: false
    },

    screen: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1rem var(--container-padding);
  max-width: 100%;
  border-radius: inherit;

  &.screen {
    min-height: 100vh;
  }

  &.center {
    @include flex;
    flex-direction: column;
    text-align: center;
  }

  @include colors;
  @include text-color;
}
</style>
