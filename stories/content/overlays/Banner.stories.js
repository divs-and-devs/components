import BannerComponent from '@/components/Banner.vue';
import colors from '@/colors.json';
export default {
  title: 'Content/Overlays/Banner',
  component: BannerComponent,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    color: {
      control: 'select',
      options: colors
    },
    type: {
      control: 'radio',
      options: ['bar', 'fixed', 'inline']
    }
  },

  args: {
    color: 'primary'
  }
};

export const Banner = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-banner v-bind="$props">
      Limited sale! 50&amp; off!
    </d-banner>
  `
});

export const Inline = Banner.bind({});
Inline.parameters = { layout: 'padded' };
Inline.args = { type: 'inline' };
