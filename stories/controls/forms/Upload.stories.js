import UploadComponent from '@/components/Upload.vue';
export default {
  title: 'Controls/Forms/Upload',
  component: UploadComponent,
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    }
  },
  args: {
    size: 'large'
  }
};

export const Upload = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-upload v-bind="$props" v-on="$props" />
  `
});

export const Preview = Upload.bind({});
Preview.args = { preview: true, accept: 'image/*' };
