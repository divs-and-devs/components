<template>
  <transition name="popup" appear>
    <div
      v-if="internalValues.show || show"
      class="toast"
      :style="{ '--count': toastCount }"
      :class="{ error: error || internalValues.error }"
      role="alert"
    >
      <d-icon
        v-if="internalValues.icon || icon"
        color="white"
        :name="internalValues.icon || icon"
      />
      <div class="content">
        <slot>
          <strong>{{ internalValues.title || title }}</strong>

          <p v-if="internalValues.subtitle || subtitle">
            {{ internalValues.subtitle || subtitle }}
          </p>
        </slot>
      </div>
      <button
        v-if="internalValues.action || action"
        class="action"
        @click="triggerAction"
      >
        {{ internalValues.action || action }}
      </button>
    </div>
  </transition>
</template>

<script>
let toastCount = 0;
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    error: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      timeout: undefined,
      resolve: undefined,
      reject: undefined,
      toastCount,

      internalValues: {
        show: false,
        title: '',
        subtitle: '',
        action: '',
        icon: '',
        error: false
      }
    };
  },

  watch: {
    show () {
      if (this.show) toastCount++;
      else toastCount--;
    }
  },

  methods: {
    triggerAction () {
      this.internalValues.show = false;
      toastCount--;

      if (this.resolve) this.resolve(true);

      if (this.timeout) {
        clearTimeout(this.timeout);
        return;
      }

      this.$emit('action');
    },

    open (options) {
      toastCount++;

      if (this.timeout) clearTimeout(this.timeout);

      let delay = 5000;

      this.internalValues.show = true;

      if (typeof options === 'string') {
        this.internalValues.error = false;
        this.internalValues.title = options;
        this.internalValues.subtitle = undefined;
        this.internalValues.action = undefined;
        this.internalValues.icon = undefined;
      } else {
        delay = options.delay ?? delay;
        this.internalValues.error = options.error;
        this.internalValues.title = options.title;
        this.internalValues.subtitle = options.subtitle;
        this.internalValues.action = options.action;
        this.internalValues.icon = options.icon;
      }

      if (delay > 0)
        this.timeout = setTimeout(() => {
          this.internalValues.show = false;
          toastCount--;

          if (this.resolve) this.resolve(false);
        }, delay);

      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  bottom: calc(var(--count, 0) * 5rem + 1rem);
  left: 50%;
  width: max-content;
  max-width: calc(100vw - 3rem);
  transform: translate(-50%, 0);

  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: $border-radius;
  border: 1px solid $shade-800;
  background-color: $shade-600;
  color: $light;
  animation: appear 1s ease-out;

  body.dark & {
    border: 1px solid $shade-100;
    background-color: $shade-200;
    color: $light;
  }

  @keyframes appear {
    from {
      bottom: -100%;
    }
  }

  body.dark &.error,
  &.error {
    background-color: $error;
    color: $error-text;

    .action {
      padding: 0.25rem 1rem;
      border-radius: $border-radius;
      color: $light;
    }
  }
  &.popup-enter-active,
  &.popup-leave-active {
    transition: bottom 1000ms ease-in-out;
  }

  &.popup-enter,
  &.popup-leave-to {
    bottom: -100%;
  }

  &.popup-enter-to,
  &.popup-leave {
    bottom: calc(var(--count) * 5rem + 1rem);
  }

  > .icon {
    font-size: 1.5rem;
    place-self: center;
  }

  .content {
    flex: 1;

    strong + p {
      margin-top: 0.25rem;
    }
  }

  .action {
    background: none;
    outline: none;
    border: none;
    font: inherit;
    color: $primary;
    text-decoration-skip-ink: none;
    letter-spacing: 0.05rem;
    font-weight: 700;
    margin: {
      left: 2rem;
      right: 0.5rem;
    }
  }
}
</style>
