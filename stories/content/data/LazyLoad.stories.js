import LazyLoadComponent from '@/components/LazyLoad.vue';
export default {
  title: 'Content/Data/LazyLoad',
  component: LazyLoadComponent,
  argTypes: {
    threshold: {
      control: 'number'
    }
  }
};

export const LazyLoad = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    const items = [];
    return {
      items,
      page: 0
    };
  },
  mounted () {
    this.fetchNextPage();
  },
  methods: {
    fetchNextPage () {
      for (let i = 0; i < 100; i++)
        this.items.push({ id: this.items.length, description: `item ${this.items.length}` });
    }
  },
  template: `
    <div>
      <h1>
        this is a purely functional component, this loads an endless list.
      </h1>
      <p>Scroll down and look at the scrollbar</p>
      <hr>
      <strong>Loaded pages {{page}}</strong>
      <d-lazy-load v-bind="$props" v-model="items" :page.sync="page" @fetch="fetchNextPage">
          <template #item="{ item }">
              {{ item.description }}
          </template>
      </d-lazy-load>
    </div>`
});

LazyLoad.args = { screen: true };

export const RelativeToElement = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    const items = [];
    return {
      items,
      page: 0
    };
  },
  mounted () {
    this.fetchNextPage();
  },
  methods: {
    fetchNextPage () {
      for (let i = 0; i < 100; i++)
        this.items.push({ id: this.items.length, description: `item ${this.items.length}` });
    }
  },
  template: `
    <div>
      <h1>
        this is a purely functional component, this loads an endless list.
      </h1>
      <p>Scroll down and look at the scrollbar</p>
      <hr>
      <strong>Loaded pages {{page}}</strong>
      <d-lazy-load v-bind="$props" :page.sync="page" v-model="items" @fetch="fetchNextPage" style="max-height: 300px; overflow: auto;">
          <template #item="{ item }">
              {{ item.description }}
          </template>
      </d-lazy-load>
    </div>`
});
RelativeToElement.args = { screen: false };
