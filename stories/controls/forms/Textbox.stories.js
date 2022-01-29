import icons from '@/helpers/Icons.js';
import TextboxComponent from '@/components/Textbox.vue';

export default {
  title: 'Controls/Forms/Textbox',
  component: TextboxComponent,
  argTypes: {
    addonType: {
      control: 'radio',
      options: ['normal', 'panel']
    },

    addonAlign: {
      control: 'radio',
      options: ['left', 'right']
    },

    icon: {
      control: 'select',
      options: icons
    },
    placeholder: {
      control: 'text',
      table: {
        category: 'props'
      }
    }
  }
};

export const Textbox = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: ''
    };
  },
  template: '<d-textbox v-bind="$props" v-model="value"/>'
});

export const Password = Textbox.bind({});
Password.args = { type: 'password' };

export const Label = Textbox.bind({});
Label.args = { label: 'Firstname' };

export const Error = Textbox.bind({});
Error.args = { value: 'email@email@email.com', errorMessage: 'Dit is geen email.', type: 'email', label: 'Email' };

export const Autofill = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      username: '',
      password: ''
    };
  },
  template: `
  <form @submit.prevent>
    <d-textbox autocomplete="username" v-bind="$props" v-model="username" />
    <d-textbox type="password" autocomplete="password" v-bind="$props" v-model="password" />

    <d-button submit>Login</d-button>
  </form>`
});

export const InsideForm = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: 'test@gma'
    };
  },
  template: `
    <form @submit.prevent>
    <d-textbox v-bind="$props" v-model="value" />
    <d-button submit>Submit</d-button>
    </form>`
});

InsideForm.args = { required: true, type: 'email', label: 'Email' };

export const WithIcon = Textbox.bind({});
WithIcon.args = { icon: 'search' };

export const WithSelect = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: '61234567',
      prefix: ''
    };
  },
  template: `
      <d-textbox v-bind="$props" v-model="value">
        <d-select placeholder="prefix" :options="['+31', '+32', '+33', '+34']" v-model="prefix" />
      </d-textbox>`
});

export const WithButton = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: ''
    };
  },
  template: `
      <d-textbox v-bind="$props" v-model="value">
        <d-button>
          Okay
        </d-button>
      </d-textbox>`
});

export const WithMenu = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: ''
    };
  },
  template: `
      <d-textbox v-bind="$props" v-model="value">
        <d-menu>
          <d-action label="clear textfield"/>
          <d-action label="Autofill from" >
            <d-action icon="clipboard" label="clipboard" />
            <d-action icon="file" label="file" />
            <d-action icon="overflow-horizontal" label="other" />
          </d-action>
        </d-menu>
      </d-textbox>`
});
