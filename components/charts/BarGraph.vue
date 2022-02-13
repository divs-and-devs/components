<template>
  <div class="bar-graph" :class="[{'has-name': name}, orientation]">
    <div v-for="(row, i) in data" :key="i" class="data-row">
      <p v-if="name">
        {{ get(row, name) }}
      </p>
      <div
        class="bar"
        :class="getColor(i)"
        :style="{ '--width': get(row, value) * scaleFactor * 100 + '%' }"
      >
        {{ get(row, value) }} {{ unit }}
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'object-path';

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },

    orientation: {
      type: String,
      default: 'horizontal',
      validator: value => ['horizontal', 'vertical'].includes(value)
    },

    unit: {
      type: String,
      default: '%'
    },

    name: {
      type: String,
      default: undefined
    },

    value: {
      type: String,
      default: 'value'
    },

    scale: {
      type: Number,
      default: undefined
    },

    colors: {
      type: Array,
      default: () => ['primary']
    }
  },

  computed: {
    maximumValue () {
      return this.data.reduce((p, c) => get(c, this.value) > p ? get(c, this.value) : p, 0);
    },

    scaleFactor () {
      return this.scale ?? 1 / this.maximumValue;
    }
  },

  methods: {
    get,

    getColor (i) {
      return this.colors[i % this.colors.length];
    }
  }
};
</script>

<style lang="scss" scoped>
  .bar-graph {
    display: grid;
    gap: 1rem;

    &.horizontal {
      align-items: center;
      grid-template-columns: 1fr;
      &.has-name {
        grid-template-columns: auto 1fr;
      }
    }

    &.vertical {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(auto-fit, 3rem);
      height: 100%;
      min-height: 300px;
      align-items: flex-start;

      &.has-name {
        grid-template-rows: auto 1fr;

        p {
          transform: rotate(45deg);
        }

        .bar {
          grid-row: 2;
        }
      }
    }
  }

  .data-row {
    display: contents;

    p {
      color: $shade-500;
    }

    .bar {
      box-sizing: border-box;
      padding: 0.5rem;
      line-height: 2rem;
      border-radius: $border-radius / 2;
      user-select: none;
      white-space: nowrap;
      transition: background-color 250ms ease-in-out, width 100ms ease, height 100ms ease;

      .bar-graph.vertical & {
        height: var(--width);
        writing-mode: vertical-rl;
        text-orientation: mixed;
        animation: appear-vertical 500ms ease-out forwards;

        @keyframes appear-vertical {
          0% {
            height: 0;
          }
        }
      }

      .bar-graph.horizontal & {
        width: var(--width);
        animation: appear-horizontal 500ms ease-out forwards;

        @keyframes appear-horizontal {
          0% {
            width: 0;
          }
        }
      }

      @include colors;
      @include text-color;

      &:hover {
        @include fade-colors;
      }

    }
  }
</style>
