import TextAreaComponent from '@/components/TextArea.vue';
export default {
  title: 'Controls/Forms/Text area',
  component: TextAreaComponent,
  argTypes: {
    required: {
      control: 'boolean'
    }
  }
};

export const TextArea = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: ''
    };
  },
  template: '<d-text-area v-bind="$props" v-on="$props" v-model="value"/>'
});

export const Label = TextArea.bind({});
Label.args = { label: 'Notes' };

export const Disabled = TextArea.bind({});
Disabled.args = { label: 'Notes', disabled: true };

export const Error = TextArea.bind({});
Error.args = { error: true, label: 'Notes' };

export const LimitCharacters = TextArea.bind({});
LimitCharacters.args = { max: 100 };
