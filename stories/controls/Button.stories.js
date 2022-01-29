import icons from '@/helpers/Icons.js';
import ButtonComponent from '@/components/Button.vue';

export default {
  title: 'Controls/Button',
  component: ButtonComponent,
  argTypes: {
    type: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'link']
    },

    icon: {
      control: 'select',
      options: icons
    },

    iconAlign: {
      control: 'radio',
      options: ['left', 'right']
    },

    iconSize: {
      control: {
        type: 'range',
        min: 1,
        max: 5,
        step: 0.5
      }
    }
  }
};

export const Button = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-button v-bind="$props" v-on="$props">Button</d-button>'
});
export const IconOnly = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-button v-bind="$props" v-on="$props" />'
});
IconOnly.args = { icon: 'bookmark' };

export const IconAndText = Button.bind({});
IconAndText.args = { icon: 'bookmark' };

export const LoadingState = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-button v-bind="$props" v-on="$props">
    Button

    <template #loader>
      <d-spinner />
    </template>
  </d-button>`
});

LoadingState.args = { loading: true };
