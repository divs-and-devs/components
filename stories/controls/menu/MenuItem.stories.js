import MenuItemComponent from '@/components/menu/MenuItem.vue';
import icons from '@/helpers/Icons.js';

export default {
  title: 'Controls/Menu/Menu item',
  component: MenuItemComponent,
  argTypes: {
    icon: {
      control: 'select',
      options: icons
    },
    type: {
      control: 'radio',
      options: ['normal', 'delete', 'checkbox']
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-menu open>
    <d-menu-item v-bind="$props" v-on="$props"/>
  </d-menu>
  `
});

export const Action = Template.bind({});
export const Checkbox = Template.bind({});

Checkbox.args = { type: 'checkbox' };
