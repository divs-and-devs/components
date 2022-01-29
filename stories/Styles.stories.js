const colors = require('../colors.json');

export default {
  title: 'Styles',
  parameters: {
    controls: { hideNoControlsWarning: true }
  },
  args: {}
};

export const Colors = () => ({
  data () {
    return {
      colors
    };
  },
  template: `
  <div>
    <d-swatch v-for="color in colors" :key="color" :color="color" />
  </div>`
});

export const typography = () => ({
  template: `
  <div>
    <h1>Header 1</h1>
    <h2>Header 2</h2>
    <h3>Header 3</h3>
    <h4>Header 4</h4>
    <p>Paragraph</p><br>
    <p><strong>Bold</strong></p><br>
    <p><sub>Subtext</sub></p><br>
    <p><em>Cursive</em></p><br>
    <p class="error">Error</p><br>
    <p><a href="https://google.com" target="_blanK">Link</a></p><br>
    <p>A kbd element <kbd>ctrl</kbd> + <kbd>c</kbd> or <kbd>⌘</kbd> + <kbd>c</kbd></p><br>
    <p>A code element <code>&lt;p&gt;Hello&lt;/p&gt;</code></p><br>
    <p>A block code element <code class="block">&lt;p&gt;Hello&lt;/p&gt;</code></p><br>
    <hr>
  </div>`
});

export const mediaQueries = () => ({
  template: `
  <div>
    <p style="margin: 2rem 0;">desktop</p>
    <div style="padding: 2rem 0.5rem; box-sizing: border-box; min-height: 500px; width: 1440px; background-color: var(--shade-200);">
      <p style="margin-bottom: 2rem">notebook</p>
      <div style="padding: 2rem 0.5rem; box-sizing: border-box; min-height: 500px; width: 1024px; background-color: var(--shade-400);">
        <p style="margin-bottom: 2rem">tablet</p>
        <div style="padding: 2rem 0.5rem; box-sizing: border-box; min-height: 500px; width: 800px; background-color: var(--shade-600);">
          <p style="margin-bottom: 2rem">mobile</p>
        </div>
      </div>
    </div>
  </div>`
});

export const shadow = () => ({
  data () {
    return {
      shadows: ['drop-shadow', 'drop-shadow-small']
    };
  },
  template: `
  <div>
    <d-swatch v-for="shadow in shadows" :key="shadow" :shadow="shadow" />
  </div>`
});

export const transitions = () => ({
  data () {
    return {
      transitions: ['fade', 'slide-right', 'slide-left', 'slide-horizontal', 'slide-horizontal-reverse', 'fade-up', 'fade-down', 'fade-left', 'fade-right']
    };
  },
  template: `
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));">
    <d-transition v-for="transition in transitions" :key="transition" :transition="transition" />
  </div>`
});
