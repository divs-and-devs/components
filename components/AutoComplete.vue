<template>
  <div class="auto-complete" :class="{ selected: !!value }">
    <d-textbox
      v-bind="$attrs"
      ref="input"
      v-model="searchValue"
      autocomplete="off"
      :required="required"
      @enter="show && choose(list[0])"
    >
      <d-spinner v-if="loading" class="loader" />
      <d-button
        v-if="show"
        v-keybind.esc
        type="secondary"
        tabindex="-1"
        icon="close"
        @click="show = false"
      />
    </d-textbox>
    <transition name="fade">
      <transition-group v-if="show" tag="ul" class="dropdown" :class="position">
        <li
          v-if="cappedList === 0 && !createNew"
          key="empty"
          class="empty"
          tabindex="-1"
        >
          <slot name="emtpy">
            Geen resultaten.
          </slot>
        </li>
        <li
          v-for="option in cappedList"
          :key="getField(option)"
          tabindex="0"
          :class="{ selected: getField(value) === getField(option) }"
          @click="choose(option)"
          @keypress.enter.space.prevent="choose(option)"
        >
          <slot :item="option">
            {{ getField(option) }}
          </slot>
        </li>
        <li
          v-if="
            createNew &&
              !!searchValue &&
              searchValue.length >= threshold &&
              !cappedList.some(
                (x) => getField(x).toLowerCase() === searchValue.toLowerCase()
              )
          "
          key="create-new"
          tabindex="0"
          class="create-new"
          @click="createNewItem"
          @keypress.enter.space.prevent="createNewItem"
        >
          <altura-icon name="plus" /> Creëer: <em>“{{ searchValue }}”</em>
        </li>
      </transition-group>
    </transition>
  </div>
</template>

<script>
import { get, set } from 'object-path';
import debounce from '../helpers/Debounce';

export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Object],
      required: true
    },

    position: {
      type: String,
      validator: value => ['top', 'bottom', 'left', 'right'].includes(value),
      default: 'bottom'
    },

    required: {
      type: Boolean,
      default: false
    },

    url: {
      type: String,
      required: false,
      default: undefined
    },

    datasource: {
      type: [Object, Array],
      required: false,
      default: undefined
    },

    fetch: {
      type: Function,
      required: false,
      default: undefined
    },

    field: {
      type: String,
      default: 'name'
    },

    maxResults: {
      type: Number,
      default: 10
    },

    debounce: {
      type: Number,
      default: 50
    },

    threshold: {
      type: Number,
      default: 3
    },

    createNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      debouncer: undefined,
      searchValue: this.getField(this.value),
      show: false,
      list: [],
      loading: false
    };
  },
  computed: {
    cappedList () {
      return this.list.slice(0, this.maxResults);
    }
  },
  watch: {
    required () {
      if (this.value === undefined && this.required)
        this.$refs.input.invalid =
          'Selecteer een waarde uit de voorgestelde lijst.';
      else if (this.value === undefined && this.searchValue === '')
        this.$refs.input.invalid = '';
    },

    value () {
      if (this.value === undefined && this.required)
        this.$refs.input.invalid =
          'Selecteer een waarde uit de voorgestelde lijst.';
      else if (this.value !== undefined) {
        this.$refs.input.invalid = '';
        this.searchValue = this.getField(this.value);
      }
    },

    searchValue () {
      if (this.getField(this.value) === this.searchValue) return;
      this.$refs.input.invalid =
        'Selecteer een waarde uit de voorgestelde lijst.';

      if (this.value && this.getField(this.value) !== this.searchValue)
        this.unselect();

      if (this.searchValue.length < this.threshold) return;

      this.debouncer = this.debouncer ?? debounce(this.search, this.debounce);

      this.debouncer();
    }
  },
  mounted () {
    window.addEventListener('click', () => (this.show = false));
  },
  destroyed () {
    window.removeEventListener('click', () => (this.show = false));
  },
  methods: {
    unselect () {
      if (this.required)
        this.$refs.input.invalid =
          'Selecteer een waarde uit de voorgestelde lijst.';

      this.choose(undefined);
    },

    createNewItem () {
      const current = {};
      set(current, this.field, this.searchValue);
      this.$refs.input.invalid = '';

      this.$emit('create', current);
      this.show = false;
    },

    choose (option) {
      this.$emit('input', option);

      if (option !== undefined && this.getField(option)) {
        this.searchValue = this.getField(option);
        this.$refs.input.invalid = '';
      }

      this.show = false;
    },

    async search () {
      this.loading = true;
      if (this.fetch) this.list = await this.fetch(this.searchValue);
      else if (this.datasource)
        this.list = this.datasource.filter(x =>
          this.getField(x)
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
        );
      else if (this.url) {
        const data = await this.$axios.$get(
          this.url.replaceAll('{q}', this.searchValue)
        );

        if (typeof data !== 'object')
          throw new Error('Data is not an array or object.');
        else if (Array.isArray(data)) this.list = data;
        else if (Array.isArray(data.items)) this.list = data.items;
        else if (Array.isArray(data.entries)) this.list = data.entries;
        else if (Array.isArray(data.data)) this.list = data.data;
        else if (Array.isArray(data.data.items)) this.list = data.data.items;
        else throw new Error('Data is not an array or object.');
      } else {
        this.loading = false;
        this.$refs.input.invalid =
          'Dit auto-complete veld heeft geen datasource.';

        throw new Error(
          'You need to define a fetch function, a data object or a url on this autocomplete'
        );
      }

      this.show = true;
      this.loading = false;
    },

    getField (item) {
      if (typeof item !== 'object') return item;

      return get(item, this.field);
    }
  }
};
</script>

<style lang="scss" scoped>
.auto-complete {
  position: relative;

  .loader {
    margin: 0.35rem 0.25rem;
    line-height: 100%;
    vertical-align: middle;
  }

  .dropdown {
    position: absolute;
    background-color: $shade-100;
    border: 1px solid $shade-300;
    min-width: 100%;
    width: min-content;
    min-height: 1rem;
    max-height: 20rem;
    overflow-y: auto;
    overscroll-behavior: contain;
    box-shadow: $shadow;
    border-radius: $border-radius;
    z-index: 50;
    box-sizing: border-box;
    padding: 0;

    &.bottom {
      top: calc(100% + 0.5rem);
      left: 50%;
      transform: translate(-50%);
    }

    &.top {
      bottom: calc(100% + 0.5rem);
      left: 50%;
      transform: translate(-50%);
    }

    &.left {
      right: calc(100% + 0.5rem);
      top: 50%;
      transform: translate(0, -50%);
    }

    &.right {
      left: calc(100% + 0.5rem);
      top: 50%;
      transform: translate(0, -50%);
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      color: $shade-700;
      padding: 1rem 1.25rem;
      white-space: nowrap;
      user-select: none;
      cursor: pointer;

      &.empty {
        cursor: default;
        font-style: italic;
      }

      &.create-new {
        color: $primary;

        em {
          font-style: normal;
          color: $shade-500;
        }
      }

      &:focus-visible,
      &:not(.empty):hover {
        background-color: $shade-200;
      }

      &.selected {
        color: $primary;
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
