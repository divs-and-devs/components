import SkeletonComponent from '@/components/Skeleton.vue';

export default {
  title: 'Content/Skeleton',
  component: SkeletonComponent,

  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'box', 'circle']
    },
    tag: {
      control: 'select',
      options: ['p', 'span', 'div', 'article']
    },
    minCharacters: {
      control: 'number'
    },

    maxCharacters: {
      control: 'number'
    },

    size: {
      control: 'number'
    },

    width: {
      control: 'text'
    },

    height: {
      control: 'text'
    }
  }
};

export const Skeleton = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-skeleton v-bind="$props" />
  `
});

export const Text = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-skeleton v-bind="$props"/>'
});

Text.args = { type: 'text' };

export const Box = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-skeleton v-bind="$props"/>
  `
});

Box.args = { type: 'box' };

export const Circle = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-skeleton v-bind="$props"/>
  `
});
Circle.args = { type: 'circle' };

export const Layered = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-skeleton v-bind="$props" type="box" width="300px" height="120px" style="padding: 1rem">
      <d-skeleton type="circle" size="4" /><br>

      <d-skeleton type="text" max-characters="40" style="line-height: 1.5"/>
    </d-skeleton>
  `
});
Circle.args = { type: 'circle' };
