import UploadComponent from '@/components/Upload.vue';
export default {
  title: 'Controls/Forms/Upload',
  component: UploadComponent
};

export const Upload = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-upload v-bind="$props" v-on="$props" />
  `
});

export const Preview = Upload.bind({});
Preview.args = { preview: true, accept: 'image/*' };
