<template>
  <div
    v-if="pageCount > 1"
    class="paginator"
    :class="[color, type]"
    :style="{'--pages': maxWidth}"
    tabindex="0"
    @keydown.left.prevent="$emit('input', Math.max(0, value - 1))"
    @keydown.right.prevent="$emit('input', Math.min(pageAmount - 1, value + 1))"
  >
    <d-icon
      name="arrow-left"
      :color="value <= 0 ? 'shade-400' : 'shade-600'"
      @click="$emit('input', Math.max(0, value - 1))"
    />

    <div class="pages">
      <button
        v-for="(page) in pages"
        :key="page "
        :class="{ selected: value == page}"
        class="page"
        tabindex="-1"
        @click="$emit('input', page)"
      >
        {{ page + 1 }}
      </button>
    </div>

    <d-icon
      name="arrow-right"
      :color="value >= pageAmount - 1 ? 'shade-400' : 'shade-600'"
      @click="$emit('input', Math.min(pageAmount - 1, value + 1))"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },

    pageCount: {
      type: [Number, String],
      required: true
    },

    width: {
      type: [Number, String],
      default: 3
    },

    /**
     * @values colors
     */
    color: {
      type: String,
      default: 'primary'
    },

    type: {
      type: String,
      default: 'buttons',
      validator: value => ['buttons', 'bar'].includes(value)
    }
  },

  data () {
    return {
      transition: 'slide-horizontal'
    };
  },

  computed: {
    pagePadding () {
      return Math.floor(Number(this.maxWidth) / 2);
    },

    pageAmount () {
      return Number(this.pageCount);
    },

    maxWidth () {
      return Math.min(Number(this.width), this.pageAmount);
    },

    startPage () {
      if (this.value < this.pagePadding)
        return 0;

      if (this.value >= this.pageAmount - this.pagePadding)
        return this.pageAmount - this.maxWidth;

      return this.value - this.pagePadding;
    },

    endPage () {
      return Math.min(
        this.startPage + this.maxWidth - 1,
        this.pageAmount
      );
    },

    pages () {
      const array = [];

      for (let i = this.startPage; i <= this.endPage; i++)
        array.push(i);

      return array;
    }
  },

  watch: {
    value (old, newVal) {
      if (old < newVal)
        this.transition = 'slide-horizontal';

      if (old > newVal)
        this.transition = 'slide-horizontal-reverse';
    }
  }
};
</script>

<style lang="scss" scoped>
  .paginator {
    display: inline-grid;
    grid-template-columns: 3rem auto 3rem;
    align-items: center;
    justify-items: center;

    @include colors(--paginator-color);
    @include text-color(--paginator-text-color);

    &.buttons {
      display: inline-grid;
      border-radius: $border-radius;
      margin: 1rem auto;

      button {
        border-radius: $border-radius;
      }

      .selected {
        color: var(--paginator-text-color);
        background-color: var(--paginator-color);
      }
    }

    &.bar {
      display: grid;
      justify-content: space-between;
      border-top: 1px solid $shade-200;

      .selected {
        background: none;
        border-top: 2px solid var(--paginator-color);
        height: calc(2.5rem - 2px);
        padding-bottom: 1px;
      }
    }

    &:focus-visible {
      outline: $primary 2px solid;
      outline-offset: 2px;
    }

    .pages {
      display: grid;
      grid-template-columns: repeat(var(--pages, 3), 2.5rem) 0;
      height: 2.5rem;
      overflow: hidden;
    }

    button {
      border: none;
      background: none;
      width: 2.5rem;
      height: 2.5rem;
      cursor: pointer;
      user-select: none;
      font: inherit;

      @include flex;
    }

    .icon {
      cursor: pointer;
    }
  }
</style>
