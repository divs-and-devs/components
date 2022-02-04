<template>
  <div class="accordion-item" :class="{ open }">
    <header @click="toggleSection(key)">
      <p>{{ name }}</p>
      <slot name="actions" />
      <d-icon name="chevron-down" />
    </header>
    <div ref="content" class="content" :style="`--max-height: ${maxHeight}; --padding: ${verticalPadding}rem;`">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  inject: ['toggleSection', 'selectedSections'],
  props: {
    name: {
      type: String,
      required: true
    },

    id: {
      type: String,
      default: undefined
    },

    verticalPadding: {
      type: [String, Number],
      default: 1
    }
  },
  data () {
    return {
      maxHeight: 100,
      observer: undefined
    };
  },

  computed: {
    key () {
      return this.id ?? this.name;
    },

    open () {
      return this.selectedSections.includes(this.key);
    }
  },

  watch: {
    verticalPadding () {
      this.resize();
    }
  },

  mounted () {
    if (this.toggleSection === undefined || this.selectedSections === undefined)
      throw new Error('this accordion-item is not placed in an accordion.');

    if (process.client) {
      this.resize();
      this.observer = new MutationObserver(() => this.resize());

      this.observer.observe(this.$refs.content, {
        childList: true,
        subtree: true
      });
    }
  },
  methods: {
    resize () {
      if (!this.$refs.content) return;

      this.maxHeight =
        `calc(${this.$refs.content.scrollHeight}px + ${Number(this.verticalPadding)}rem)`;
    }
  }
};
</script>

<style lang="scss" scoped>
.accordion-item {
  .icon {
    transition: transform 200ms ease;
  }

  header {
    @include flex;
    gap: 1rem;
    padding: 1rem 0;
    cursor: pointer;
    user-select: none;
    transition: color 200ms ease;

    p {
      flex: 1;
    }
  }

  .content {
    overflow: hidden;
    border-color: $shade-300;
    --container-padding: 1rem;

    max-height: 0;
    transition: max-height 200ms ease, padding 200ms ease, border 200ms ease;
  }

  &.open {

    header {
      color: $primary;
    }

    .icon {
      transform: rotate(180deg);
    }

    .content {
      padding: var(--padding, 0.5rem) 0;
      max-height: var(--max-height);
      animation: 200ms content-overflow step-end forwards;
      border-block: 1px solid $shade-300;

      @keyframes content-overflow {
        to {
          overflow-y: auto;
        }
      }
    }
  }
}
</style>
