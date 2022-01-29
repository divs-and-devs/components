import DataTableComponent from '@/components/DataTable.vue';

const names = ['Roy', 'Daan', 'David', 'Tim', 'Tom', 'Sandra', 'Cindy'];
const value = [];
for (let i = 0; i <= 10; i++) {
  const createdAt = new Date();
  createdAt.setMonth(i % 12);
  value.push({
    id: i,
    name: `test ${i}`,
    createdBy: names[Math.floor(Math.random() * names.length)],
    createdAt
  });
}

export default {
  title: 'content/Data/Data table',
  component: DataTableComponent,
  args: {
    value
  }
};

export const DataTable = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<d-data-table v-bind="$props" v-on="$props" v-model="value" />'
});

export const ColumnNames = DataTable.bind({});
ColumnNames.args = {
  names: {
    id: 'Unique identifier',
    name: 'Article name',
    createdBy: 'Written by',
    createdAt: 'Created on'
  }
};

export const Actions = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
        <d-data-table v-bind="$props" v-on="$props" v-model="value">
            <template #actions>
                <d-button type="link" icon="trash" />
            </template>
        </d-data-table>`
});

export const ColumnTypes = DataTable.bind({});
ColumnTypes.args = {
  types: {
    createdAt: Date,
    createdBy: (value, data, key) => [...value].reverse().join('')
  }
};

export const HideColumns = DataTable.bind({});
HideColumns.args = {
  hidden: 'id createdAt'
};

export const ReorderColumns = DataTable.bind({});
ReorderColumns.args = {
  columnOrder: 'createdAt name createdBy'
};

export const ColumnDisplay = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-data-table v-bind="$props" v-on="$props" v-model="value">
      <template #createdBy="{value, row}">
        <img :src="\`https://i.pravatar.cc/64?u=\${row.id}\`">
      </template>
    </d-data-table>`
});
ColumnDisplay.args = {
  columnOrder: 'createdAt name createdBy'
};

export const ServerSideSort = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      serverSortKey: 'name',
      serverSortDirection: 'desc'
    };
  },
  template: `
    <div>
      <p>Sorting on <strong>{{serverSortKey}}</strong> in <strong>{{serverSortDirection}}</strong> order.</p>
      <d-data-table v-bind="$props" v-on="$props" v-model="value" :sort-key.sync="serverSortKey" :sort-direction.sync="serverSortDirection"/>
    </div>`
});

export const CustomEmptyState = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-data-table v-bind="$props" v-on="$props" :value="[]" columns="id name createdBy createdAt">
      <template #empty>
        <d-icon name="wind" size="5"/>
        <h1>No data found in the nearby galaxies.</h1>
        <p>Please don't try again, there is no data.</p>
      </template>
    </d-data-table>
    `
});

export const ContextMenu = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <d-data-table v-bind="$props" v-on="$props" :value="value" columns="id name createdBy createdAt">
      <template #contextmenu>
        <d-context-menu>
          <d-menu-item label="inspect" icon="eye" />
          <d-menu-item label="edit" icon="edit" />
          <d-menu-item label="Delete" type="delete" icon="trash" />
        </d-context-menu>
      </template>
    </d-data-table>
    `
});
