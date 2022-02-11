<template>
  <transition name="fade-up" appear @leave="remove">
    <div v-if="internalShow" class="banner" :class="[color, type]">
      <d-icon v-if="icon" :name="icon" size="1.2" />
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
      validator: value => ['bar', 'fixed', 'inline', 'float'].includes(value),
      default: 'bar'
    },

    /**
     * @values colors
     */
    color: {
      type: String,
      default: 'primary'
    },

    /**
     * @values icons
     */
    icon: {
      type: String,
      default: undefined
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

    @include flex(space-between);
    @include colors;
    @include text-color;

    --height: -100%;

    &.float,
    &.inline {
      text-align: left;
      border-radius: $border-radius;
    }

    &.float {
      position: fixed;
      box-shadow: $shadow;
      bottom: calc(1rem + var(--screen-padding-bottom, 0px));
      left: 1rem;
      right: 1rem;
    }

    &.inline {
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

    > .content {
      flex: 1;
    }

    > .icon {
      margin-right: 1rem;
    }

    ::v-deep a {
      margin-left: 1rem;
      text-decoration: underline;
      font-weight: 700;
      color: inherit;
    }

    > button.tertiary {
      color: inherit;
      margin: 0 !important;
      padding: 0 !important;
      order: 99;
    }
  }
</style>
