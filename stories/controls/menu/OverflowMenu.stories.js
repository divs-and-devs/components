import OverflowMenuComponent from '@/components/menu/OverflowMenu.vue';
import icons from '@/helpers/Icons.js';

export default {
  title: 'Controls/Menu/Overflow Menu',
  component: OverflowMenuComponent,
  argTypes: {
    icon: {
      control: 'select',
      options: icons
    },
    align: {
      control: 'select',
      options: ['auto', 'top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end']
    }
  }
};

const Template = template => (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: template ?? `
      <d-overflow-menu v-bind="$props">
        <d-menu-item label="menu-item 1" @click="$toast('you clicked an menu-item')"/>
        <d-menu-item disabled label="menu-item 2" icon="edit" @click="$toast('you clicked an menu-item')"/>
        <d-menu-item label="Checkbox" type="checkbox" />
        <d-menu-item label="Checkbox icon" icon="edit" type="checkbox" />
        <d-menu-seperator />
        <d-menu-item label="menu-item 2" icon="more-vertical">
          <d-menu-item label="submenu" @click="$toast('you clicked an menu-item')"/>
          <d-menu-item label="submenu 2" icon="award" @click="$toast('you clicked an menu-item')"/>
          <d-menu-item label="menu-item 2" icon="more-vertical">
            <d-menu-item label="submenu" @click="$toast('you clicked an menu-item')"/>
            <d-menu-item label="submenu 2" icon="award" @click="$toast('you clicked an menu-item')"/>
            <d-menu-item label="menu-item 2" icon="more-vertical">
              <d-menu-item label="submenu 1" @click="$toast('you clicked an menu-item')"/>
              <d-menu-item label="submenu 1" icon="award" @click="$toast('you clicked an menu-item')"/>
            </d-menu-item>
            <d-menu-item label="menu-item 2" icon="more-vertical">
              <d-menu-item label="submenu 2" @click="$toast('you clicked an menu-item')"/>
              <d-menu-item label="submenu 2" icon="award" @click="$toast('you clicked an menu-item')"/>
            </d-menu-item>
          </d-menu-item>
        </d-menu-item>
        <d-menu-item label="menu-item 2" icon="trash" type="delete" @click="$toast('you clicked an menu-item')"/>
      </d-overflow-menu>
    `
});

export const OverflowMenu = Template().bind({});
