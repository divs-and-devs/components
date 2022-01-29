import colors from '@/colors.json';
import ProgressbarComponent from '@/components/Progressbar.vue';

export default {
  title: 'Controls/Progressbar',
  component: ProgressbarComponent,
  argTypes: {
    type: {
      control: 'radio',
      options: ['percentage', 'points']
    },
    color: {
      control: 'select',
      options: colors
    }
  },
  args: {
    value: 50
  }
};

export const Progressbar = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: 50
    };
  },
  template: '<d-progressbar v-bind="$props" v-on="$props" v-model="value"/>'
});

export const Points = Progressbar.bind({});
Points.args = {
  min: 25,
  max: 150,
  type: 'points'
};

export const Label = Progressbar.bind({});
Label.args = { label: 'Download progress' };

export const HideValue = Progressbar.bind({});
HideValue.args = { hideValue: true };

export const Indeterminate = Progressbar.bind({});
Indeterminate.args = { indeterminate: true, label: '', hideValue: true };
