import colors from '@/colors.json';
import SelectComponent from '@/components/Select.vue';

export default {
  title: 'Controls/Forms/Select',
  component: SelectComponent,
  argTypes: {
    align: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end'],
      description: 'when the dropdown is longer than the element self, align in this direction.'
    },
    color: {
      control: 'select',
      options: colors
    }
  },
  args: {
    options: ['option_1', 'option_2', 'option_3']
  }
};

export const Select = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-select v-bind="$props" v-on="$props" v-model="value" />',
  data () {
    return {
      value: ''
    };
  }
});

export const ObjectAsOptions = Select.bind({});
ObjectAsOptions.args = {
  options: {
    option_1: 'Option 1',
    option_2: 'Option 2',
    option_3: 'Option 3'
  }
};

export const ComplexOptions = Select.bind({});
ComplexOptions.args = {
  field: 'label',
  options: {
    dutch: {
      label: 'Dutch language',
      icon: 'dutch-flag'
    },
    english: {
      label: 'English language',
      icon: 'English-flag'
    },
    unknown: {
      label: 'System language',
      icon: 'help-circle'
    }
  }
};

export const ItemSlot = (_, { argTypes }) => ({
  props: Object.keys(argTypes),

  template: `
  <d-select v-bind="$props" v-on="$props" v-model="value">
    <template #item="{ option }">
      <d-icon :name="option.icon" />  {{ option.label }}
    </template>
  </d-select>
  `,

  data () {
    return {
      value: ''
    };
  }
});
ItemSlot.args = {
  label: 'Change language',
  field: 'label',
  options: {
    dutch: {
      label: 'Dutch language',
      icon: 'dutch-flag'
    },
    english: {
      label: 'English language',
      icon: 'English-flag'
    },
    unknown: {
      label: 'System language',
      icon: 'help-circle'
    }
  }
};
