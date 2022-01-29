import icons from '@/helpers/Icons.js';
import ToastComponent from '@/components/Toast.vue';
export default {
  title: 'Content/Alerts/Toast',
  component: ToastComponent,
  argTypes: {
    icon: {
      type: 'select',
      options: icons
    }
  }
};

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-toast v-bind="$props" v-on="$props" />'
});

export const Toast = Template.bind({});
Toast.args = { title: 'Saved changes.' };

export const Subtitle = Template.bind({});
Subtitle.args = { title: 'Something went wrong while saving.', subtitle: "Couldn't connect with the server (connection timed out)." };

export const Action = Template.bind({});
Action.args = { title: 'Something went wrong while saving.', subtitle: "Couldn't connect with the server (connection timed out).", action: 'retry' };

export const Icon = Template.bind({});
Icon.args = { title: 'Something went wrong while saving.', subtitle: "Couldn't connect with the server (connection timed out).", action: 'retry', icon: 'alert-triangle' };

export const ProgramaticAccess = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      result: undefined
    };
  },
  methods: {
    async toast () {
      this.result = await this.$toast({ title: 'I\'m triggered using code.', subtitle: 'I feel like Neo 🕶💻.', action: 'take the blue pill' });
    }
  },
  template: `
    <div>
      <d-button @click="toast">Open toast</d-button>
      <pre>
      <code class="block">
      const result = await this.$toast({title: "I'm triggered using code.", subtitle: 'I feel like Neo 🕶💻.', action: 'take the blue pill'});
      </code>
      </pre>
      <p v-if="result !== undefined">
        Toast is closed with result <strong>{{result}}</strong>
      </p>
    </div>
    `
});

export const StickyProgramatic = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      result: undefined
    };
  },
  methods: {
    async toast () {
      this.result = await this.$toast({
        title: 'hello there!',
        subtitle: 'This toast is here to stay.',
        action: 'close anyway',
        delay: 0,
        icon: 'compass'
      });
    }
  },
  template: `
    <div>
      <d-button @click="toast">Open toast</d-button>
      <pre>
      <code class="block">
      const result = await this.$toast({
        title: 'hello there!',
        subtitle: 'This toast is here to stay.',
        action: 'close anyway',
        delay: 0,
        icon: 'compass'
      });
      </code>
      </pre>
      <p v-if="result !== undefined">
        Toast is closed with result <strong>{{result}}</strong>
      </p>
    </div>
    `
});

export const ErrorState = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: {
    async toast () {
      if (await this.$toast({
        title: 'Something went terribly wrong!',
        subtitle: 'Only use this state when something went so wrong that the application becomes unusable.',
        delay: 0,
        icon: 'alert-circle',
        action: 'reload page',
        error: true
      }))
        location.reload();
    }
  },
  template: `
    <div>
      <d-button @click="toast">Open toast</d-button>
      <pre>
      <code class="block">
        this.result = await this.$toast({
          title: 'Something went terribly wrong!',
          subtitle: 'Only use this state when something went so wrong that the application becomes unusable.',
          delay: 0,
          icon: 'alert-circle',
          action: 'reload page',
          error: true
        });
      </code>
      </pre>
    </div>
    `
});
