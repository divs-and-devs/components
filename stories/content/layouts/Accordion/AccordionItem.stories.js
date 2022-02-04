
import AccordionItemComponent from '@/components/accordion/AccordionItem.vue';

export default {
  title: 'Content/Layouts/Accordion/Item',
  component: AccordionItemComponent,
  argTypes: {
    verticalPadding: {
      control: 'number'
    }
  },
  args: {
    name: 'Item 1'
  }
};

export const Item = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-accordion>
    <d-accordion-item v-bind="$props" v-on="$props">
      Hello
    </d-accordion-item>
  </d-accordion>`
});
