<template>
  <div class="multi-select" @click.stop>
    <d-textbox
      ref="textbox"
      v-model="searchValue"
      :label="label"
      :placeholder="placeholder"
      :disabled="disabled"
      :icon="icon"
      :icon-type="iconType"
      @enter="chooseValue"
      @click="openDropdown"
      @blur="chooseValue(searchValue)"
    >
      <d-button
        type="secondary"
        icon="plus"
        :icon-size="1.2"
        :disabled="disabled"
        tabindex="-1"
        @click="chooseValue(searchValue)"
      />
    </d-textbox>
    <transition-group name="fade">
      <d-tag
        v-for="tag in internalValue"
        :key="tag"
        short
        compact
        removable
        @click="removeTag(tag)"
      >
        {{ tag[field] || tag }}
      </d-tag>
    </transition-group>
    <transition name="fade">
      <div v-if="dropdown && !disabled" class="dropdown">
        <p v-if="loading">
          Aan het laden
        </p>
        <ul>
          <li v-for="item in results" :key="item[field]">
            <d-checkbox
              :value="internalValue.some((x) => item[field] == x[field])"
              type="purple"
              @input="toggleValue(item, $event)"
            >
              <slot name="item" :item="item">
                {{ item[field] }}
              </slot>
            </d-checkbox>
          </li>
        </ul>
        <div class="button-bar">
          <d-button type="tertiary" icon="close" @click="deselectAll">
            Wissen
          </d-button>
          <d-button type="secondary" icon="check" @click="dropdown = false">
            Toepassen
          </d-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    },

    label: {
      type: String,
      default: '',
      required: false
    },

    placeholder: {
      type: String,
      default: '',
      required: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    },

    autoComplete: {
      type: Object,
      default: undefined,
      required: false
    },

    autoCompleteUrl: {
      type: String,
      default: '',
      required: false
    },

    autoCompleteTimeout: {
      type: Number,
      default: 500
    },

    minContent: {
      type: Number,
      default: 0
    },

    field: {
      type: String,
      default: 'name',
      required: false
    },

    /**
     * @values icons
     */
    icon: {
      type: String,
      default: undefined
    },

    iconType: {
      type: String,
      default: 'left'
    },

    split: {
      type: String,
      default: ', '
    }
  },

  data () {
    return {
      searchValue: '',
      internalValue: this.value,
      results: [],
      cooldownTimer: undefined,
      loading: false,
      dropdown: false
    };
  },

  watch: {
    searchValue () {
      this.loading = false;
      this.openDropdown();
    },

    value (val) {
      this.internalValue = val;
    },

    internalValue (val) {
      this.$emit('input', val);
    }
  },

  mounted () {
    window.addEventListener('click', () => (this.dropdown = false));

    if (this.required && this.internalValue.length === 0)
      this.$refs.textbox.invalid = 'Add at least one value.';
  },

  methods: {
    focus () {
      if (!this.$refs.textbox) this.$el.querySelector('input').focus();
      else this.$refs.textbox?.focus();
    },

    blur () {
      if (!this.$refs.textbox) this.$el.querySelector('input').blur();
      else this.$refs.textbox?.blur();
    },

    selectAll () {
      this.internalValue.push(
        ...this.results.filter(
          x =>
            !this.internalValue.some(y => y[this.field] === x[this.field])
        )
      );

      this.$emit('input', this.internalValue);
    },

    deselectAll () {
      this.internalValue = this.internalValue.filter(
        x => !this.internalValue.some(y => y[this.field] === x[this.field])
      );

      this.$emit('input', this.internalValue);
      this.dropdown = false;
      this.blur();
    },

    openDropdown () {
      if (!this.autoCompleteUrl && !this.autoComplete) return;

      if (this.searchValue.length < this.minContent) return;

      if (this.cooldownTimer) clearTimeout(this.cooldownTimer);
      this.cooldownTimer = setTimeout(this.search, this.autoCompleteTimeout);
    },

    toggleValue (value, toggle) {
      const foundValue = this.internalValue.indexOf(value);
      if (toggle && foundValue < 0) {
        this.internalValue.push(value);
        this.$emit('input', this.internalValue);
      } else if (!toggle && foundValue >= 0) {
        this.internalValue.splice(foundValue, 1);
        this.$emit('input', this.internalValue);
      }
    },

    chooseValue (value) {
      if (this.dropdown) this.$refs.textbox.focus();

      if (!value) return;

      if (!this.autoCompleteUrl && !this.autoComplete) {
        if (this.internalValue.includes(value)) return;

        const set = new Set([
          ...this.internalValue,
          ...value
            .split(new RegExp(`[${this.split}]`, 'g'))
            .map(x => this.cleanWord(x))
            .filter(x => !!x)
        ]);

        this.internalValue = [...set];
        this.$emit('input', this.internalValue);
        this.searchValue = '';
        return;
      }

      if (!this.results) return;

      const foundValue = this.results.findIndex(x => x[this.field] === value);
      const foundDuplicates = this.internalValue.findIndex(
        x => x[this.field] === value
      );

      if (foundValue >= 0 && foundDuplicates < 0) {
        this.internalValue.push(this.results[foundValue][this.field]);
        this.$emit('input', this.internalValue);
      } else if (foundDuplicates >= 0) {
        this.internalValue.splice(foundDuplicates, 1);
        this.$emit('input', this.internalValue);
      } else return;

      this.searchValue = '';
    },

    removeTag (value) {
      const index = this.internalValue.indexOf(value);
      if (index >= 0) this.internalValue.splice(index, 1);

      if (this.required && this.internalValue.length === 0)
        this.$refs.textbox.invalid = 'Add at least one value.';
    },

    cleanWord (value) {
      return value
        .replace(/^[",'\- ]/g, '')
        .replace(/[",'\- ]$/g, '')
        .toLowerCase();
    },

    async search () {
      this.loading = true;
      this.dropdown = true;
      if (this.searchValue.length < this.minContent) {
        this.results = [];
        this.loading = false;

        return;
      }

      if (this.autoComplete) {
        this.results = Object.entries(this.autoComplete)
          .filter(([_, value]) =>
            value.toLowerCase().includes(this.searchValue.toLowerCase())
          )
          .map(([key, value]) => ({ name: value, id: key }));

        this.loading = false;
        return;
      }

      const params = new URLSearchParams();

      params[this.field] = this.searchValue;

      try {
        const body = await fetch(
          this.autoCompleteUrl
            .replace('{q}', this.searchValue)
            .replace('{field}', this.field)
        );
        const data = await body.json();

        if (typeof data !== 'object')
          throw new Error('Data is not an array or object.');
        else if (Array.isArray(data)) this.results = data;
        else if (Array.isArray(data.items)) this.results = data.items;
        else if (Array.isArray(data.entries)) this.results = data.entries;
        else if (Array.isArray(data.data)) this.results = data.data;
        else if (Array.isArray(data.data.items)) this.results = data.data.items;
      } catch {}

      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.multi-select {
  position: relative;

  .dropdown {
    display: flex;
    position: absolute;
    top: 4.5rem;
    width: 100%;
    background-color: $light;
    box-shadow: $shadow;
    border: 1px solid $shade-200;
    border-radius: $border-radius;
    z-index: 20;
    max-width: 100vw;
    flex-direction: column;
    overflow: hidden;

    .button-bar {
      @include flex(space-between);

      border-top: 1px solid $shade-200;
      background-color: $light;
      padding: 0.5rem;

      > button {
        padding: 0.75rem 1rem;
      }

      @include mobile {
        display: none;
      }
    }

    > p {
      line-height: 20rem;
      vertical-align: middle;
      text-align: center;
      color: $shade-500;

      &::after {
        animation: dots 1s linear infinite;
        content: ".";
        width: 0;
        position: absolute;
      }

      @keyframes dots {
        0% {
          content: "";
        }

        25% {
          content: ".";
        }

        50% {
          content: "..";
        }

        75% {
          content: "...";
        }
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      padding-left: 0;
      list-style: none;
      overflow-y: auto;
      max-height: 24rem;
    }

    li {
      padding: 0.25rem;
      border-bottom: 1px solid $shade-200;
      cursor: pointer;

      &:focus-visible {
        background-color: $shade-100;
      }
    }
  }
}

@include mobile {
  .tag {
    display: block;
  }
}
</style>
