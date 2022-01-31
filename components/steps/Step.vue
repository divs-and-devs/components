<template>
  <div
    class="step"
    :class="state"
    @click="clickHandler"
  >
    <span class="number">{{ number + 1 }}</span>
    <span>
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  inject: ['changeStep'],

  data () {
    return {
      number: 0,
      state: 'none'
    };
  },

  methods: {
    clickHandler () {
      this.changeStep(this.number);
    }
  }
};
</script>

<style lang="scss" scoped>
  $gradient: linear-gradient(
    270deg,
    $shade-300 0%,
    $shade-300 50%,
    var(--step-background-color) 50%,
    var(--step-background-color) 100%
  );

  .step {
    display: inline-block;
    margin: 2rem 0;
    position: relative;
    text-align: center;
    cursor: pointer;
    flex: 1;
    transition: background 200ms ease-in 200ms, color 200ms ease-in 200ms;

    span {
      font-size: 1rem;
      text-align: center;

      &.number {
        border-radius: 100%;
        background: $shade-300;
        width: 2.5rem;
        height: 2.5rem;
        color: $text-color;
        font-size: 1rem;
        margin: 0 auto 1rem;
        transition: background 200ms ease-in 200ms, color 200ms ease-in 200ms;

        @include flex;
      }
    }

    &:not(:last-of-type).current::after {
      background-position: 50%;
      transition: background-position 200ms ease-in 0;
    }

    &:not(:last-of-type)::after {
      content: '';
      width: calc(100% - 4.5rem);
      height: 2px;
      position: absolute;
      left: calc(50% + 2.25rem);
      top: calc(1rem + 2px);
      background: $gradient;
      background-size: 200% 100%;
      background-position: 100%;
      transition: background-position 200ms ease-out 400ms;
    }

    &:not(:last-of-type).done:after {
      background-position: 0;
    }

    &.done,
    &.current {
      span.number {
        background: var(--step-background-color);
        color: var(--step-color);
      }
    }
  }
</style>
