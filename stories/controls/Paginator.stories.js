import PaginatorComponent from '@/components/Paginator.vue';
import colors from '@/colors.json';

export default {
  title: 'Controls/Paginator',
  component: PaginatorComponent,
  argTypes: {
    color: {
      control: 'select',
      options: colors
    },
    type: {
      control: 'radio',
      options: ['buttons', 'bar']
    }
  },

  args: {
    pageCount: 15,
    width: 3
  }
};

export const Paginator = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      page: 0
    };
  },
  template: `
    <d-paginator v-bind="$props" v-on="$props" v-model="page" />
  `
});
