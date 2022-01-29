import PaginatorComponent from '@/components/Paginator.vue';
import colors from '@/colors.json';

export default {
  title: 'Controls/Paginator',
  component: PaginatorComponent,
  argTypes: {
    color: {
      control: 'select',
      options: colors
    }
  },

  args: {
    pageCount: 15,
    width: 3
  }
};

export const Default = (_, { argTypes }) => ({
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
