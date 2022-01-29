import colors from '@/colors.json';
import CheckboxComponent from '@/components/Checkbox.vue';

export default {
  title: 'Controls/Forms/Checkbox',
  component: CheckboxComponent,
  argTypes: {
    color: {
      control: 'select',
      options: colors
    }
  }

};

export const Checkbox = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-checkbox v-bind="$props" v-on="$props">Enable daily-mail</d-checkbox>'
});

export const NoContent = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: false
    };
  },
  template: `
    <p>
      This is a wild inline
      <d-checkbox v-bind="$props" v-on="$props" v-model="value"/>
      checkbox.
    </p>
  `
});

export const TruncateContent = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: false
    };
  },
  template: `
      <d-checkbox v-bind="$props" v-on="$props" v-model="value">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni, voluptatibus voluptatum nobis voluptas reprehenderit vero possimus est aliquid ad deleniti ipsa nam placeat neque! Veritatis quasi cupiditate necessitatibus distinctio.
      </d-checkbox>
      `
});
TruncateContent.args = { truncate: true };

export const ArrayAsValue = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: []
    };
  },
  template: `
    <div>
      <d-checkbox v-model="value" v-bind="$props" name="option_1" v-on="$props">Option 1</d-checkbox>
      <d-checkbox v-model="value" v-bind="$props" name="option_2" v-on="$props">Option 2</d-checkbox>
      <d-checkbox v-model="value" v-bind="$props" name="option_3" v-on="$props">Option 3</d-checkbox>
      <strong>value: {{value}}</strong>
    </div>`
});
