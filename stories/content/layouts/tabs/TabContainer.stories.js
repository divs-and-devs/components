import colors from '@/colors.json';
import TabContainerComponent from '@/components/tabs/TabContainer.vue';

export default {
  title: 'Content/Layouts/Tabs/Tab Container',
  component: TabContainerComponent,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    background: {
      control: 'select',
      options: colors
    },
    transition: {
      control: 'select',
      options: ['fade', 'slide-right', 'slide-left', 'slide-horizontal', 'slide-horizontal-reverse', 'fade-up', 'fade-down', 'fade-left', 'fade-right']
    }
  }
};

export const TabContainer = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-tab-container v-bind="$props">
      <d-tab name="Tab 1">
        <h1>Tab 1</h1>
        <p>this is defined in a
        <code class="block">
        <pre>
        &lt;d-tab name="tab 1"&gt;
        ...
        &lt;/d-tab&gt;
        </pre>
        </code>
        </p>
      </d-tab>
      <d-tab name="tab 2">
        <h1>Tab 2</h1>
      </d-tab>
      <d-tab name="tab 3">
        <h1>Tab 3</h1>
      </d-tab>
    </d-tab-container>`
});

export const Actions = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-tab-container v-bind="$props">
      <template #actions>
        <d-button>Action</d-button>
      </template>
      <template #default>
        <d-tab name="tab 1" :count="15" v-on="$props">
          <h1>Tab 1</h1>
          <p>this is defined in a
          <code class="block">
          <pre>
          &lt;d-tab name="tab 1" :count="15"&gt;
          ...
          &lt;/d-tab&gt;
          </pre>
          </code>
        </d-tab>
        <d-tab name="tab 2" :count="0" v-on="$props">
          <h1>Tab 2</h1>
        </d-tab>
      </template>
    </d-tab-container>`
});

export const Selected = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      selected: 'tab 1'
    };
  },
  template: `
    <div>
      <p style="padding: 1rem 0.5rem;">
        This story uses the <code>:selected.sync</code> property, this is equal to the name of the current selected tab.
      </p>
      <transition mode="out-in">
        <strong style="padding: 0 0.5rem;" :key="selected">
          Selected tab is {{ selected }}
        </strong>
      </transition>
      <d-tab-container v-bind="$props" :selected.sync="selected">
        <d-tab name="tab 1" v-on="$props">
          <h1>Tab 1</h1>
          <p>this is defined in a
          <code class="block">
          <pre>
          &lt;d-tab name="tab 1" &gt;
          ...
          &lt;/d-tab&gt;
          </pre>
          </code>
        </d-tab>
        <d-tab name="tab 2" v-on="$props">
          <h1>Tab 2</h1>
        </d-tab>
      </d-tab-container>
    </div>`
});
