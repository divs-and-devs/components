<template>
  <div class="select" :class="{ invalid }">
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      hidden
      :value="value"
      :required="required"
      @invalid="invalid = true"
    >
    <d-dropdown
      ref="dropdown"
      :disabled="disabled"
      :label="display"
      class="dropdown"
      offset="0"
      :align="align"
      sheet
      :class="[color, { keepSelected, selected: keys.includes(value) }]"
    >
      <ul role="listbox">
        <li v-if="label || placeholder && $device.isMobile" class="label">
          <strong>{{ label || placeholder }}</strong>
        </li>
        <li
          v-for="option in keys"
          :key="option"
          role="option"
          tabindex="0"
          :class="{ selected: value == option }"
          :aria-selected="value == option"
          @click="choose(option)"
          @keypress.enter.space.prevent="choose(option)"
        >
          <slot
            name="item"
            :value="getField(option)"
            :option="Array.isArray(options) ? option : options[option]"
            :options="options"
            :selected="value == option"
          >
            {{ getField(option) }}
          </slot>
        </li>
      </ul>
    </d-dropdown>
  </div>
</template>

<script>
import { get } from 'object-path';

export default {
  props: {
    value: {
      type: String,
      default: undefined
    },

    label: {
      type: String,
      default: undefined
    },

    field: {
      type: String,
      default: undefined
    },

    /**
     * @values colors
     */
    color: {
      type: String,
      default: 'primary'
    },

    keepSelected: {
      type: Boolean
    },

    placeholder: {
      type: String,
      default: ''
    },

    required: {
      type: Boolean,
      default: false
    },

    options: {
      type: [Array, Object],
      default: () => []
    },

    align: {
      type: String,
      validator: value =>
        [
          'auto',
          'top',
          'right',
          'bottom',
          'left',
          'top-start',
          'top-end',
          'right-start',
          'right-end',
          'bottom-start',
          'bottom-end',
          'left-start',
          'left-end'
        ].includes(value),
      default: 'bottom'
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      invalid: false
    };
  },

  computed: {
    keys () {
      if (Array.isArray(this.options)) return this.options;

      return Object.keys(this.options);
    },

    display () {
      if (this.value) return this.getField(this.value);

      return this.placeholder;
    }
  },

  methods: {
    click () {
      this.$refs.dropdown.click();
    },

    choose (value) {
      this.invalid = false;
      const backdrop = this.$el.querySelector('.backdrop');
      backdrop.click();

      if (value === this.value && !this.keepSelected) {
        this.$emit('input', undefined);
        return;
      }

      this.$emit('input', value);
    },

    getField (option) {
      const value = Array.isArray(this.options) ? option : this.options[option];

      if (!this.field) return value;

      return get(value, this.field);
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  margin: 1rem 0;

  label {
    font-family: $body-font, sans-serif;
    font-size: 0.8rem;
    display: block;
    margin: 0.5rem 0;
    transition: color 250ms ease;
  }

  .addon > & {
    margin: 0;
  }

  &.invalid > .dropdown::v-deep > button {
    border-color: $error;
  }

  .dropdown::v-deep {
    @include colors(--color);

    &:not(.selected) {
      --color: #{$shade-400};
    }

    > button {
      color: var(--color);

      &:not(:disabled):hover {
        border-color: $primary;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      color: $shade-800;
      padding: 1rem 1.25rem;
      white-space: nowrap;
      user-select: none;
      cursor: pointer;
      transition: background-color 100ms ease;

      &.label {
        pointer-events: none;
        padding: 1rem 1.25rem 0.5rem;
        font-size: 0.8rem;
        color: $shade-400;

        @include desktop {
          display: none;
        }
      }

      &:focus-visible,
      &:hover {
        background-color: $shade-100;
      }

      &.selected {
        color: var(--color);

        &:hover {
          background-color: $shade-100;
        }

        .keepSelected &:hover {
          background-color: transparent;
        }
      }

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
