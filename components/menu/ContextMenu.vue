<template>
  <d-tooltip
    ref="menu"
    align="manual"
    class="contextmenu"
    :show="show"
    @mousedown.stop
  >
    <ul class="items">
      <slot />
    </ul>
  </d-tooltip>
</template>

<script>
import clamp from '@/helpers/Clamp.js';

export default {
  provide () {
    return {
      inMenu: true,
      direction: 'block',
      close: this.close
    };
  },

  data () {
    return {
      show: false
    };
  },

  mounted () {
    window.addEventListener('mousedown', () => {
      this.show = false;
    });

    this.addEvents();
  },

  methods: {
    close () {
      this.show = false;
    },
    addEvents () {
      this.$el.parentElement.addEventListener('contextmenu', async (e) => {
        e.preventDefault();

        this.show = true;
        await this.$nextTick();
        const x = clamp(
          e.clientX,
          8,
          window.innerWidth - this.$el.clientWidth - 8
        );
        const y = clamp(
          e.clientY,
          8,
          window.innerHeight - this.$el.clientHeight - 8
        );
        if (this.$refs.menu) this.$refs.menu.alignBubble(x, y);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip {
  padding: 0;
  pointer-events: all;
  overflow: clip;
  box-shadow: $shadow-small;
  --background: #{$light};

  .dark & {
    --background: #{$dark};
  }

  ::v-deep .tooltip {
    padding: 0;
    pointer-events: all;
    overflow: clip;
    box-shadow: $shadow-small;
  }
}
</style>
