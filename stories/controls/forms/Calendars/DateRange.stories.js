import DateRangeComponent from '@/components/calendar/DateRange.vue';
export default {
  title: 'Controls/Forms/Calendars/Date range',
  component: DateRangeComponent
};

export const DateRange = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: [null, null]
    };
  },
  template: '<d-date-range v-on="$props" v-model="value" v-bind="$props" />'
});
