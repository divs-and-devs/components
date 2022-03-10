<template>
  <li class="menu-item seperator" :class="dir" />
</template>
<script>
export default {
  inject: ['direction'],
  data () {
    return {
      dir: this.direction
    };
  }
};
</script>
<style lang="scss" scoped>
  li {
    &.block {
      height: 1px;
      background-color: $shade-300;
      margin: 0.5rem 1rem;
    }

    &.inline {
      width: 1px !important;
      height: 1.6rem;
      background-color: $shade-300;
      margin: 0.5rem 1rem;
    }
  }
</style>
