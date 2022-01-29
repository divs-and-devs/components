import TooltipComponent from '@/components/Tooltip.vue';

export default {
  title: 'Content/Alerts/Tooltip',
  component: TooltipComponent,
  parameters: {
    layout: 'centered'
  },

  argTypes: {
    align: {
      control: 'select',
      options: ['auto', 'top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end']
    },
    offset: {
      control: 'number'
    },
    delay: {
      control: 'number'
    },
    anchor: {
      control: 'text'
    }
  }
};

export const Tooltip = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-button>
      Hover me
      <d-tooltip v-bind="$props">
        Hello!
      </d-tooltip>
    </d-button>
  `
});

export const Content = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-button>
      Hover me
      <d-tooltip v-bind="$props">
        <p>
          <strong>Hello!</strong> This is html content.
          <d-checkbox disabled value>Html content verified</d-checkbox>
          <d-icon name="home" />
        </p>
      </d-tooltip>
    </d-button>
  `
});

export const Directive = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
      <pre>
      <code class="block">
        &lt;button v-tooltip="\`hello\`"/&gt;
        &lt;button v-tooltip:0.bottom.right="\`hello\`"/&gt;
      </code>
      </pre>
      <d-button style="margin: 10vw" v-tooltip="\`hello\`">
        Hover me
      </d-button>
      <d-button style="margin: 10vw" v-tooltip:0.bottom.right="\`hello\`">
        Hover me
      </d-button>
    </div>
  `
});

export const Anchor = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
      <d-button style="margin: 10vw">
        Hover me

        <d-tooltip v-bind="$props">
          I have a different anchor.
        </d-tooltip>
      </d-button>


      <div style="background: red; width: 1rem; height: 1rem;" class="anchor" />
    </div>
  `
});
Anchor.args = { anchor: '.anchor' };
