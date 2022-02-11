<template>
  <div class="tabs">
    <div
      name="fade"
      :class="[
        {
          'tab-container': true,
          'is-container': isContainer,
          'no-content': noContent,
        }
      ]"
    >
      <button
        v-for="(tab) in tabs.filter((x) => !x.hidden)"
        :key="tab.index"
        :class="{ selected: tab.index == selectedIndex }"
        tabindex="0"
        @keydown.space="select(tab.index)"
        @click="select(tab.index)"
      >
        {{ tab.name }}
        <span v-if="tab.count != undefined" class="count">{{ tab.count }}</span>
      </button>
      <div class="spacer" />
      <div class="actions">
        <slot name="actions" />
      </div>
    </div>
    <slot />
    <div v-if="!noContent" class="content" :class="[background, { screen }]">
      <transition :name="internalTransition" mode="out-in">
        <portal-target
          :key="selectedIndex"
          :class="classes"
          class="tab"
          :name="`${uniqueID}_tab_${selectedIndex}`"
        />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabContainer',

  provide () {
    return {
      selectTab: this.select,
      transition: this.transition,
      id: this.uniqueID
    };
  },

  props: {
    isContainer: {
      type: Boolean,
      default: false
    },

    noContent: {
      type: Boolean,
      default: false
    },

    screen: {
      type: Boolean,
      default: false
    },

    background: {
      type: String,
      default: ''
    },

    transition: {
      type: String,
      default: 'slide-horizontal'
    },

    selected: {
      type: String,
      required: false,
      default: undefined
    }
  },

  data () {
    return {
      selectedIndex: 0,
      internalTransition: this.transition,
      uniqueID: encodeURIComponent(Math.random()).substring(2),
      tabs: []
    };
  },

  computed: {
    classes () {
      if (this.tabs[this.selectedIndex])
        return this.tabs[this.selectedIndex].classes;

      return [];
    }
  },

  mounted () {
    this.select(this.selectedIndex);
    this.$watch('$children', () => this.updateTabs());
    this.updateTabs();
    this.updateHidden(this.selectedIndex, this.tabs[0].hidden);
  },

  methods: {
    updateHidden (index, value) {
      if (value && this.selectedIndex === index)
        this.select(this.tabs.findIndex(x => !x.hidden));
    },

    updateTabs () {
      this.tabs = this.$children.filter(x => x.$vnode.tag.toLowerCase().includes('tab'));
    },

    select (id) {
      if (this.transition === 'slide-horizontal' || this.transition === 'slide-horizontal-reverse')
        this.internalTransition = (this.selectedIndex - id < 0) ? 'slide-horizontal-reverse' : 'slide-horizontal';

      this.selectedIndex = id;

      for (let i = 0; i < this.tabs.length; i++) {
        this.tabs[i].show = this.selectedIndex === i;

        if (this.selectedIndex === i)
          this.$emit('update:selected', this.tabs[i].name);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-container {
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  max-width: 100vw;
  overflow-x: auto;
  padding: 4px;
  border-bottom: 1px solid $shade-300;
  padding-bottom: 0;
  scrollbar-width: thin;
  scrollbar-color: $background $shade-200;

  .actions {
    align-self: stretch;
    padding-bottom: 0.25rem;

    > * {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &.no-content {
    margin-bottom: 0;
  }

  &::-webkit-scrollbar {
    background: $background;
  }

  &.is-container {
    padding: 0 var(--container-padding);

    + .content {
      padding: 1rem var(--container-padding);
    }
  }

  .spacer {
    flex: 1;
  }

  > button {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    line-height: 1.5rem;
    color: $shade-400;
    border-bottom: 2px solid transparent;
    font-family: $body-font;
    font-size: 1rem;
    padding: 0.5rem 0.75rem 0.5rem 1rem;
    margin: 0 0.25rem;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: all 500ms ease;
    vertical-align: middle;

    &:focus-visible {
      background-color: $shade-200;
      outline: none;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom-color: $shade-300;
    }

    &.selected {
      color: $primary;
      border-bottom: 2px solid $primary;
    }

    .count {
      display: inline-block;
      background-color: $primary-fade;
      color: $primary-fade-text;
      border-radius: 100px;
      min-width: 1.5rem;
      text-align: center;
      vertical-align: middle;
      padding: 0.25rem;
      line-height: 1rem;
    }
  }
}

.content {
  box-sizing: content-box;
  position: relative;
  padding: 1rem;
  padding-top: 2rem;
  overflow-x: clip;

  @include colors;
  @include text-color;

  &.screen {
    min-height: calc(100vh - 2.1875rem);
  }
}
</style>
