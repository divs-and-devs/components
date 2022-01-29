
export default {
  title: 'Helpers/Keybind',
  controls: { hideNoControlsWarning: true }
};

export const Keybind = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-container>
      <p>This is a vue directive that helps to focus elements based on a keybind.</p>
      <p>For example</p>
      <code>
      <pre>
      &lt;d-textbox v-keybind.ctrl.slash placeholder="Press ctrl+/" /&gt;
      </pre>
      </code>
      <p>Try it out, press <kbd>ctrl</kbd> + <kbd>space</kbd>!</p>
      <d-textbox v-keybind.ctrl.space placeholder="Press ctrl+space"/>
    </d-container>`
});

export const HelpShortcut = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-container>
      <p>There is a helper shortcut, <kbd>F1</kbd>, press this to see an overlay of all available keys.</p>
      <d-button v-keybind.space>space</d-button>
      <d-button v-keybind.backspace>backspace</d-button>
      <d-button v-keybind.left>left arrow</d-button>
      <d-button v-keybind.right>right arrow</d-button>
      <d-button v-keybind.up>up arrow</d-button>
      <d-button v-keybind.down>down arrow</d-button>
      <d-button v-keybind.meta>meta</d-button>
      <d-button v-keybind.alt>alt</d-button>
      <d-button v-keybind.ctrl>ctrl</d-button>
      <d-button v-keybind.shift>ctrl</d-button>
      <d-button v-keybind.pageup>page up</d-button>
      <d-button v-keybind.pagedown>page down</d-button>
      <d-button v-keybind.enter>enter</d-button>
      <d-button v-keybind.tab>tab</d-button>
      <d-button v-keybind.semicolon>semicolon</d-button>
      <d-button v-keybind.pipe>pipe</d-button>
      <d-button v-keybind.escape>escape</d-button>
      <d-button v-keybind.capslock>capslock</d-button>
      </d-container>`
});
export const WithoutModifiers = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-container>
      <p>This is a vue directive that helps to focus elements based on a keybind.</p>
      <p>For example</p>
      <code class="block">
      <pre>
      &lt;d-textbox v-keybind.space placeholder="Press space" /&gt;
      </pre>
      </code>
      <p>Try it out, press <kbd>space</kbd>!</p>
      <d-textbox v-keybind.space placeholder="Press space"/>
    </d-container>`
});

export const AllModifiers = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-container>
      <p>This is a vue directive that helps to focus elements based on a keybind.</p>
      <p>For example</p>
      <code class="block">
      <pre>
      &lt;d-textbox v-keybind.ctrl.shift.meta.alt.s placeholder="Press ctrl+shift+s" /&gt;
      </pre>
      </code>
      <p>Try it out, press <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>meta</kbd>+ <kbd>alt</kbd>+ <kbd>s</kbd>!</p>
      <d-textbox v-keybind.ctrl.shift.meta.alt.s placeholder="Press ctrl+shift+s"/>
    </d-container>
  `
});

export const DynamicKey = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-container>
      <p>This is a vue directive that helps to focus elements based on a keybind.</p>
      <p>For example</p>
      <code class="block">
      <pre>
      &lt;d-textbox v-keybind.ctrl:[dynamickey] :placeholder="\`Press ctrl+\${dynamickey}\`" /&gt;
      </pre>
      </code>
      <p>Try it out, press <kbd>ctrl</kbd> + <kbd>{{dynamickey}}</kbd>!</p>
      <d-textbox v-keybind:[dynamickey].ctrl :placeholder="\`Press ctrl+\${dynamickey}\`"/>
    </d-container>
  `
});
DynamicKey.args = {
  dynamickey: '1'
};

export const OnAButton = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: {
    click () {
      this.$toast({ title: 'saved, or at least it will be.' });
    }
  },
  template: `
    <d-container>
      <p>This is a vue directive that helps to click elements based on a keybind.</p>
      <p>For example</p>
      <code class="block">
      <pre>
      &lt;d-button v-keybind.ctrl.1 @click="click" &gt;Click me or press ctrl+1&lt;/d-button&gt;
      </pre>
      </code>
      <p>Try it out, press <kbd>ctrl</kbd> + <kbd>1</kbd>!</p>
      <d-button v-keybind.ctrl.1 @click="click">Click me or press ctrl+1</d-button>
      <d-textbox />
    </d-container>`
});

export const CustomComponentSupport = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: {
    click () {
      this.$toast({ title: 'saved, or at least it will be.' });
    }
  },
  template: `
    <d-container>
      <p>Components that resolve to buttons or inputs don't need any extra attention. If your component doesn't have that you can implement a click or focus method.</p>
      <code class="block">
      <pre>
        methods: {
          focus() {
            // this will trigger when there isn't a click handler.
            this.$refs.inputElement.focus();
          },

          click() {
            // this handler has the highest priority, use this to execute an action, like saving a form.code
            this.$axios.$post("/update", this.formData);
          }
        }
      </pre>
      </code>
      </d-container>
    `
});
