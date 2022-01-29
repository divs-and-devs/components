import AutoCompleteComponent from '@/components/AutoComplete.vue';

export default {
  title: 'Controls/Forms/Auto Complete',
  component: AutoCompleteComponent
};

export const AutoComplete = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: ''
    };
  },
  template: '<d-auto-complete v-bind="$props" v-on="$props" v-model="value" />'
});

export const UsingUrl = AutoComplete.bind({});

UsingUrl.args = {
  url: 'https://api.publicapis.org/entries?title={q}',
  field: 'API',
  id: 'Link'
};
export const UsingSlot = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: ''
    };
  },
  template: `<div>
    {{ value }}
    <d-auto-complete v-bind="$props" v-on="$props" v-model="value">
      <template v-slot="{ item }">
        <div class="flex">
          <div>
            <p><strong>{{ item.API }}</strong> <em>({{ item.Category }})</em></p>
            <p>{{ item.Description }}.</p>
          </div>
        </div>
      </template>
    </d-auto-complete>
    </div>`
});
UsingSlot.args = {
  url: 'https://api.publicapis.org/entries?title={q}',
  field: 'API'
};

export const UsingData = AutoComplete.bind({});
UsingData.args = {
  field: 'names.name',
  threshold: 0,
  datasource: [
    {
      id: '1',
      names: {
        name: 'id 1'
      }
    },
    {
      id: '2',
      names: {
        name: 'id 2'
      }
    },
    {
      id: '3',
      names: {
        name: 'id 3'
      }
    }
  ]
};

export const UsingFunction = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: ''
    };
  },
  template: `<div>
    <p>This component uses this function:
    <kbd>
      fetch(value) {<br>
        return ["empty", ...value.split('').map(x=>({name: x})), value];<br>
      }
    </kbd>
    {{ value }}
    <d-auto-complete v-bind="$props" v-on="$props" v-model="value"/>
    </div>`
});
UsingFunction.args = {
  field: 'name',
  threshold: 0,
  debounce: 0,
  fetch (value) {
    return [{ name: 'empty' }, ...value.split('').map(x => ({ name: x })), { name: value ?? 'onbekend' }];
  }
};

export const CreateNew = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: '',
      data: [
        {
          id: '1',
          names: {
            name: 'id 1'
          }
        },
        {
          id: '2',
          names: {
            name: 'id 2'
          }
        },
        {
          id: '3',
          names: {
            name: 'id 3'
          }
        }
      ]
    };
  },
  methods: {
    create (option) {
      this.$toast(JSON.stringify(option));
      option.id = this.data.length + 1;
      this.value = option.names.name;
      this.data.unshift(option);
    }
  },
  template: `<div>
    <p>This component allows unknown values. Don't forget to add a unique id to the option object and set it as the current value.</p>
    <d-auto-complete v-bind="$props" v-on="$props" v-model="value" @create="create" :datasource="data" />

    <ul>
      <li
        v-for="option in data"
        :key="data.id"
        style="border-bottom: 2px solid #f1f2f3; padding: 0.5rem 0;"
      >
        <p>Name: {{ option.names.name }}</p>
        <p>ID: {{ option.id }}</p>
      </li>
    </ul>
    </div>`
});
CreateNew.args = {
  field: 'names.name',
  threshold: 0,
  createNew: true
};

export const inAForm = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: '',
      isRequired: false,
      data: [
        {
          id: '1',
          names: {
            name: 'id 1'
          }
        },
        {
          id: '2',
          names: {
            name: 'id 2'
          }
        },
        {
          id: '3',
          names: {
            name: 'id 3'
          }
        }
      ]
    };
  },
  template: `<div>
    <p>The component acts as a invalid form element when no item is selected from the suggested list.</p>
    <form @submit.prevent="$toast('submitted with value ' + value)">
      <d-auto-complete v-bind="$props" v-on="$props" v-model="value" @create="create" :datasource="data" :required="isRequired" />
      <d-checkbox v-model="isRequired" reversed>Auto-complete is required</d-checkbox>

      <d-button submit>Submit</d-button>
    </form>
    </div>`
});

inAForm.args = {
  field: 'names.name',
  threshold: 0,
  createNew: true
};
