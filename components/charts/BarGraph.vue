<template>
  <div class="bar-graph" :class="[{'has-name': name, small}, orientation]">
    <div v-for="(row, i) in data" :key="i" class="data-row">
      <p v-if="name">
        <slot name="label" :row="row" :label="get(row, name)" :index="i">
          {{ get(row, name) }}
        </slot>
      </p>
      <div
        class="bar"
        :class="getColor(i)"
        :style="{ '--width': get(row, value) * scaleFactor * 100 + '%', '--color': getColor(i) }"
      >
        <slot name="value" :row="row" :value="get(row, value)" :index="i" :unit="unit">
          {{ get(row, value) }} {{ unit }}
        </slot>
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
      default: ''
    },

    name: {
      type: String,
      default: undefined
    },

    value: {
      type: String,
      default: 'value'
    },

    small: {
      type: Boolean,
      default: false
    },

    scale: {
      type: Number,
      default: undefined
    },

    colors: {
      type: Array,
      default: () => ['primary-fade']
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

    --bar-height: 3rem;
    --indent: 0ch;

    &.small {
      --bar-height: 1rem;
      --indent: 6ch;

      gap: 0.25rem 1rem;

      .bar {
        line-height: 1rem;
        color: $text-color;
      }
    }

    &.horizontal {
      align-items: center;
      grid-template-columns: 1fr;

      &.has-name {
        grid-template-columns: auto 1fr;
      }
    }

    &.vertical {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(auto-fit, var(--bar-height));
      height: 100%;
      min-height: 300px;
      align-items: flex-start;

      &.has-name {
        grid-template-rows: auto 1fr;

        p {
          transform: rotate(45deg);
          text-align: center;
        }

        .bar {
          grid-row: 2;
        }
      }
    }
  }

  .data-row {
    display: contents;

    > p {
      color: $shade-500;
    }

    .bar {
      box-sizing: border-box;
      line-height: calc(var(--bar-height) - var(--indent, 0));
      border-radius: 4px;
      user-select: none;
      white-space: nowrap;
      transition: background-color 250ms ease-in-out, width 100ms ease, height 100ms ease;
      background-color: var(--color);
      text-indent: 0.5rem;

      .small & {
        text-indent: calc(100% + 1ch);
      }

      .bar-graph.vertical & {
        height: calc(var(--width) - var(--indent, 0));
        min-height: 0.25rem;
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
        width: calc(var(--width) - var(--indent,0));
        min-width: 0.25rem;
        min-height: calc(var(--bar-height) - var(--indent,0));
        animation: appear-horizontal 500ms ease-out forwards;

        @keyframes appear-horizontal {
          0% {
            width: 0;
          }
        }
      }

      @include colors;
      @include text-color;
      @include colors(border-color);

      @media print {
        border: 1px solid var(--color);
      }

      &:hover {
        @include fade-colors;
      }
    }
  }
</style>
