import MultiSelectComponent from '@/components/MultiSelect.vue';
export default {
  title: 'Controls/Forms/Multi select',
  component: MultiSelectComponent
};

export const MultiSelect = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: []
    };
  },
  template: '<d-multi-select v-bind="$props" v-on="$props" v-model="value"/>'
});

export const AutocompleteUrl = MultiSelect.bind({});
AutocompleteUrl.args = {
  autoCompleteUrl: 'https://api.publicapis.org/entries?title={q}',
  field: 'API'
};

export const Autocomplete = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: []
    };
  },
  template: `
      <d-multi-select v-bind="$props" v-on="$props" v-model="value" />
    `
});

Autocomplete.args = {
  label: 'hello',
  autoComplete: {
    1: 'value 1',
    2: 'value 2',
    3: 'value 3',
    4: 'value 4',
    5: 'value 5',
    11: 'test 1',
    12: 'test 2',
    13: 'test 3',
    14: 'test 4',
    15: 'test 5'
  }
};
