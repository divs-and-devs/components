import WindowComponent from '@/components/Window.vue';

export default {
  title: 'Content/Overlays/Window',
  component: WindowComponent
};

export const Window = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-window v-bind="$props" v-on="$props"></d-window>
  `
});

export const WithContent = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
        <h1>Page content</h1>
        <d-button>A wild button appeared</d-button>
        <d-window v-bind="$props" v-on="$props">
            <template #default>
                <h1>This is the Main content slot</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                 Minima laboriosam doloremque soluta adipisci sapiente! Illum eligendi provident quidem nemo excepturi rerum,
                 dolor vitae dolorem, illo culpa vero nobis in. Perspiciatis?
                </p>
                <br>
                <p>
                    Listen for the <kbd>close</kbd> event to close this window.
                </p>
            </template>
            <template #footer>
                <p>This is the footer slot, here you can add buttons, stats or something else.</p>
                <d-button>Okay</d-button>
            </template>
        </atura-window>
    </template>
    `
});
WithContent.args = { title: 'A beautiful title' };
