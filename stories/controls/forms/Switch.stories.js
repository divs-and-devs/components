import colors from '@/colors.json';
import SwitchComponent from '@/components/Switch.vue';
export default {
  title: 'Controls/Forms/Switch',
  component: SwitchComponent,
  argTypes: {
    color: {
      control: 'select',
      options: colors
    },
    align: {
      control: 'radio',
      options: ['left', 'right']
    }
  }
};

export const Switch = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-switch v-bind="$props" v-on="$props">Enable daily-mail</d-switch>'
});

export const HtmlContent = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-switch v-bind="$props" v-on="$props">
      <h4>Receive newsletters</h4>
      <p>Keep updated about the latest news.</p>
    </d-switch>`
});

export const TruncateContent = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: false
    };
  },
  template: `
      <d-switch v-bind="$props" v-on="$props" v-model="value">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni, voluptatibus voluptatum nobis voluptas reprehenderit vero possimus est aliquid ad deleniti ipsa nam placeat neque! Veritatis quasi cupiditate necessitatibus distinctio.
      </d-switch>
      `
}); TruncateContent.args = { truncate: true };

export const NoContent = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-switch v-bind="$props" v-on="$props" />'
});

export const Small = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-switch v-bind="$props" v-on="$props">Receive newsletters</d-switch>'
});
Small.args = { small: true };
