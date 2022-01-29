<template>
  <div class="checkbox-group">
    <label v-if="label">{{ label }}</label>

    <d-checkbox
      v-for="(text, option) in options"
      :key="option"
      :name="text"
      :disabled="disabled"
      @input="$emit('input', $event)"
    >
      {{ text }}
    </d-checkbox>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: undefined
    },

    value: {
      type: Array,
      default: () => []
    },

    options: {
      type: Object,
      default: () => ({})
    },

    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-group {
  margin: 1rem 0;

  label {
    font-family: $body-font, sans-serif;
    font-size: 0.8rem;
    display: block;
    margin: 0.5rem 0;
    transition: color 250ms ease;
  }
}
</style>
