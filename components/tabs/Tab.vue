<template>
  <portal :key="index" ref="tab" :to="portal" class="tab">
    <slot />
  </portal>
</template>

<script>
export default {
  name: 'Tab',

  inject: ['transition', 'selectTab', 'id'],

  props: {
    name: {
      type: String,
      required: true
    },

    selected: {
      type: Boolean
    },

    count: {
      type: Number,
      default: undefined
    },

    hidden: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return { show: this.selected };
  },

  computed: {
    portal () {
      return `${this.id}_tab_${this.index}`;
    },

    index () {
      return this.$parent.tabs.findIndex(x => this.name === x.name);
    }
  },

  watch: {
    show (value) {
      this.$emit('update:selected', value);

      if (value) this.$emit('show');
      else this.$emit('hide');
    },

    hidden () {
      this.$parent.updateHidden(this.index, this.hidden);
    }
  },

  methods: {
    focus () {
      this.selectTab(this.index);
    }
  }
};
</script>
