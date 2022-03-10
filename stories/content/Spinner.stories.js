import colors from '@/colors.json';
import spinnerComponent from '@/components/Spinner.vue';

export default {
  title: 'Content/Spinner',
  component: spinnerComponent,
  argTypes: {
    color: {
      control: 'select',
      options: colors
    },

    size: {
      control: 'radio',
      options: ['inline', 'block']
    }
  }
};

export const Spinner = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-spinner v-bind="$props" />
  `
});
