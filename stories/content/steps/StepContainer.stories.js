import colors from '@/colors.json';
import StepContainerComponent from '@/components/steps/StepContainer.vue';

export default {
  title: 'Content/Step Container',
  component: StepContainerComponent,
  argTypes: {
    color: {
      control: 'select',
      options: colors
    }
  }
};

export const StepContainer = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-step-container v-bind="$props">
    <d-step>
      Step 1
    </d-step>
    <d-step>
      Step 2
    </d-step>
    <d-step>
      Step 3
    </d-step>
  </d-step-container>
  `
});
