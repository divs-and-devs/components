import colors from '@/colors.json';

export default {
  title: 'Content/Spinner',
  argTypes: {
    color: {
      control: 'select',
      options: colors
    }
  }
};

export const Spinner = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-spinner v-bind="$props">
  `
});
