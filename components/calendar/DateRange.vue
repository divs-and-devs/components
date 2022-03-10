<template>
  <div class="date-range" :class="{ invalid: startInvalid || endInvalid }">
    <label v-if="label">{{ label }}</label>
    <div class="inputs">
      <calendar
        :value="internalValue[0]"
        :disabled="disabled"
        :required="required"
        :highlights="[
          { date: internalValue[1], color: 'primary-shade' },
          { start: internalValue[0], end: value[1] },
        ]"
        class="first-calendar"
        @invalid="startInvalid = true"
        @input="changeStart"
        @change="updateStartScroll"
      />
      <span>tot</span>
      <calendar
        :value="internalValue[1]"
        :disabled="disabled"
        :required="required"
        :highlights="[
          { date: internalValue[0], color: 'primary-shade' },
          { start: internalValue[0], end: internalValue[1] },
        ]"
        class="last-calendar"
        @invalid="endInvalid = true"
        @input="changeEnd"
        @change="updateEndScroll"
      />
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import calendar from './Calendar.vue';

export default {
  components: { calendar },
  props: {
    value: {
      type: Array,
      default: () => [undefined, undefined]
    },

    label: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    }
  },

  data () {
    const start = DateTime.fromISO(this.value[0]);
    const end = DateTime.fromISO(this.value[1]);
    return {
      internalValue: this.value,
      startView: start.toFormat('MM-yy'),
      endView: end.toFormat('MM-yy'),
      startInvalid: false,
      endInvalid: false
    };
  },

  computed: {
    start () {
      return DateTime.fromISO(this.internalValue[0]);
    },
    end () {
      return DateTime.fromISO(this.internalValue[1]);
    }
  },

  methods: {
    updateStartScroll (date) {
      this.startView = date;
    },

    updateEndScroll (date) {
      this.endView = date;
    },

    changeStart (date) {
      const value = DateTime.fromISO(date);
      this.startInvalid = false;

      if (this.end.isValid && value.toSeconds() > this.end.toSeconds()) {
        this.internalValue = [this.start.toISO(), this.end.toISO()];
        return;
      }

      this.startView = value.toFormat('MM-yy');

      if (value.isValid) this.internalValue[0] = value.toISO();
      else this.internalValue[0] = null;

      this.internalValue = [...this.internalValue];

      this.$emit('input', this.internalValue);
    },

    changeEnd (date) {
      const value = DateTime.fromISO(date);
      this.endInvalid = false;

      if (this.start.isValid && value.toSeconds() < this.start.toSeconds()) {
        this.internalValue = [this.start.toISO(), this.end.toISO()];
        return;
      }
      this.endView = value.toFormat('MM-yy');

      if (value.isValid) this.internalValue[1] = value.toISO();
      else this.internalValue[1] = null;

      this.internalValue = [...this.internalValue];

      this.$emit('input', this.internalValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.date-range {
  margin: 1rem 0;

  label {
    font-family: $body-font, sans-serif;
    font-size: 0.8rem;
    display: block;
    margin: 0.5rem 0;
    transition: color 250ms ease;
  }

  .inputs {
    text-align: center;

    .calendar {
      margin: 0;
    }

    @include desktop {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      justify-items: start;
      align-items: center;
      gap: 1rem;
    }

    @include mobile {
      .calendar ~ .calendar {
        margin-block-start: 0.5rem;
      }

      span {
          display: none;
      }
    }
  }
}
</style>
