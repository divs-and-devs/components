<template>
  <div class="accordion" :class="{ 'full-height': fullHeight }">
    <slot />
  </div>
</template>

<script>
export default {
  provide () {
    return {
      toggleSection: this.toggleSection,
      selectedSections: this.selectedSections
    };
  },

  props: {
    open: {
      type: [String, Array],
      default: () => []
    },

    multiple: {
      type: Boolean
    },

    fullHeight: {
      type: Boolean
    }
  },

  data () {
    let open = this.open;

    if (typeof this.open === 'string')
      open = [this.open];

    return {
      selectedSections: open
    };
  },

  watch: {
    open () {
      this.$emit('update:open', this.open);
    }
  },

  methods: {
    toggleSection (key) {
      if (!this.multiple) {
        const toggleOff = this.selectedSections[0] === key;

        this.selectedSections.splice(0);

        if (!toggleOff)
          this.selectedSections.push(key);

        return;
      }

      const index = this.selectedSections.indexOf(key);

      if (index < 0) {
        this.selectedSections.push(key);
        return;
      }

      this.selectedSections.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
  .accordion {
    &.full-height {
      display: flex;
      flex-direction: column;
      height: 100%;

      > .accordion-item {
        flex: 0;
        transition: flex 200ms ease, max-height 200ms ease;
      }

      > .accordion-item.open {
        flex: 1;
      }
    }
  }
</style>
