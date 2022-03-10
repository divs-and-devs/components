import colors from '@/colors.json';
import ContainerComponent from '@/components/Container.vue';

export default {
  title: 'Content/Layouts/Container',
  component: ContainerComponent,

  parameters: {
    layout: 'fullscreen'
  },

  argTypes: {
    background: {
      control: 'select',
      options: colors
    }
  }
};

export const Container = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-container v-bind="$props" v-on="$props">
    <h1>Container</h1>
    <p><strong>This is the content container, in this content is guaranteed to follow the design guidelines.</strong> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur magni eum qui ea error accusamus exercitationem, in, minima consequatur veritatis unde temporibus soluta voluptatum id, delectus sit sequi molestias quibusdam?</p>
  </d-container>`
});
