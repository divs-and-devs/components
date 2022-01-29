import ContextMenuComponent from '@/components/menu/ContextMenu.vue';

export default {
  title: 'Controls/Menu/Context Menu',
  component: ContextMenuComponent,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true }
  }
};

const Template = template => (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  template: template ?? `
      <d-container background="primary-shade" center screen>
        <p>Right click anywhere</p>
        <d-context-menu v-bind="$props">
          <d-menu-item label="menu-item 1" @click="$toast('you clicked an menu-item')" />
          <d-menu-item disabled label="menu-item 2" icon="edit" @click="$toast('you clicked an menu-item')" />
          <d-menu-item label="Checkbox" type="checkbox" />
          <d-menu-item label="Checkbox icon" icon="edit" type="checkbox" />
          <d-menu-seperator />
          <d-menu-item label="menu-item 2" icon="more-vertical">
            <d-menu-item label="submenu" @click="$toast('you clicked an menu-item')" />
            <d-menu-item label="submenu 2" icon="award" @click="$toast('you clicked an menu-item')" />
            <d-menu-item label="menu-item 2" icon="more-vertical">
              <d-menu-item label="submenu" @click="$toast('you clicked an menu-item')" />
              <d-menu-item label="submenu 2" icon="award" @click="$toast('you clicked an menu-item')" />
              <d-menu-item label="menu-item 2" icon="more-vertical">
                <d-menu-item label="submenu 1" @click="$toast('you clicked an menu-item')"/>
                <d-menu-item label="submenu 1" icon="award" @click="$toast('you clicked an menu-item')" />
              </d-menu-item>
              <d-menu-item label="menu-item 2" icon="more-vertical">
                <d-menu-item label="submenu 2" @click="$toast('you clicked an menu-item')" />
                <d-menu-item label="submenu 2" icon="award" @click="$toast('you clicked an menu-item')" />
              </d-menu-item>
            </d-menu-item>
          </d-menu-item>
          <d-menu-item label="menu-item 2" icon="trash" type="delete" @click="$toast('you clicked an menu-item')" />
        </d-context-menu>
      </d-container>
    `
});

export const ContextMenu = Template().bind({});
