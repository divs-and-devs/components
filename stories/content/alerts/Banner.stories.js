import BannerComponent from '@/components/Banner.vue';
import icons from '@/helpers/Icons.js';
import colors from '@/colors.json';
export default {
  title: 'Content/Alerts/Banner',
  component: BannerComponent,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    color: {
      control: 'select',
      options: colors
    },
    icon: {
      control: 'select',
      options: icons
    },
    type: {
      control: 'radio',
      options: ['bar', 'fixed', 'inline', 'float']
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
      Limited sale! 50% off!
    </d-banner>
  `
});

export const Inline = Banner.bind({});
Inline.parameters = { layout: 'padded' };
Inline.args = { type: 'inline' };
