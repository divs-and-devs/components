import colors from '@/colors.json';
import icons from '@/helpers/Icons.js';
import tagComponent from '@/components/Tag.vue';
export default {
  title: 'Content/Tag',
  component: tagComponent,

  argTypes: {
    color: {
      control: 'select',
      options: colors
    },
    icon: {
      control: 'select',
      options: icons
    }
  }
};

export const Tag = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-tag v-bind="$props" v-on="$props">Fishsticks</d-tag>'
});

export const RemovableTag = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-tag v-bind="$props" v-on="$props">Fishsticks</d-tag>'
});
RemovableTag.args = { removable: true };

export const Icon = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-tag v-bind="$props" v-on="$props">the_answer_of_everything.pdf</d-tag>'
});

Icon.args = { icon: 'file-text' };

export const IconAndRemovable = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-tag v-bind="$props" v-on="$props">the_answer_of_everything.pdf</d-tag>'
});
IconAndRemovable.args = { icon: 'file-text', removable: true };
