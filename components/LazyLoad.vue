<!--
    Made by roy-ermers (https://github.com/Roy-Ermers)
-->
<template>
  <component :is="tag" ref="lazyload" class="lazyload" :class="{ screen }">
    <slot>
      <component
        :is="itemTag"
        v-for="item in value"
        :key="item[id]"
        class="item"
      >
        <slot name="item" :item="item" />
      </component>
      <template
        v-if="isDev && !$scopedSlots.item && (!value || value.length > 0)"
      >
        <h2>No slot used</h2>
        Use a slot in this lazy-load component.<br>
        <strong>Example:</strong>
        <pre>
        <code v-pre>
        &lt;lazy-load v-model="data"&gt;
          &lt;slot #item="{item}"&gt;
            {{ item.name }}
          &lt;/slot&gt;
        &lt;/lazy-load&gt;
        </code>
        </pre>
      </template>
    </slot>
  </component>
</template>

<script>
import debounce from '../helpers/Debounce.js';
import scrollParent from '../helpers/ScrollParent.js';

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    },

    tag: {
      type: String,
      default: 'div'
    },

    itemTag: {
      type: String,
      default: 'div'
    },

    id: {
      type: String,
      default: 'id'
    },

    threshold: {
      type: [String, Number],
      default: 200
    },

    screen: {
      type: Boolean,
      default: false
    },

    page: {
      type: Number,
      required: false,
      default: 0
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    element () {
      return scrollParent(this.$refs.lazyload);
    },

    isDev () {
      return process.env.NODE_ENV === 'development';
    }
  },
  mounted () {
    this.loadNext();

    if (!process.browser) return;

    if (!this.screen)
      this.element.addEventListener(
        'scroll',
        debounce(() => this.loadNext(), 100),
        {
          passive: true
        }
      );
    else
      window.addEventListener(
        'scroll',
        debounce(() => this.loadNext(), 100),
        {
          passive: true
        }
      );
  },

  methods: {
    loadNext () {
      if (this.disabled) return;

      if (
        !this.screen &&
        this.element.scrollHeight -
          this.element.scrollTop -
          this.element.clientHeight >
          this.threshold
      )
        return;

      if (
        this.screen &&
        window.innerHeight + window.scrollY + this.threshold <
          document.body.scrollHeight
      )
        return;

      this.$emit('update:page', this.page + 1);
      this.$emit('fetch', this.page);
    }
  }
};
</script>
<style lang="scss" scoped>
.lazyload.screen {
  display: contents;
}
</style>
