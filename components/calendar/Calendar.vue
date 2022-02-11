<template>
  <d-dropdown class="calendar" align="bottom-middle">
    <template #button="{toggle}">
      <d-textbox
        type="text"
        :value="htmlDate"
        :placeholder="today"
        :label="label"
        :required="required"
        :disabled="disabled"
        @invalid="$emit('invalid')"
        @change="parseHTMLDate"
      >
        <d-button
          tabindex="-1"
          type="secondary"
          icon="calendar"
          :disabled="disabled"
          icon-size="1.25"
          @click.stop="toggle"
        />
      </d-textbox>
    </template>

    <template #default>
      <d-container>
        <header>
          <h4
            :key="viewDate.toFormat('MMM yyyy')"
            @click="view = view == 'years' ? 'month' : 'years'"
          >
            {{ viewDate.toFormat("MMM yyyy") }}
            <d-icon :name="view == 'years' ? 'chevron-up' : 'chevron-down'" />
          </h4>
          <d-button icon="chevron-left" type="link" @click="previous" />
          <d-button icon="chevron-right" type="link" @click="next" />
        </header>
        <transition name="fade">
          <section v-show="view == 'month'" class="days">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </section>
        </transition>
        <transition name="fade" mode="out-in">
          <main v-if="view == 'month'" key="months" class="months">
            <transition :name="transition">
              <div :key="startOfMonth.toSeconds()" class="month">
                <template v-for="i in 42">
                  <span
                    :key="i"
                    :data-date="startOfMonth.plus({ days: i - 1 }).day"
                    :title="
                      startOfMonth.plus({ days: i - 1 }).toFormat('d MMMM yyyy')
                    "
                    :class="[
                      {
                        selected:
                          date &&
                          startOfMonth
                            .plus({ days: i - 1 })
                            .hasSame(date, 'day'),
                      },
                      getColor(startOfMonth.plus({ days: i - 1 })),
                    ]"
                    @click="
                      $emit('input', startOfMonth.plus({ days: i - 1 }).toISO())
                    "
                  >
                    {{ startOfMonth.plus({ days: i - 1 }).day }}
                  </span>
                </template>
              </div>
            </transition>
          </main>
          <main v-else-if="view == 'years'" key="years" class="years">
            <transition :name="transition">
              <div :key="viewDate.year">
                <span
                  v-for="i in 17"
                  :key="i"
                  :class="{
                    selected:
                      date &&
                      startOfMonth.plus({ years: i - 8 }).hasSame(date, 'year'),
                  }"
                  @click="
                    viewDate = startOfMonth.plus({ years: i - 8 });
                    view = 'month';
                  "
                >
                  {{
                    startOfMonth.plus({ years: i - 8 }).toObject("year").year
                  }}
                </span>
              </div>
            </transition>
          </main>
        </transition>
      </d-container>
    </template>
  </d-dropdown>
</template>

<script>
import { DateTime } from 'luxon';
export default {
  props: {
    label: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      default: undefined
    },

    highlights: {
      type: Array,
      default: () => []
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
    let viewDate = DateTime.fromISO(this.value).startOf('day');

    if (!viewDate.isValid) viewDate = DateTime.local();

    return {
      viewDate,
      transition: 'right',
      show: false,
      view: 'month'
    };
  },

  computed: {
    htmlDate () {
      if (!this.date.isValid) return '';
      return this.date.toFormat('dd-MM-yyyy');
    },

    today () {
      return DateTime.now().toFormat('dd-MM-yyyy');
    },

    startOfMonth () {
      return this.viewDate.startOf('month').startOf('week');
    },

    date () {
      return DateTime.fromISO(this.value);
    }
  },

  watch: {
    value () {
      if (this.value) this.viewDate = DateTime.fromISO(this.value);
    },

    date () {
      if (this.date < this.value) this.transition = 'left';
      else this.transition = 'right';

      this.$emit('input', this.date.toISO());
    }
  },

  methods: {
    parseHTMLDate (value) {
      const date = DateTime.fromFormat(value.target.value, 'dd-M-yyyy');

      this.$emit('input', date.toISO());
    },

    getColor (currentDate) {
      const classes = [];
      for (const date of this.highlights) {
        if (date.start && date.end) {
          const start = DateTime.fromISO(date.start).startOf('day');
          const end = DateTime.fromISO(date.end).startOf('day');

          if (
            currentDate.startOf('day').valueOf() ===
            start.startOf('day').valueOf()
          )
            classes.push('start');

          if (
            currentDate.startOf('day').valueOf() ===
            end.startOf('day').valueOf()
          )
            classes.push('end');

          if (currentDate >= start && currentDate <= end) classes.push('range');
        }

        if (
          date.date &&
          DateTime.fromISO(date.date).startOf('day').valueOf() ===
            currentDate.startOf('day').valueOf()
        )
          classes.push(date.color, 'color');
      }
      return classes.join(' ');
    },

    next () {
      this.transition = 'right';
      if (this.view === 'month')
        this.viewDate = this.viewDate.plus({ month: 1 });
      else this.viewDate = this.viewDate.plus({ year: 17 });

      this.$emit('change', this.viewDate.toFormat('MM-yy'));
    },

    previous () {
      this.transition = 'left';

      if (this.view === 'month')
        this.viewDate = this.viewDate.minus({ month: 1 });
      else this.viewDate = this.viewDate.minus({ year: 17 });
      this.$emit('change', this.viewDate.toFormat('MM-yy'));
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  margin: 1rem 0;
  position: relative;
  width: 100%;

  .textbox {
    width: 100%;
    margin: 0;
  }

  .calendar-popout {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: calc((100% - 15rem) / 2);
    right: calc((100% - 15rem) / 2);

    z-index: 99;
    max-width: 15rem;
    background-color: $shade-100;
    color: $text-color;
    box-shadow: $shadow;
    padding: 0.5rem;
    border-radius: $border-radius;
  }
}

header {
  @include flex(stretch);

  position: relative;
  overflow: hidden;
  z-index: 1;

  h4 {
    text-align: left;
    user-select: none;
    flex: 1;
    margin: 0;
  }

  > button.link,
  > button:hover {
    z-index: 1;
    padding: 0.25rem;
    margin: 0;
    stroke-width: 2;
  }
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 2rem);

  span {
    text-align: center;
    vertical-align: middle;
    width: 2rem;
    line-height: 2rem;
    font-weight: 500;
    font-size: 0.75rem;
    user-select: none;
  }
}

main {
  position: relative;
  height: 13.5rem;
  overflow: hidden;
}

.years > div {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  padding-top: 1.5rem;
  height: inherit;
  width: 100%;
  transition: transform 500ms ease-in-out;

  > span {
    text-align: center;
    cursor: pointer;
    padding: 0.5rem 0.25rem;
    border-radius: 0.25rem;
    vertical-align: middle;
  }

  .selected {
    background-color: $primary;
    color: $light;
  }
}

.month {
  display: grid;
  grid-template-columns: repeat(7, 2rem);
  row-gap: 4px;
  position: absolute;
  left: 0;
  top: 0;
  transition: transform 500ms ease-in-out;

  > span {
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.75rem;
    user-select: none;
    box-sizing: border-box;

    @include flex;

    @include colors(--color);
    @include text-color(--day-text-color);

    &:nth-child(7n) {
      border-bottom-right-radius: 50%;
      border-top-right-radius: 50%;
    }

    &:nth-child(7n + 1) {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }

    &::before {
      position: absolute;
      width: 100%;
      height: 100%;
      content: "";
      transform: scale(0);
      box-sizing: border-box;
      color: var(--day-text-color);
      overflow: hidden;
      border: 2px solid transparent;
      border-radius: 50%;
      transition: transform 200ms ease, color 200ms ease,
        background-color 200ms ease, border-color 200ms ease;
    }

    &.color.selected::before {
      border: 2px solid var(--color);
      background-color: $primary;
    }

    &.selected::before {
      position: absolute;
      content: attr(data-date);
      background-color: $primary;
      color: $primary-text;
      border-radius: 50%;
      transform: scale(1);

      @include flex;
    }

    &.color::before {
      position: absolute;
      content: attr(data-date);
      background-color: var(--color, $primary);
      border-radius: 50%;
      transform: scale(1);

      @include flex;
    }

    &.range {
      background-color: $primary-fade;

      .dark & {
        background-color: $primary-shade;
      }

      &.start {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }

      &.end {
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
      }
    }
  }
}

.right-enter,
.left-leave-to {
  transform: translate(100%);
}

.left-enter,
.right-leave-to {
  transform: translate(-100%);
}
</style>
