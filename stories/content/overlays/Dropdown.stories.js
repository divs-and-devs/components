import DropdownComponent from '@/components/Dropdown.vue';

export default {
  title: 'Content/Overlays/Dropdown',
  component: DropdownComponent,
  argTypes: {
    align: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end']
    }
  }
};

export const Dropdown = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-dropdown v-bind="$props"><d-container background="primary">Dropdown content</d-container></d-dropdown>'
});

export const WithContent = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
      <d-dropdown v-bind="$props" v-on="$props">
        <d-container background="primary">
          <p><strong>No users found.</strong></p>
          <d-button>Click here to refresh</d-button>
        </d-container>
      </d-dropdown>`
});

export const autoSize = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
      <div style="min-height: 200vh;">
        <d-dropdown v-bind="$props"  v-on="$props">
          <d-container screen>
            <strong>Super long content</strong>
            <template v-for="i in 40">
              <h2>
              <br>
              <d-icon name="arrow-down" />
              <br>
              </h2>
            </template>
            <h2>Hello there</h2>
          </d-container>
        </d-dropdown>

        <p>The <code>auto-size</code> property guarantees that the dropdown content stays on screen and doesn't overflow outside the viewport.</p>
      </div>
      `
});
autoSize.args = { autoSize: true };

export const closingWhenClickingButton = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
      <d-dropdown v-bind="$props" v-on="$props">
          <d-container>
            <h4><code>d-dropdown</code> is a form, when submitted it will close the dropdown.</h4>
            <d-textbox required label="This field is required, leave something nice." placeholder="Something like, 'you smell nice!'"/>
            <d-button submit>Submit</d-button>
          </d-container>
      </d-dropdown>
      `
});

export const buttonSlot = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
      <d-dropdown v-bind="$props" v-on="$props">
          <template #button="{toggle}">
            <d-button icon="chevron-down" @click="toggle">
              Open dropdown
            </atura-button>
          </template>
          <template #default>
            <d-container background="cool-500">
              <h4>You can use the <code>button</code> slot to change the default button.</h4>
            </d-container>
          </template>
      </d-dropdown>
      `
});

export const programaticOpen = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      open: false
    };
  },
  template: `
      <div>
        <d-switch v-model="open">Open dropdown</d-switch>
        <d-dropdown v-bind="$props" v-on="$props" :open.sync="open">
          <d-container background="signal-warning">
            <h4>Programatic open/close with <code>:open.sync="open"</code></h4>
          </d-container>
        </d-dropdown>
      </div>
      `
});
programaticOpen.parameters = { controls: { exclude: ['open'] } };
