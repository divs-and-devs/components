<template>
  <d-dropdown
    class="overflow-menu"
    :align="align"
    :open.sync="show"
  >
    <template #button="{ toggle }">
      <d-button
        type="tertiary"
        :icon="icon"
        icon-size="1.2"
        @keydown="selectFirst"
        @click.stop="toggle"
        @focus.self="toggle(true)"
      />
    </template>

    <template #default>
      <ul class="items" @mousedown.stop>
        <slot />
      </ul>
    </template>
  </d-dropdown>
</template>

<script>
export default {
  provide () {
    return {
      inMenu: true,
      direction: 'block',
      close: this.close
    };
  },
  props: {
    icon: {
      type: String,
      default: 'more-horizontal'
    },

    align: {
      type: String,
      default: 'bottom'
    }
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
  },

  methods: {
    close () {
      this.show = false;
    },

    focus () {
      this.show = true;
      this.selectFirst();
    },

    async selectFirst () {
      await new Promise(resolve => setTimeout(resolve, 150));

      this.$el.querySelector('.action')?.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.items::v-deep {
  li:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  li:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  &::v-deep .tooltip {
    padding: 0;
    pointer-events: all;
    overflow: clip;
  }
}
</style>
