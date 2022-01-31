<template>
  <div class="panel-layout" :class="{ open, overlay, container }">
    <main>
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
      default: false
    },

    overlay: {
      type: Boolean,
      default: false
    },

    container: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
  .panel-layout {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 0;
    gap: 5vw;
    overflow-x: hidden;
    transition: grid-template-columns 250ms ease;

    &.open {
      grid-template-columns: 1fr 35vw;
    }

    @include tablet {
      &.open {
        grid-template-columns: 1fr 50vw;
      }
    }

    @include mobile {
      &.open {
        grid-template-columns: 0 1fr;
      }
    }

    &.overlay {
      grid-template-columns: 1fr;
      position: relative;
      contain: strict;

      &.open > main {
        background: $background;
        filter: brightness(75%);
        pointer-events: none;
      }

      .panel {
        position: absolute;
        right: -100%;
        top: 0;
        bottom: 0;
        width: 35vw;
        box-shadow: $shadow;
        transition: right 250ms ease-out;

        @include mobile {
          width: 100vw;
        }
      }

      &.open > .panel {
        right: 0;
        transition: right 250ms ease-in;
      }
    }

    &.container > main {
      padding: 1.5rem var(--container-padding);
      padding-right: 2.5rem;
    }

    main {
      box-sizing: border-box;
      filter: brightness(100%);
      transition: filter 500ms ease-in-out;
    }

    .panel {
      background-color: $background;
      border-left: 1px solid $shade-300;
      padding: 2rem;
      box-sizing: border-box;
      width: 30vw;
      overflow-y: auto;
      overflow-x: clip;
      position: relative;
      scrollbar-gutter: stable;

      ::v-deep hr {
        margin: 1.5rem -2rem;
        width: calc(100% + 4rem);
      }
    }
  }
</style>
