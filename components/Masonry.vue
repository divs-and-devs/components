<template>
  <!-- use columnsProperty instead of columns to allow --columns to be overriden-->
  <div class="masonry" :style="{'--columnsProperty': calculatedColumns, gap}">
    <div v-for="(chunk, column) in chunks" :key="column" class="column">
      <template v-for="(item, index) in chunk">
        <slot :value="item" :index="column * chunkSize + index" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },

    width: {
      type: [Number, String],
      default: undefined
    },

    columns: {
      type: [Number, String],
      default: undefined
    },
    gap: {
      type: [Number, String],
      default: '1rem'
    }
  },
  data () {
    return {
      calculatedColumns: Number(this.columns),
      minWidth: 0
    };
  },

  computed: {
    chunkSize () {
      return Math.ceil(this.value.length / this.calculatedColumns);
    },

    chunks () {
      const result = [];

      for (let i = 0; i < this.value.length; i++) {
        if (!result[i % this.calculatedColumns])
          result[i % this.calculatedColumns] = [];

        result[i % this.calculatedColumns].push(this.value[i]);
      }

      return result;
    }
  },

  watch: {
    width () {
      this.calculateMinWidth();
    }
  },
  mounted () {
    if (this.width !== undefined && process.browser) {
      this.calculateMinWidth();
      this.resize();

      const observer = new ResizeObserver(this.resize);
      observer.observe(this.$el);
    }
  },

  methods: {
    calculateMinWidth () {
      if (!process.browser)
        return;

      const div = document.createElement('div');
      div.style.width = this.width;
      this.$el.appendChild(div);

      this.minWidth = Number(getComputedStyle(div).width.replace(/\D/g, ''));
      div.remove();

      this.resize();
    },

    resize () {
      this.calculatedColumns = Math.ceil(this.$el.clientWidth / this.minWidth);
    }
  }
};
</script>

<style lang="scss" scoped>
    .masonry {
      display: grid;
      grid-template-columns: repeat(var(--columns, var(--columnsProperty, 3)), 1fr);

      .column {
        display: flex;
        flex-direction: column;
        gap: inherit;
      }
    }
</style>
