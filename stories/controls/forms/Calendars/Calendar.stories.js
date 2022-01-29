import { DateTime } from 'luxon';
import calendarComponent from '@/components/calendar/Calendar.vue';

export default {
  title: 'Controls/Forms/Calendars/Calendar',
  component: calendarComponent
};

const today = DateTime.local().startOf('day').toISO();
const tomorrow = DateTime.local().plus({ day: 1 });
const nextWeek = DateTime.local().plus({ week: 1 });

export const Calendar = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: today
    };
  },
  template: '<d-calendar v-on="$props" v-model="value" v-bind="$props" />'
});
export const HighlightDate = Calendar.bind({});
HighlightDate.args = {
  highlights: [
    { date: tomorrow.toISO(), color: 'purple' },
    { date: tomorrow.plus({ day: 1 }).toISO(), color: 'warning' },
    { date: tomorrow.plus({ day: 2 }).toISO(), color: 'secondary' },
    { date: tomorrow.plus({ day: 3 }).toISO(), color: 'error' },
    { date: tomorrow.plus({ day: 4 }).toISO(), color: 'primary' },
    { date: tomorrow.plus({ day: 5 }).toISO(), color: 'primary-fade' }
  ]
};

export const HighlightRange = Calendar.bind({});
HighlightRange.args = {
  highlights: [{ start: nextWeek.toISO(), end: nextWeek.plus({ week: 1 }).toISO(), color: 'purple' }]
};
