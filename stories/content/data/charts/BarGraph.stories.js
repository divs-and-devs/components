import BarGraphComponent from '@/components/charts/BarGraph.vue';

export default {
  title: 'Content/Charts/Bar Graph',
  component: BarGraphComponent,
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical']
    }
  }
};

export const BarGraph = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-bar-graph v-bind="$props" />
  `
});

BarGraph.args = {
  data: [
    {
      name: 'Bar 1',
      value: 10
    },
    {
      name: 'Bar 2',
      value: 35
    },
    {
      name: 'Bar 3',
      value: 50
    },
    {
      name: 'Bar 4',
      value: 10
    }
  ]
};

export const Labels = BarGraph.bind({});
Labels.args = { ...BarGraph.args, name: 'name' };

export const VerticalOrientation = BarGraph.bind({});
VerticalOrientation.args = { ...BarGraph.args, orientation: 'vertical' };
