import CheckboxGroupComponent from '@/components/CheckboxGroup.vue';
import CheckboxComponent from '@/components/Checkbox.vue';

export default {
  title: 'Controls/Forms/Checkbox Group',
  component: CheckboxGroupComponent,
  subcomponents: { Checkbox: CheckboxComponent },
  args: {
    options: {
      option1: 'Label for option 1',
      option2: 'Label for option 2'
    }
  }
};

export const CheckboxGroup = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-checkbox-group v-bind="$props" v-on="$props" />'
});
