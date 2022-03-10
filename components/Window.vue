<template>
  <div class="backdrop" @mousedown.self="$emit('close')">
    <div
      class="window"
      :class="{ header: !!$slots.header || title, compact }"
      role="window"
      :aria-label="title"
    >
      <header>
        <slot name="header" :close="close">
          <h3>{{ title }}</h3>
          <d-button
            v-keybind.esc
            type="tertiary"
            icon="x"
            @click="$emit('close')"
          />
        </slot>
      </header>
      <main>
        <slot />
      </main>
      <footer v-if="$slots.footer">
        <slot name="footer" :close="close" />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined
    },

    compact: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close () {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: var(--navbar-height, 4.5rem);
  bottom: var(--screen-padding-bottom, 0);
  left: var(--screen-padding-left, 0);
  right: var(--screen-padding-right, 0);
  width: 100%;
  z-index: 10;
  overscroll-behavior: contain;

  @include flex;

  .window {
    background-color: $background;
    width: 75vw;
    min-height: 50vh;
    max-height: calc(100vh - 7.5rem);
    display: flex;
    flex-direction: column;
    border-radius: $border-radius;

    &.compact {
      width: min(500px, 100vw);
      height: auto;
      min-height: 200px;

      header,
      footer {
        padding: 0 1rem;
      }

      header {
        text-align: left;
        padding: 0.5rem 1rem;
      }
    }

    &:not(.compact) {
      @include mobile {
        width: 100vw;
        height: 100%;
        border-radius: 0;
      }
    }

    &.header > header {
      border-bottom: 1px solid $shade-200;
    }

    > header {
      display: flex;
      align-items: center;
      text-align: center;
      position: relative;
      padding: 1rem 1rem;
      box-sizing: border-box;

      h3 {
        flex: 1;
        margin: 0;
      }

      button {
        font-size: 1.5rem;
        line-height: 1rem;
        padding: 0;
        margin: 0;
      }
    }

    > main {
      max-height: calc(100vh - 12rem);
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    > footer {
      padding: 0 2rem;
      border-top: 1px solid $shade-200;

      @include flex(space-between);

      :last-child {
        margin-left: auto;
      }

      button {
        margin-block: 0.5rem;
      }
    }
  }
}
</style>
