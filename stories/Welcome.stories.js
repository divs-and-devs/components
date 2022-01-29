export default {
  title: 'Welcome',
  parameters: {
    controls: { hideNoControlsWarning: true }
  }
};

export const Welcome = () => ({
  template: /* html */`
    <d-container center>
      <img src="/logo_512.png" width="50%" style="margin: 2.5rem">
      <h1>Welcome to the Divs &amp; devs storybook!</h1>

      <p>Press <kbd>/</kbd> to search for a specific component.</p>
    </d-container>
  `
});
