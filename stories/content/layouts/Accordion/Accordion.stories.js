import AccordionComponent from '@/components/accordion/Accordion.vue';
import AccordionItemComponent from '@/components/accordion/AccordionItem.vue';

export default {
  title: 'Content/Layouts/Accordion',
  component: AccordionComponent,
  parameters: {
    layout: 'fullscreen'
  },
  subcomponents: { AccordionItemComponent }
};

export const Accordion = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-container screen>
    <d-accordion v-bind="$props" v-on="$props">
      <d-accordion-item name="Item 1">
        <h1>Hello</h1>
        <p>This is the first accordion item you encounter.</p>
        <p>It gets a whole lot wilder in the next item.</p>
      </d-accordion-item>
      <d-accordion-item name="Item 2">
        <h2>I was just joking</h2>
        <p>but don't look into item 3, creepy things happen there.</p>
      </d-accordion-item>
      <d-accordion-item name="Item 3" vertical-padding="0">
        <d-container background="error" center screen>
          <d-icon name="alert-circle" size="4" color="error-shade" />
          <h3>Damn, you did it anyway.</h3>
          <p>Well, hello. 👋.</p>
        </d-container>
      </d-accordion-item>
    </d-accordion>
  </d-container>
  `
});
