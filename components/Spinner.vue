<template>
  <div :class="size">
    <div class="spinner" :class="color" />
  </div>
</template>

<script>
export default {
  props: {
    /**
     * @values inline, block
     */
    size: {
      type: String,
      default: 'inline',
      validator: value => ['inline', 'block'].includes(value)
    },

    /**
     * @values colors
     */
    color: {
      type: String,
      default: 'primary'
    }
  }
};
</script>

<style scoped lang="scss">
.block {
  @include flex;
}

.inline {
  display: inline-block;
}

.spinner {
  display: inline-block;
  border-radius: 50%;
  font-size: 1.5em;
  box-sizing: border-box;
  width: 1em;
  height: 1em;
  transform: translateZ(0);
  border-left: 0.1em solid currentColor;
  border-top: 0.1em solid $shade-300;
  border-right: 0.1em solid $shade-300;
  border-bottom: 0.1em solid $shade-300;
  animation: spinner 1s infinite linear;

  @include colors(color);

  &.shade-300 {
    color: $shade-500;
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
