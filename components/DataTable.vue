<template>
  <div
    class="data-table"
    :style="{ '--columnsAmount': columnAmount }"
    :class="{ usingActions }"
  >
    <!-- header for data table-->
    <div class="row header">
      <span
        v-for="column in columnsArray"
        :key="column"
        :class="{ sorting: sort.key == column }"
        :title="names[column] || column"
        @click="sortColumn(column)"
      >
        {{ names[column] || column }}

        <transition name="fade">
          <d-icon
            v-if="sort.key == column"
            name="chevron-down"
            :class="{ descending: sort.descending }"
          />
        </transition>
      </span>

      <!-- used for the actions -->
      <span v-if="usingActions" class="actions">
        <slot name="header-action">
          <div class="invisible">
            <slot name="actions" :row="{}" />
          </div>
        </slot>
      </span>
    </div>
    <transition name="fade" appear>
      <div v-if="!internalValue || internalValue.length == 0" class="empty">
        <slot name="empty">
          <h1>Geen resultaten.</h1>
          <p>Probeer opnieuw.</p>
        </slot>
      </div>

      <transition-group v-else-if="!sort.isSorting" name="fade" tag="div" class="data-rows">
        <div
          v-for="row in internalValue"
          :key="row[rowKey]"
          tabindex="0"
          class="row"
          @click="$emit('select', row)"
          @keypress.space.enter="$emit('select', row)"
        >
          <slot name="contextmenu" :row="row" />
          <!-- allow the user to override the row generation -->
          <slot name="row" :value="row" :columns="columnsArray">
            <span v-for="column in columnsArray" :key="row[rowKey] + column">
              <!-- allow the user to override the cell display -->
              <slot :name="column" :value="row[column]" :row="row">
                <template v-if="row[column] !== undefined">
                  {{ formatValue(row, column) }}
                </template>
                <div v-else class="empty">
                  <slot name="empty-slot">
                    <em>{{ emptyText || "-" }}</em>
                  </slot>
                </div>
              </slot>
            </span>
            <span v-if="usingActions">
              <slot name="actions" :row="row">
                <div class="invisible">
                  <slot name="header-action" />
                </div>
              </slot>
            </span>
          </slot>
        </div>
      </transition-group>
    </transition>
  </div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    columnCount: {
      type: [Number, String],
      default: undefined
    },
    columns: {
      type: [Array, String],
      default: undefined
    },
    columnOrder: {
      type: [Array, String],
      default: () => []
    },
    sortKey: {
      type: String,
      default: undefined
    },
    sortDirection: {
      type: String,
      validator: value => ['asc', 'desc'].includes(value),
      default: undefined
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    names: {
      type: Object,
      default: () => ({})
    },
    types: {
      type: Object,
      default: () => ({
        createdAt: Date
      })
    },
    hidden: {
      type: [String, Array],
      default: () => []
    },
    emptyText: {
      type: String,
      default: '-'
    }
  },

  data () {
    return {
      internalValue: [...this.value],
      sort: {
        clientSideSort: this.sortKey === undefined,
        isSorting: false,
        key: this.sortKey,
        descending: this.sortDirection === 'desc' ?? true
      }
    };
  },

  computed: {
    // this computed property checks if the actions slot is used.
    usingActions () {
      return !!this.$scopedSlots.actions || !!this.$slots['header-action'];
    },

    hiddenColumns () {
      if (typeof this.hidden === 'string')
        return this.hidden.split(' ');

      if (Array.isArray(this.hidden))
        return this.hidden;

      throw new Error('Could not determine hidden columns.');
    },

    columnOrdering () {
      let array = this.columnOrder;
      if (typeof this.columnOrder === 'string')
        array = this.columnOrder.split(' ');

      return array;
    },

    columnsArray () {
      if (this.columns !== undefined) {
        if (typeof this.columns === 'string')
          return this.columns.split(' ');

        return this.columns;
      }

      if (!this.internalValue || this.internalValue.length === 0) return [];

      return [
        ...new Set(
          this.internalValue
            .map(Object.keys)
            .flat()
            .filter(x => !this.hiddenColumns.includes(x))
        )
      ].sort((a, b) => {
        let c = this.columnOrdering.indexOf(a);
        let d = this.columnOrdering.indexOf(b);

        if (c < 0)
          c = 999;

        if (d < 0)
          d = 999;

        return c - d;
      });
    },

    columnAmount () {
      if (this.columnCount)
        return this.columnCount;

      return this.columnsArray.length;
    }
  },

  watch: {
    value: {
      deep: true,
      handler () {
        this.internalValue = [...this.value];

        if (this.sort.clientSideSort)
          return;

        this.sort.key = '';
        this.sort.descending = true;
      }
    },

    sortKey () {
      this.sort.key = this.sortKey;
      this.sort.clientSideSort = false;
    },

    sortDirection () {
      this.sort.descending = this.sortDirection === 'desc';
      this.sort.clientSideSort = false;
    }
  },
  methods: {
    async sortColumn (column) {
      if (this.sort.key === column)
        this.sort.descending = !this.sort.descending;

      this.sort.key = column;

      this.sort.isSorting = true;

      this.$emit('update:sort-key', this.sort.key);
      this.$emit(
        'update:sort-direction',
        !this.sort.descending ? 'asc' : 'desc'
      );

      if (!this.sort.clientSideSort) {
        this.sort.isSorting = false;
        return;
      }
      // wait a frame to allow the transition group to transition
      await this.$nextTick();

      this.internalValue = this.internalValue?.sort((a, b) => {
        if (this.sort.descending) {
          if (a[this.sort.key] === null || a[this.sort.key] === undefined) return 1;

          return a[this.sort.key] > b[this.sort.key] ? -1 : 1;
        }

        if (a[this.sort.key] === null || a[this.sort.key] === undefined) return -1;

        return b[this.sort.key] > a[this.sort.key] ? -1 : 1;
      });

      this.sort.isSorting = false;
    },

    formatValue (data, key) {
      const value = data[key];

      if (this.types[key]) {
        switch (this.types[key]) {
        case Date:
        case 'datetime':
        case 'time':
          return DateTime.fromJSDate(value).toLocaleString();
        }

        if (typeof this.types[key] === 'function')
          return this.types[key](value, data, key);
      }
      if (value === undefined)
        return '';

      return value;
    }
  }
};
</script>

<style lang="scss" scoped>
  .fade-move {
    transition: all 100ms ease;
  }

  .invisible {
    visibility: hidden;
    pointer-events: none;
    user-select: none;
  }

  .data-table {
    display: grid;
    gap: 0 0.5rem;
    grid-template-columns: var(--column-widths, repeat(var(--columns, var(--columnsAmount)), 1fr));
    margin: 1rem 0;
    border: 1px solid $shade-300;
    border-radius: 0.5rem;
    overflow: clip;
    background: $background;

    &.usingActions {
      grid-template-columns: var(--column-widths, repeat(var(--columns, var(--columnsAmount)), 1fr)) auto;
    }

    > .empty {
      grid-column: 1 / -1;
      text-align: center;
      padding: 5rem 0;
    }

    .data-rows {
      //this practically disables all layout on this element.
      display: contents;
      grid-template-columns: inherit;
      gap: inherit;
    }

    .row {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: inherit;
      gap: inherit;
      place-items: center start;
      user-select: none;
      outline: none;
      cursor: pointer;
      padding: 0.75rem 1.5rem;
      transition: background-color 250ms ease;

      &:hover {
        background-color: $shade-100;
      }

      &:focus-visible {
        outline: 2px solid $primary;
        outline-offset: 2px;
        border-radius: 8px;
      }

      span {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        text-align: left;
        padding: 0.25rem;
        color: $shade-500;

        &::v-deep strong {
          color: $text-color;
        }
      }

      &.header {
        color: $shade-500;
        background-color: unset;
        border-bottom: 1px solid $shade-300;
        padding: 0.5rem 1.5rem;
        height: 2rem;
        cursor: default;

        span {
          width: fit-content;
          font-weight: 700;
          cursor: pointer;
          transition: color 100ms ease, font-weight 100ms ease;

          &:hover {
            color: $text-color;
          }

          &::first-letter {
            text-transform: uppercase;
          }
        }

        span.actions {
          padding: 0;
        }

        span.sorting {
          color: $primary;
          font-weight: 700;

          svg {
            margin-left: 1rem;
            transition: transform 200ms ease;
            fill: currentColor;

            &.descending {
              transform: rotate(0.5turn);
            }
          }
        }
      }
    }
  }
</style>
