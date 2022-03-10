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

export const Actions = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-banner v-bind="$props">
      Limited sale! 50% off!

      <template #actions>
        <a href="https://google.com" target="_blank">Action</a>
      </template>
    </d-banner>
  `
});

export const Inline = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-container background="cool-200">
      <h1>Title here</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, nam esse, autem ad nisi, deserunt aperiam illo corporis mollitia sapiente tempora praesentium deleniti vitae voluptate molestias accusamus repudiandae optio unde.</p>
      <d-banner v-bind="$props">
        Limited sale! 50% off!
        <template #actions>
          <a href="https://google.com" target="_blank">show offers</a>
        </template>
      </d-banner>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, nam esse, autem ad nisi, deserunt aperiam illo corporis mollitia sapiente tempora praesentium deleniti vitae voluptate molestias accusamus repudiandae optio unde.</p>
    </d-container>
  `
}); ;
Inline.parameters = { layout: 'padded' };
Inline.args = { type: 'inline' };
