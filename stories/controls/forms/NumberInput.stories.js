import NumberInputComponent from '@/components/NumberInput.vue';

export default {
  title: 'Controls/Forms/Number input',
  component: NumberInputComponent,
  argTypes: {
    type: {
      control: 'select',
      options: ['number', 'currency', 'percentage']
    },
    min: {
      control: 'number'
    },
    max: {
      control: 'number'
    }
  }
};

export const NumberInput = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: 0
    };
  },
  template: '<d-number-input v-model="value" v-on="$props" v-bind="$props"/>'
});

export const Currency = NumberInput.bind({});
Currency.args = { type: 'currency' };

export const Percentage = NumberInput.bind({});
Percentage.args = { type: 'percentage' };
