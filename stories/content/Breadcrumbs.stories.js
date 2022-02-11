import BreadcrumbsComponent from '@/components/Breadcrumbs.vue';

export default {
  title: 'Content/Breadcrumbs',
  component: BreadcrumbsComponent
};

export const Breadcrumbs = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-breadcrumbs v-bind="$props" />
  `
});
