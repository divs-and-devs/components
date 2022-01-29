import TabComponent from '@/components/tabs/Tab.vue';
export default {
  title: 'Content/Layouts/Tabs/Tab',
  component: TabComponent,
  args: {
    name: 'tab'
  }
};

export const Tab = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-tab-container>
      <d-tab v-bind="$props" v-on="$props">
        <h1>Tab 1</h1>
      </d-tab>
    </d-tab-container>`
});
export const Count = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-tab-container>
      <d-tab name="tab 1"  v-bind="$props" v-on="$props">
      <h1>Tab 1</h1>
      </d-tab>
      <d-tab name="tab 2" :count="0" v-on="$props">
        <h1>Tab 2</h1>
      </d-tab>
    </d-tab-container>`
});
Count.args = {
  count: 16
};

export const RemoveTabs = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      switchTabs: true
    };
  },
  template: `
    <div>
      <d-switch v-model="switchTabs"/>
      <d-tab-container v-bind="$props">
          <d-tab name="tab 1" :count="15" v-on="$props" :hidden="switchTabs">
            <h1>Tab 1</h1>
            <p>this is defined in a
            <code>
            <pre>
            &lt;d-tab name="tab 1" :count="15"&gt;
            ...
            &lt;/d-tab&gt;
            </pre>
            </code>
          </d-tab>
          <d-tab name="tab 2" :count="0" v-on="$props" :hidden="!switchTabs">
            <h1>Tab 2</h1>
          </d-tab>
          <d-tab name="tab 3" v-on="$props">
            <h1>Tab 3</h1>
          </d-tab>
      </d-tab-container>
    </div>`
});
