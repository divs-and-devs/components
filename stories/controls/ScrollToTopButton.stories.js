import scrollToTopButton from '@/components/ScrollToTopButton.vue';
export default {
  title: 'Controls/Scroll to top button',
  component: scrollToTopButton,
  parameters: {
    layout: 'fullscreen'
  }
};

export const Default = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
      <d-container screen center>
        <h1><d-icon name="arrow-down" /> Scroll down <d-icon name="arrow-down" /></h1>
        <d-scroll-to-top-button />
      </d-container>
      <d-container screen center background="warning">
        <h1>
          Look here.
          <d-icon name="arrow-down-right" size="2.5" />
        </h1>
      </d-container>
    </div>
  `
});
