<template>
  <div class="slider" :class="{ disabled, 'hide-values': hideValues }">
    <div v-if="labels.length" class="labels">
      <label v-for="part in labels" :key="part">
        {{ part }}
      </label>
    </div>
    <div v-if="showScale" class="scale">
      <p>
        {{ min }}
      </p>
      <p>
        {{ max }}
      </p>
    </div>
    <div class="bar" :class="color" @click="drag">
      <div class="value" :style="style" />
      <button
        ref="knob"
        class="knob"
        :style="{ '--left': style.width }"
        :tabindex="disabled ? -1 : 0"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="value"
        @click.stop
        @pointerdown.prevent="dragStart"
        @pointerup.prevent="dragStop"
        @keydown.left.exact.prevent="emitValue(value - 1)"
        @keydown.right.exact.prevent="emitValue(value + 1)"
        @keydown.shift.left.prevent="emitValue(value - 10)"
        @keydown.shift.right.prevent="emitValue(value + 10)"
      />
    </div>
    <div class="values">
      <div class="input">
        <input
          tabindex="-1"
          :min="min"
          :max="max"
          type="number"
          :value="value"
          :disabled="disabled"
          @input="emitValue(Number($event.target.value))"
        >
        <template v-if="type == 'percentage'">
          %
        </template>
      </div>

      <div class="input">
        <input
          tabindex="-1"
          :min="min"
          :max="max"
          type="number"
          :value="max - value + min"
          :disabled="disabled"
          @input="emitValue(Number(max - $event.target.value + min))"
        >
        <template v-if="type == 'percentage'">
          %
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },

    label: {
      type: [String, Array],
      default: ''
    },

    /**
     * @values colors
     */
    color: {
      type: String,
      default: 'primary'
    },

    type: {
      type: String,
      default: 'percentage'
    },

    min: {
      type: Number,
      default: 0
    },

    max: {
      type: Number,
      default: 100
    },

    disabled: {
      type: Boolean,
      default: false
    },

    hideValues: {
      type: Boolean
    }
  },

  data () {
    return {
      start: 0
    };
  },

  computed: {
    showScale () {
      return this.type === 'points';
    },

    labels () {
      if (Array.isArray(this.label)) return this.label;

      return this.label.split(',').map(x => x.trim());
    },

    style () {
      return {
        width: ((this.value - this.min) / (this.max - this.min)) * 100 + '%'
      };
    }
  },

  methods: {
    dragStart (event) {
      if (this.disabled) return;

      this.$refs.knob.addEventListener('pointermove', this.drag);
      this.$refs.knob.setPointerCapture(event.pointerId);
    },

    dragStop (event) {
      if (this.disabled) return;

      this.$refs.knob.removeEventListener('pointermove', this.drag);
      this.$refs.knob.releasePointerCapture(event.pointerId);
      this.$refs.knob.blur();
    },

    drag (event) {
      if (this.disabled) return;

      const rect = this.$el.getClientRects()[0];

      const delta = event.clientX - rect.x;
      const scale = rect.width / (this.max - this.min);

      this.emitValue(this.min + delta / scale);
    },

    emitValue (value) {
      if (this.disabled) return;

      this.$emit('input', this.clampValue(value));
    },

    clampValue (value) {
      return Math.round(
        Math.min(this.max, Math.max(this.min, value ?? this.min))
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.disabled {
  > .bar {
    cursor: default;

    > .value {
      cursor: default;
      color: $shade-500;
    }
  }
}

.disabled > .knob,
.knob:disabled {
  cursor: default !important;
  opacity: 0.75;

  &:focus {
    cursor: default;
  }
}

.hide-values .values {
  display: none;
}

.slider {
  margin: 1rem 0;
}

.values,
.scale {
  @include flex(space-between);
}

.labels {
  @include flex(stretch);

  label {
    flex: 1;
    text-align: center;
    font-family: $body-font, sans-serif;
    font-size: 0.8rem;
    display: block;
    margin: 0.5rem 0;
    transition: color 250ms ease;

    &:last-child {
      text-align: right;
    }

    &:first-child {
      text-align: left;
    }
  }
}

.bar {
  background-color: $shade-300;
  @include colors(color);

  position: relative;
  border-radius: $border-radius;
  height: 0.5rem;
  white-space: nowrap;
  margin: 1rem 0;
  contain: layout;
  cursor: text;

  .value {
    height: 0.5rem;
    border-radius: $border-radius;
    background-color: currentColor;
    contain: layout;
    will-change: width;
  }

  .knob {
    position: absolute;
    height: 2rem;
    width: 1rem;
    top: -0.75rem;
    left: min(max(0.01rem, calc(var(--left) - 0.5rem)), calc(100% - 1rem));
    background-color: $background;
    border: 1px solid $shade-300;
    box-shadow: $shadow-small;
    border-radius: math.div($border-radius, 2);
    cursor: grab;

    body.dark & {
      background-color: $shade-100;
      border-color: $shade-300;
    }

    &:focus {
      cursor: grabbing;
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }
}

.input {
  @include flex;

  border: 1px solid $shade-300;
  border-radius: math.div($border-radius, 2);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  text-align: center;

  input {
    font: inherit;
    text-align: left;
    width: 3ch;
    font-size: 0.875rem;
    appearance: textfield;
    border: none;
    background: none;
    flex: 1;
    padding: 0;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.scale p {
  color: $shade-500;
  font-size: 0.75rem;
  transform: translateY(0.75rem);
}
</style>
