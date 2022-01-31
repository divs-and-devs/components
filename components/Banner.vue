<template>
  <transition name="fade-up" appear @leave="remove">
    <div v-if="internalShow" class="banner" :class="[color, type]">
      <d-button type="tertiary" icon="x" @click="close" />
      <div class="content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      validator: value => ['bar', 'fixed', 'inline'].includes(value),
      default: 'bar'
    },

    color: {
      type: String,
      default: 'primary'
    },

    show: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      internalShow: this.show
    };
  },

  watch: {
    show () {
      this.internalShow = this.show;
    }
  },

  methods: {
    remove () {
      if (!('close' in this.$listeners || 'update:show' in this.$listeners || this.show !== undefined)) {
        this.$destroy();
        this.$el.remove();
      }
    },

    close () {
      this.$emit('close');
      this.$emit('update:show', false);
      this.internalShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
  .banner {
    padding: 1rem;

    @include colors();
    @include text-color;

    --height: -100%;

    &.inline {
      text-align: left;
      border-radius: $border-radius;
      margin-bottom: 2.5rem;
    }

    &.bar {
      text-align: center;
    }

    &.fixed {
      text-align: center;
      position: fixed;
      top: var(--navbar-height, 4.5rem);
      left: 0;
      right: 0;
    }

    ::v-deep a {
      margin-left: 1rem;
      text-decoration: underline;
      font-weight: 700;
      color: inherit;
    }

    > button.tertiary {
      color: inherit;
      float: right;
      margin: 0 !important;
      padding: 0 !important;
    }
  }
</style>
