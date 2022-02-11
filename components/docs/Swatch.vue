<template>
  <div v-tooltip="shadow ? shadow : color" class="color-swatch" :class="[color, shadow]" @click="copy">
    •
  </div>
</template>

<script>
export default {
  props: {
    /**
     * @values colors
     */
    color: {
      type: String,
      default: 'primary-text'
    },

    shadow: {
      type: String,
      default: undefined
    }
  },

  methods: {
    copy () {
      if (!this.shadow) {
        navigator.clipboard.writeText('$' + this.color);
        this.$toast({ title: 'Copied color.', subtitle: `Color ${this.color} was copied to the clipboard.`, icon: 'clipboard' });
        return;
      }
      navigator.clipboard.writeText('$' + this.shadow);
      this.$toast({ title: 'Copied shadow.', subtitle: `shadow ${this.color} was copied to the clipboard.`, icon: 'clipboard' });
    }
  }
};
</script>

<style lang="scss" scoped>
.color-swatch {
  display: inline-block;
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
  margin: 1rem;
  box-shadow: $shadow-small;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  user-select: none;
  cursor: default;

  @include colors;
  @include text-color;

  &.drop-shadow {
    box-shadow: $shadow;
  }

  &.drop-shadow-small {
    box-shadow: $shadow-small;
  }
}
</style>
