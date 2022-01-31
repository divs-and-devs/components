<template>
  <div class="step-container" :class="color">
    <slot />
  </div>
</template>

<script>
export default {
  provide () {
    return {
      changeStep: this.changeStep
    };
  },

  props: {
    step: {
      type: Number,
      default: 0
    },

    color: {
      type: String,
      default: 'primary'
    }
  },

  computed: {
    steps () {
      return this.$children;
    }
  },

  watch: {
    step () {
      this.updateSteps();
    }
  },

  mounted () {
    this.updateSteps();

    for (let i = 0; i < this.steps.length; i++)
      this.steps[i].number = i;
  },

  methods: {
    registerStep (callback) {
      this.steps.push(callback);

      return this.steps.length - 1;
    },

    changeStep (index) {
      this.$emit('update:step', index);
    },

    updateSteps () {
      for (let i = 0; i < this.steps.length; i++) {
        let state = 'none';

        if (i < this.step) state = 'done';
        if (i === this.step)
          state = 'current';

        this.steps[i].state = state;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .step-container {
    @include colors(--step-background-color);
    @include text-color(--step-color);
    @include flex(stretch);
  }
</style>
