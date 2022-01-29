<template>
  <div class="spinner" :class="color" />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  }
};
</script>

<style scoped lang="scss">
.spinner {
  display: inline-block;
  border-radius: 50%;
  font-size: 1.5em;
  box-sizing: border-box;
  width: 1em;
  height: 1em;
  transform: translateZ(0);
  border-left: 0.1em solid currentColor;
  border-top: 0.1em solid var(--color);
  border-right: 0.1em solid var(--color);
  border-bottom: 0.1em solid var(--color);
  animation: spinner 1.1s infinite linear;

  @include colors(color);

  @include fade-colors(--color);

  body.dark & {
    @include shade-colors(--color);
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
