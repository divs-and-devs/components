import colors from '@/colors.json';
import RadioComponent from '@/components/Radio.vue';
export default {
  title: 'Controls/Forms/Radio',
  component: RadioComponent,
  argTypes: {
    color: {
      control: 'select',
      options: colors
    },

    direction: {
      control: 'radio',
      options: ['inline', 'block']
    }
  },
  args: {
    options: {
      option1: 'Label for option 1',
      option2: 'Label for option 2'
    }
  }
};

export const Radio = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: ''
    };
  },
  template: `
      <div>
        <d-radio v-bind="$props" v-model="value" v-on="$props">Enable daily-mail</d-radio>
        <strong>Value: {{value}}</strong>
      </div>
      `
});

export const Block = Radio.bind({});

Block.args = { direction: 'block' };

export const Inline = Radio.bind({});

Inline.args = { direction: 'inline' };
