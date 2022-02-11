import MasonryComponent from '@/components/Masonry.vue';

const value = [];
for (let i = 0; i < 100; i++)
  value.push(`test ${i}`);

export default {
  title: 'Content/Layouts/Masonry',
  component: MasonryComponent,
  argTypes: {
    gap: {
      control: 'text'
    },
    width: {
      control: 'text'
    }
  },
  args: {
    value
  }
};
export const Masonry = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<d-masonry v-bind="$props" v-on="$props" v-model="value">
        <template #default="{ value }">
            <d-skeleton type="box" :height="(Math.random() * 500 + 100) + 'px'" ></d-skeleton>
        </template>
    </d-masonry>`
});

export const FixedWidthColumns = Masonry.bind({});

FixedWidthColumns.args = { width: '200px' };
