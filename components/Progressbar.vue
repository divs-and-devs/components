<template>
  <div
    class="progressbar"
    :class="{ 'has-label': !!label, indeterminate }"
    role="meter"
    :aria-label="label || 'progress'"
    :aria-valuenow="Math.round(value)"
    :aria-valuemin="min"
    :aria-valuemax="max"
  >
    <p>
      <span>{{ label }}</span>
      <span v-if="!hideValue">
        {{ Math.round(value) }}<template v-if="type == 'percentage'">%</template><span v-else-if="type == 'points'" class="max">/{{ max }}</span>
      </span>
    </p>

    <div class="bar" :class="color">
      <div class="value" :style="{ width }" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },

    type: {
      type: String,
      validator: value => ['percentage', 'points'].includes(value),
      default: 'percentage'
    },

    min: {
      type: [String, Number],
      default: 0
    },

    max: {
      type: [String, Number],
      default: 100
    },

    label: {
      type: String,
      default: ''
    },

    indeterminate: {
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

    hideValue: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    width () {
      return ((this.value - this.min) / this.max) * 100 + '%';
    }
  }
};
</script>

<style lang="scss" scoped>
.progressbar {
  box-sizing: border-box;

  &.indeterminate {
    @keyframes indeterminate {
      0% {
        width: 33%;
        margin-left: -33%;
      }

      100% {
        width: 33%;
        margin-left: 133%;
      }
    }

    .bar > .value {
      animation: indeterminate 2.5s ease-in-out infinite forwards;
    }
  }

  &:not(.has-label) {
    @include flex(stretch);
    flex-direction: row-reverse;
    gap: 1rem;

    p {
      margin-bottom: 0;
    }

    p>span:first-of-type {
      display: none;
    }

    .bar {
      flex: 1;
    }
  }

  p {
    @include flex(space-between);
    margin-bottom: 0.5rem;
    vertical-align: middle;
    font-size: 0.8rem;

    .max {
      color: $shade-500;
    }
  }

  .bar {
    background-color: $shade-100;
    height: 0.25rem;
    border-radius: $border-radius;
    overflow: hidden;
    box-sizing: border-box;

    @include colors(--color);

    .value {
      background-color: var(--color);
      transition: width 500ms ease-out;
      height: 100%;
      border-radius: $border-radius;
    }
  }
}
</style>
