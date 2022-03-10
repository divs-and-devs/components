<template>
  <div class="panel-layout" :class="[{ open, overlay, container }, align]">
    <main @click="$emit('update:open', false)">
      <slot />
    </main>
    <div key="panel" class="panel">
      <slot name="panel" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true
    },

    overlay: {
      type: Boolean,
      default: false
    },

    container: {
      type: Boolean,
      default: false
    },

    /**
     * @values right, left
     */
    align: {
      type: String,
      default: 'right',
      validator: value => ['right', 'left'].includes(value)
    }
  }
};
</script>

<style lang="scss" scoped>
  .panel-layout {
    --panel-width: 0;

    display: grid;
    height: 100%;
    overflow-x: hidden;
    transition: grid-template-columns 250ms ease, gap 250ms ease;

    &.left {
      grid-template-columns: var(--panel-width) 1fr;

      .panel {
        border-right: 1px solid $shade-300;
        order: -1;
      }

      &.container > main {
        padding: 1.5rem var(--container-padding);
        padding-left: 2.5rem;
      }
    }

    &.right {
      grid-template-columns: 1fr var(--panel-width);

      .panel {
        border-left: 1px solid $shade-300;
      }

      &.container > main {
        padding: 1.5rem var(--container-padding);
        padding-right: 2.5rem;
      }
    }

    &.open {
      gap: 5vw;
      --panel-width: 30vw;

      .panel {
        padding: 2rem;
      }
    }

    @include tablet {
      &.open {
        --panel-width: 50vw;
      }
    }

    @include mobile {
      &.open {
        --panel-width: 1fr;
      }
    }

    &.overlay {
      grid-template-columns: 1fr;
      position: relative;
      contain: strict;
      transform: translateZ(0);

      &.open > main {
        background: $background;
        filter: brightness(75%);
        user-select: none;
      }

      &.right .panel {
        right: 0;
        transform: translateX(100%);
        transition: transform 250ms ease-out;
      }

      &.left .panel {
        left: 0;
        transform: translateX(-100%);
        transition: transform 250ms ease-out;
      }

      .panel {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 35vw;
        box-shadow: $shadow;

        @include mobile {
          width: 100vw;
        }
      }

      &.open > .panel {
        transform: translateX(0);
        transition: transform 250ms ease-in;
      }
    }

    main {
      box-sizing: border-box;
      filter: brightness(100%);
      transition: filter 500ms ease-in-out;
    }

    .panel {
      background-color: $background;
      padding: 2rem 0;
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: clip;
      position: relative;
      scrollbar-gutter: stable;
      transition: padding 250ms ease;

      ::v-deep hr {
        margin: 1.5rem -2rem;
        width: calc(100% + 4rem);
      }
    }
  }
</style>
