import PanelLayoutComponent from '@/components/PanelLayout.vue';

export default {
  title: 'Content/Layouts/Panel Layout',
  component: PanelLayoutComponent,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    align: {
      control: 'radio',
      options: ['left', 'right']
    }
  }
};

export const PanelLayout = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-panel-layout v-bind="$props" v-on="$props" style="height: 100vh;">
    <template #default>
      <h1>
        Main Content
      </h1>
      <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ipsam illum mollitia! Odit praesentium alias eos maxime expedita quaerat cupiditate vitae deserunt pariatur? Voluptates, officiis. Iusto nisi alias qui reprehenderit.
      </p>
    </template>
    <template #panel>
      <h2>Panel</h2>
    </template>
  </d-panel-layout>`
});
