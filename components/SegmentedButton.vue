<template>
  <div
    ref="segmentedButton"
    :class="color"
    class="segmented-button"
    tabindex="0"
    role="radiogroup"
    @keydown.stop.left="selectPrevious"
    @keydown.stop.right.space="selectNext"
  >
    <div class="selector" :style="getStyle()" />
    <slot />

    <button
      v-for="[option, data] in Object.entries(options)"
      :key="option"
      type="button"
      tabindex="-1"
      :class="{ selected: value == option }"
      role="radio"
      :aria-checked="value == option"
      :aria-label="data.label || data.icon"
      @click="$emit('input', option)"
      @pointerenter="emitIfPressed($event, option)"
    >
      <d-icon
        v-if="typeof data == 'object'"
        :name="data.icon"
        size="1.2"
      />

      <template v-if="typeof data == 'object'">
        {{ data.label }}
      </template>
      <template v-else>
        {{ data }}
      </template>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },

    color: {
      type: String,
      default: 'primary'
    },

    options: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    selectedIndex () {
      return Object.keys(this.options).indexOf(this.value);
    }
  },

  mounted () {
    this.$forceUpdate();
  },

  methods: {
    click () {
      this.selectNext();
    },

    emitIfPressed (event, option) {
      if (event.buttons === 1) this.$emit('input', option);
    },

    selectNext () {
      if (this.selectedIndex < Object.keys(this.options).length - 1) {
        const value = Object.keys(this.options)[this.selectedIndex + 1];

        this.$emit('input', value);
      } else {
        const value = Object.keys(this.options)[0];

        this.$emit('input', value);
      }
    },

    selectPrevious () {
      if (this.selectedIndex > 0) {
        const value = Object.keys(this.options)[this.selectedIndex - 1];
        this.$emit('input', value);
      } else {
        const value = Object.keys(this.options)[
          Object.keys(this.options).length - 1
        ];
        this.$emit('input', value);
      }
    },

    getElements () {
      if (this.$refs.segmentedButton)
        return [...this.$refs.segmentedButton.querySelectorAll('button')];
      else if (this.$el) return [...this.$el.querySelectorAll('button')];

      return [];
    },

    getPosition () {
      if (this.getElements().length === 0 || this.selectedIndex === -1)
        return -40;
      return (
        this.getElements()
          .slice(0, this.selectedIndex)
          .reduce((p, c) => p + c.clientWidth, 0) + 'px'
      );
    },

    getCurrentWidth () {
      if (this.getElements().length === 0 || this.selectedIndex === -1)
        return 40;
      return this.getElements()[this.selectedIndex].clientWidth + 'px';
    },

    getStyle () {
      return {
        selectedIndex: this.selectedIndex,
        left: this.getPosition(),
        width: this.getCurrentWidth()
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.segmented-button {
  display: inline-flex;
  border-collapse: collapse;
  position: relative;
  border-radius: $border-radius;
  overflow: hidden;
  border: 1px solid currentColor;
  margin: 1rem 0;
  contain: layout;

  @include colors(color);
  @include text-color(--text-color);

  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }

  .selector {
    position: absolute;
    top: -1px;
    bottom: -1px;
    background-color: currentColor;
    left: -2.5rem;
    width: 2.5rem;
    transition: left 200ms ease-in-out, width 200ms ease-in-out;
  }

  button {
    all: unset;
    @include flex;
    gap: 0.5rem;
    padding: 0.75em;
    box-sizing: border-box;
    cursor: pointer;
    color: inherit;
    transition: color 200ms ease-in-out;
    z-index: 1;
    user-select: none;

    &.selected {
      color: var(--text-color, #fff);
    }
  }
}
</style>
