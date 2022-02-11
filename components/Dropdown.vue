<template>
  <div class="dropdown-button" :class="{ open: isOpen }">
    <slot ref="button" name="button" :toggle="toggle" :open="isOpen">
      <button
        :class="{ disabled }"
        class="button"
        type="button"
        role="checkbox"
        :aria-checked="isOpen"
        aria-haspopup="true"
        @click.prevent="toggle"
      >
        <transition name="fade" mode="out-in">
          <span :key="label">{{ label }}</span>
        </transition>

        <d-icon name="chevron-down" :class="{ open: isOpen }" />
      </button>
    </slot>

    <transition>
      <div
        v-if="isOpen"
        v-keybind.esc
        class="backdrop"
        :class="{ sheet }"
        @click="close($event)"
      />
    </transition>
    <transition>
      <form
        v-if="isOpen"
        ref="dropdown"
        class="dropdown"
        :class="{ sheet }"
        :style="location"
        @submit.prevent="submit"
      >
        <div ref="arrow" class="arrow" :style="arrow" />
        <div class="container">
          <slot @close="isOpen = false" />
        </div>
      </form>
    </transition>
  </div>
</template>

<script>
import {
  computePosition,
  shift,
  flip,
  offset,
  size,
  arrow
} from '@floating-ui/dom';
import debounce from '../helpers/Debounce.js';

const invertedEdges = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};

export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
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
          'top-middle',
          'top-end',
          'right-start',
          'right-middle',
          'right-end',
          'bottom-start',
          'bottom-middle',
          'bottom-end',
          'left-start',
          'left-middle',
          'left-end'
        ].includes(value),
      default: 'bottom'
    },

    autoSize: {
      type: Boolean,
      default: false
    },

    offset: {
      type: [Number, String],
      default: 8
    },

    open: {
      type: Boolean,
      default: undefined
    },

    sheet: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      required: false
    }
  },

  data () {
    return {
      internalOpen: false,
      location: {
        '--max-height': undefined
      },
      arrow: {}
    };
  },

  computed: {
    isOpen: {
      get () {
        if (this.open !== undefined) return this.open;

        return this.internalOpen;
      },

      async set (value) {
        if (this.open !== undefined) this.$emit('update:open', value);
        else this.internalOpen = value;

        if (value) {
          await new Promise(resolve => setTimeout(resolve, 25));
          this.alignDropdown();
        }
      }
    }
  },

  watch: {
    align () {
      this.alignDropdown();
    }
  },

  mounted () {
    window.addEventListener(
      'scroll',
      debounce(() => {
        if (this.isOpen) this.alignDropdown();
      }, 5),
      { passive: true }
    );
  },

  methods: {
    submit (event) {
      this.$emit('submit', event);

      this.close();
    },

    click () {
      this.toggle();
    },

    close (e) {
      this.isOpen = false;

      requestAnimationFrame(() => {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element.closest(this.$el.firstElementChild) !== null)
          return;
        element?.dispatchEvent(e);
      });
    },

    async alignDropdown () {
      if (
        this.sheet &&
        window.matchMedia('only screen and (max-width: 800px)').matches
      ) {
        this.location = {};
        return;
      }

      const button = this.$el.firstElementChild;
      if (
        !(
          this.align.includes('end') ||
          this.align.includes('start') ||
          this.align.includes('middle')
        )
      )
        this.$refs.dropdown.style.setProperty(
          '--width',
          button.clientWidth + 'px'
        );

      const middleware = [
        shift({ padding: 8 }),
        flip(),
        offset(this.offset),
        arrow({
          element: this.$refs.arrow,
          padding: 8
        })
      ];

      if (this.autoSize)
        middleware.push(
          size({
            apply: ({ height }) => {
              this.location['--max-height'] = height + 'px';
            },
            padding: 8
          })
        );

      const position = await computePosition(button, this.$refs.dropdown, {
        placement: this.align,
        strategy: 'fixed',
        middleware
      });

      let width = 0;

      if (
        !(
          this.align.includes('end') ||
          this.align.includes('start') ||
          this.align.includes('middle')
        )
      )
        width = button.clientWidth + 'px';

      this.location = {
        ...this.location,
        transform: `translate(${Math.round(position.x)}px, ${Math.round(
          position.y
        )}px)`,
        '--width': width
      };

      const { x: arrowX, y: arrowY } = position.middlewareData.arrow;

      this.$refs.arrow.classList.remove('top', 'bottom', 'left', 'right');
      this.$refs.arrow.classList.add(
        invertedEdges[position.placement.split('-')[0]]
      );
      this.arrow.display =
        (arrowX !== undefined || arrowY !== undefined) && this.offset > 0
          ? 'block'
          : 'none';
      this.arrow.left = arrowX ? `${arrowX}px` : '';
      this.arrow.top = arrowY ? `${arrowY}px` : '';
      this.arrow.right = '';
      this.arrow.bottom = '';
      this.arrow.fontSize = this.offset + 'px';
      this.arrow[invertedEdges[position.placement.split('-')[0]]] = `-${
        this.offset * 2
      }px`;
    },

    toggle () {
      if (this.disabled) return;
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;

  @include mobile {
    &.sheet {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}

.dropdown-button {
  position: relative;

  > .button {
    display: block;
    font: inherit;
    font-size: 1rem;
    height: 100%;
    width: 100%;
    min-height: 2.5rem;
    background-color: $background;
    border: 1px solid $shade-300;
    text-align: left;
    vertical-align: middle;
    padding: 0 1rem;
    border-radius: $border-radius;
    color: $shade-500;
    cursor: pointer;
    user-select: none;
    transition: background-color 200ms ease, color 200ms ease,
      border-color 200ms ease;

    @include flex(space-between);

    &:disabled {
      cursor: default;
      pointer-events: none;
      background-color: $shade-100;
      color: $shade-300;
    }

    &:focus-visible {
      border-color: $primary;
    }

    svg {
      transition: transform 500ms ease;
      transform: rotate(0);

      &.open {
        transform: rotate(180deg);
      }
    }

    @include desktop {
      svg {
        margin-left: 1rem;
      }
    }
  }

  .dropdown {
    --dropdown-background: #{$background};
    --container-padding: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    background-color: var(--dropdown-background);
    border: 1px solid $shade-100;
    color: $text-color;
    min-width: var(--width, 300px);
    width: max-content;
    max-width: calc(100vw - 1rem);
    min-height: 2.5rem;
    box-shadow: $shadow-small;
    border-radius: $border-radius;
    z-index: 5;
    box-sizing: border-box;
    padding: 0;

    body.dark & {
      --dropdown-background: #{$shade-200};
      border: 1px solid $shade-100;
    }

    > .container {
      overflow-y: auto;
      overscroll-behavior: contain;
      border-radius: inherit;
      max-height: var(--max-height, unset);
    }

    @include mobile {
      &.sheet {
        box-shadow: $shadow;
        border: none !important;
        transform: translateY(0);
        max-height: 50vh;
        max-width: 100vw;
        overflow: auto;
        bottom: var(--screen-padding-bottom, 0);
        top: unset;
        left: 0;
        width: 100vw;
        height: auto;
        border-radius: 0;
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;

        &.v-enter-active,
        &.v-leave-active {
          transition: transform 250ms ease;
          opacity: 1 !important;
        }

        &.v-enter,
        &.v-leave-to {
          transform: translateY(100%);
        }
      }
    }
  }

  .arrow {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border: 1em solid transparent;
    transform-origin: center;
    animation: fadeIn 250ms ease both;
    filter: drop-shadow(0 -2px 2px $shade-200);

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    &.top {
      border-bottom: 1em solid var(--dropdown-background);
    }

    &.bottom {
      border-top: 1em solid var(--dropdown-background);
    }

    &.right {
      border-left: 1em solid var(--dropdown-background);
    }

    &.left {
      border-right: 1em solid var(--dropdown-background);
    }
  }
}
</style>
