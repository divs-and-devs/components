import CarrouselComponent from '@/components/Carrousel.vue';

const images = new Array(25).fill('').map((x, i) => `https://picsum.photos/id/${Math.floor(i + Math.random() * 50)}/512/512`);
export default {
  title: 'Content/Layouts/Carrousel',
  component: CarrouselComponent,
  argTypes: {
    itemsPerView: {
      control: 'number'
    }
  },

  args: {
    items: images
  }
};

export const Carrousel = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
  <d-carrousel v-bind="$props" v-on="$props">
    <template #item="{ item }">
      <img :src="item" alt="image" />
    </template>
  </d-carrousel>`
});
