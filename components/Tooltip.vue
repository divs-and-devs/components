<template>
  <transition :name="transitionName" @enter="alignBubble">
    <div
      v-show="internalShow"
      ref="bubble"
      class="tooltip"
      :style="style"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div ref="arrow" class="arrow" :style="arrow" />
      <slot>{{ label }}</slot>
    </div>
  </transition>
</template>

<script>
import {
  computePosition,
  autoPlacement,
  offset,
  shift,
  flip,
  arrow
} from '@floating-ui/dom';

import clamp from '../helpers/Clamp';

const invertedEdges = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};

export default {
  props: {
    show: {
      type: Boolean,
      default: undefined
    },

    align: {
      type: String,
      default: 'auto'
    },

    label: {
      type: String,
      default: ''
    },

    anchor: {
      type: [String, Object],
      required: false,
      default: undefined
    },

    delay: {
      type: [Number, String],
      default: 1000
    },

    offset: {
      type: [Number, String],
      default: 4
    }
  },

  data () {
    return {
      top: 0,
      left: 0,
      anchorElement: undefined,
      internalShow: this.show,
      timeout: undefined,
      transitionName: 'fade',
      arrow: {
        top: 0,
        left: 0
      }
    };
  },

  computed: {
    style () {
      return {
        top: this.top + 'px',
        left: this.left + 'px'
      };
    },

    alignments () {
      return this.align.split('-');
    }
  },

  watch: {
    show () {
      this.internalShow = this.show;
    },

    align () {
      this.alignBubble();
    },

    async internalShow () {
      await new Promise(resolve => setTimeout(resolve, 125));

      this.alignBubble();
    },

    anchor () {
      this.anchorElement = this.getAnchor();

      this.alignBubble();
    }
  },
  mounted () {
    this.createEvents();
    this.anchorElement = this.getAnchor();
  },

  methods: {
    open (x, y) {
      this.internalShow = true;
      this.alignBubble(x, y);
    },

    createEvents () {
      if (!process.browser) return;

      this.anchorElement = this.getAnchor();

      if (this.show !== undefined) return;

      const hoverElement = this.$parent?.$el ?? this.$el.parentElement;

      if (!hoverElement)
        // eslint-disable-next-line no-console
        console.warn('No hover element found.');

      if (!hoverElement) return;

      hoverElement.addEventListener('mouseenter', () =>
        this.startDelay(this.delay)
      );
      hoverElement.addEventListener('mouseleave', () => {
        this.internalShow = false;
        if (this.timeout) clearTimeout(this.timeout);
      });

      hoverElement.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.startDelay(100);
      });
      hoverElement.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.internalShow = false;
      });
    },

    startDelay (delay) {
      if (this.show !== undefined) return;

      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(() => (this.internalShow = true), delay);
    },

    getAnchor () {
      if (this.anchor)
        if (this.anchor instanceof Element) return this.anchor;
        else if (typeof this.anchor === 'string')
          return document.querySelector(this.anchor);
        else if (this.anchor.$el && this.anchor.$el instanceof Element)
          return this.anchor.$el;

      return this.$el?.parentElement ?? this.$parent?.$el ?? this.$el;
    },

    async alignBubble (x, y) {
      if (!process.browser) return;

      if (this.align === 'manual') {
        this.left = clamp(
          x ?? this.left,
          8,
          window.innerWidth - this.$refs.bubble.clientWidth - 8
        );
        this.top = clamp(
          y ?? this.top,
          8,
          window.innerHeight - this.$refs.bubble.clientHeight - 8
        );
        return;
      }

      const middlewares = [
        offset(this.offset),
        flip(),
        shift({ padding: 8 }),
        arrow({
          element: this.$refs.arrow,
          padding: 8
        })
      ];

      if (this.align === 'auto') middlewares.splice(1, 1, autoPlacement());

      const position = await computePosition(
        this.anchorElement,
        this.$refs.bubble,
        {
          middleware: middlewares,
          placement: this.align === 'auto' ? undefined : this.align,
          strategy: 'fixed'
        }
      );

      this.left = position.x;
      this.top = position.y;

      const { x: arrowX, y: arrowY } = position.middlewareData.arrow;

      this.$refs.arrow.classList.remove('top', 'bottom', 'left', 'right');
      this.$refs.arrow.classList.add(
        invertedEdges[position.placement.split('-')[0]]
      );
      this.arrow.display =
        arrowX !== undefined || arrowY !== undefined ? 'block' : 'none';
      this.arrow.left = arrowX ? `${arrowX}px` : '';
      this.arrow.top = arrowY ? `${arrowY}px` : '';
      this.arrow.right = '';
      this.arrow.bottom = '';
      this.arrow.fontSize = this.offset + 'px';
      this.arrow[invertedEdges[position.placement.split('-')[0]]] = `-${
        this.offset * 2
      }px`;
    },

    async forceHide () {
      this.transitionName = '';
      this.internalShow = false;

      await this.$nextTick();

      this.transitionName = 'fade';
    }
  }
};
</script>
<style lang="scss">
.tooltip {
  display: block;
  font-family: $body-font;
  font-weight: 400;
  font-size: 1rem;
  text-align: left;
  line-height: 160%;
  border-radius: $border-radius;
  box-shadow: $shadow-small;
  border: 1px solid $shade-100;
  position: fixed;
  pointer-events: none;
  padding: 0.5rem 1rem;
  z-index: 100;
  max-width: 620px;
  max-width: min(100vw, 620px);
  cursor: default;
  user-select: none;
  transition-duration: 100ms;
  background-color: $shade-100;
  --tooltip-background: #{$shade-100};
  color: $text-color;

  body.dark & {
    --tooltip-background: #{$shade-200};
    background-color: $shade-200;
  }

  .arrow {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border: 1em solid transparent;
    transform-origin: center;
    animation: fadeIn 250ms ease both;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    &.top {
      border-bottom: 1em solid var(--tooltip-background);
    }

    &.bottom {
      border-top: 1em solid var(--tooltip-background);
    }

    &.right {
      border-left: 1em solid var(--tooltip-background);
    }

    &.left {
      border-right: 1em solid var(--tooltip-background);
    }
  }
}
</style>
