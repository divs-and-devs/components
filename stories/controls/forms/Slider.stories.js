import colors from '@/colors.json';
import SliderComponent from '@/components/Slider.vue';
export default {
  title: 'Controls/Forms/Slider',
  component: SliderComponent,
  argTypes: {
    color: {
      control: 'select',
      options: colors
    },
    type: {
      control: 'inline-radio',
      options: ['percentage', 'points']
    },
    label: {
      control: 'text'
    }
  }
};

export const Slider = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: 0
    };
  },
  template: `
      <div>
        <d-slider v-bind="$props" v-model="value" v-on="$props"/>
        {{ value }}
      </div>
      `
});

export const Points = Slider.bind({});
Points.args = { type: 'points', min: 25, max: 200 };
