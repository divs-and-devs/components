<template>
  <component
    :is="element"
    class="skeleton"
    :class="type"
    :style="{ width, height, fontSize: size ? size + 'rem' : undefined }"
    aria-hidden="true"
  >
    <slot>
      <!-- eslint-disable vue/no-unused-vars -->
      <template v-for="i in random">
        &nbsp;
      </template>
    </slot>
  </component>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      validator: value => ['text', 'box', 'circle'].includes(value),
      default: 'box'
    },

    maxCharacters: {
      type: [Number, String],
      default: 50
    },

    minCharacters: {
      type: [Number, String],
      default: 10
    },

    size: {
      type: [Number, String],
      default: undefined
    },

    width: {
      type: [Number, String],
      default: undefined
    },

    height: {
      type: [Number, String],
      default: undefined
    },

    tag: {
      type: String,
      default: 'div'
    }
  },
  data () {
    let random = 0;

    const max = Number(this.maxCharacters);
    const min = Number(this.minCharacters);

    if (this.type === 'text')
      random = Math.floor(Math.random() * (max - min) + min);

    return {
      random,
      element: this.tag || (this.type === 'text' ? 'span' : 'div')
    };
  }
};
</script>

<style lang="scss" scoped>
.skeleton {
  user-select: none;
  pointer-events: none;
  cursor: default;
  background: linear-gradient(
    135deg,
    $shade-100 35%,
    $shade-200 50%,
    $shade-100 65%
  );
  border: none !important;
  background-size: 200%;
  animation: scrollBackground 2s linear infinite;

  @keyframes scrollBackground {
    0% {
      background-position-x: 235%;
    }

    100% {
      background-position-x: 35%;
    }
  }

  &.box {
    display: block;
    min-height: 1em;
  }

  &.text {
    display: inline;
    font: inherit;
    line-height: inherit;
    color: transparent !important;
    text-overflow: clip !important;
    word-break: break-all;
    margin: 2px 0;
    overflow: hidden;
    max-width: 100%;
  }

  &.circle {
    display: inline-block;
    aspect-ratio: 1 / 1;
    width: 1em;
    height: 1em;
    border-radius: 50%;
  }

  &::v-deep .skeleton {
    background: $shade-200;
  }
}
</style>
