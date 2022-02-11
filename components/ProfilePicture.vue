<template>
  <object :data="url" type="image/png" :title="fullName" :style="{fontSize: size + 'rem'}">
    <svg
      v-if="fullName"
      viewBox="0 0 32 32"
      :fill="color"
      :title="fullName"
    >
      <circle cx="16" cy="16" r="16" />
      <text text-anchor="middle" x="16" y="22" font-size="0.9rem" fill="white">
        {{ letters }}
      </text>
    </svg>

    <d-icon v-else-if="icon" :name="icon" />
  </object>
</template>

<script>
import randomColor from '../helpers/RandomColor.js';

export default {
  props: {
    url: {
      type: String,
      default: undefined
    },

    /**
     * @values icons
     */
    icon: {
      type: String,
      default: 'user'
    },

    fullName: {
      type: String,
      default: ''
    },

    size: {
      type: [Number, String],
      default: '1'
    }
  },

  computed: {
    color () {
      return randomColor(this.fullName);
    },

    letters () {
      const words = this.fullName.trim().split(' ');
      if (words.length === 1 && words[0].length === 0)
        return '?';

      if (words.length === 1)
        return words[0][0].toUpperCase();

      return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
object {
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid $shade-200;
  background-color: $shade-200;
  color: $shade-500;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
  font-size: 2.5rem;
  width: 1em;
  height: 1em;
  user-select: none;
  -webkit-user-drag: none;

  >svg {
    font-size: 0.5em;
    transition: fill 250ms ease;
  }

  @include flex;
}
</style>
