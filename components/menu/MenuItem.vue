<template>
  <li
    class="menu-item"
    :class="[type, { disabled }]"
    tabindex="0"
    @click="clickhandler"
    @keydown.space.enter.self="click"
    @keydown.left="toggleSubmenu(false, $event)"
    @keydown.right.self.stop="toggleSubmenu"
    @keydown.down.self.prevent="selectNext"
    @keydown.up.self.prevent="selectPrevious"
  >
    <d-checkbox
      v-if="type === 'checkbox'"
      ref="checkbox"
      :value="value"
      :disabled="disabled"
      :name="name"
      @input="$emit('input', $event)"
    />
    <d-icon v-if="icon" :name="icon" />

    <span>{{ label }}</span>

    <d-icon v-if="hasSubmenu" name="chevron-right" class="submenu-icon" />

    <d-tooltip
      v-if="hasSubmenu"
      ref="submenu"
      delay="150"
      :align="submenuAlign"
      offset="0"
      class="submenu"
    >
      <ul class="items">
        <slot />
      </ul>
    </d-tooltip>
  </li>
</template>

<script>
export default {
  inject: ['inMenu', 'direction', 'close'],

  provide () {
    return {
      direction: 'block'
    };
  },

  props: {
    value: {
      type: [Boolean, Array],
      default: false
    },

    name: {
      type: null,
      default: undefined
    },

    disabled: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      required: false,
      default: undefined
    },

    type: {
      type: String,
      validator: value => ['checkbox', 'normal', 'delete'].includes(value),
      default: 'normal'
    },

    label: {
      type: String,
      default: 'Action'
    }
  },

  computed: {
    hasSubmenu () {
      return !!this.$slots.default;
    },

    submenuAlign () {
      if (this.direction === 'block')
        return 'right-start';

      return 'bottom-start';
    }
  },

  mounted () {
    if (this.hasSubmenu && 'click' in this.$listeners)
      throw new Error(
        "An menu-item with a submenu can't handle click events for usability reasons."
      );
  },

  methods: {
    click (event) {
      if (this.disabled) return;

      this.$emit('click', event);
      this.close();
    },

    clickhandler (event) {
      if (this.disabled) return;

      if (this.hasSubmenu)
        event.stopImmediatePropagation();

      else if (this.type === 'checkbox')
        this.$refs.checkbox.click();

      else
        this.click(event);
    },

    selectNext () {
      this.$el?.nextElementSibling?.focus();
    },

    selectPrevious () {
      if (this.$el.previousElementSibling)
        this.$el?.previousElementSibling?.focus();
      else this.closeMenu();
    },

    async toggleSubmenu (value, event) {
      if (!this.$refs.submenu) return;

      this.$refs.submenu.internalShow =
        value ?? !this.$refs.submenu.internalShow;

      if (!this.$refs.submenu.internalShow) {
        event.stopPropagation();
        this.$el.focus();
      } else {
        await this.$nextTick();

        this.$refs.submenu.$el.querySelector('.action')?.focus();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.submenu {
  overflow: clip;
  pointer-events: all;
  padding: 0;
  min-width: max-content;
}

li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 100ms ease, color 100ms ease;
  min-width: 150px;
  line-height: 160%;
  white-space: nowrap;
  user-select: none;
  width: 100%;
  box-sizing: border-box;

  &:hover,
  &:focus-visible {
    background-color: $primary-fade;
    color: $primary-fade-text;
  }

  &.disabled {
    cursor: default;
    color: $shade-500;

    &:hover,
    &:focus-visible {
      background-color: transparent;
    }
  }

  &.delete {
    color: $error;

    &:hover,
    &:focus-visible {
      color: $error-text;
      background-color: $error-fade;
    }
  }

  .icon:first-child {
    margin-right: 0.5rem;
  }

  > .checkbox {
    margin: 0;
    margin-right: 0.5rem;
    padding: 0;
  }

  .submenu-icon {
    margin-left: auto;
  }

  span:first-child {
    margin-left: 1.75rem;
  }
}
</style>
