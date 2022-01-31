<template>
  <span
    :class="['tag', color, { removable, icon: !!icon }]"
    @click.stop="!removable && $emit('click')"
  >
    <span v-if="icon !== ''" class="icon">
      <d-icon :filled="filled" :name="icon" />
    </span>
    <span v-if="removable" class="remove-icon" @click.stop="$emit('click')">
      <d-icon name="x" />
    </span>
    <span class="content">
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  props: {
    removable: {
      type: Boolean,
      required: false
    },
    icon: {
      type: String,
      default: '',
      required: false
    },

    color: {
      type: String,
      default: 'primary-fade',
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: $body-font, sans-serif;
  border-radius: $border-radius * 9999;
  user-select: none;
  vertical-align: middle;
  margin: 0.25rem;
  padding: 0.25rem 0.75rem;
  height: 1.5rem;
  word-break: break-word;
  transition: background-color 250ms ease, color 250ms ease, opacity 250ms ease;

  &.removable {
    position: relative;
    max-width: 100%;
    padding-left: 1.75rem;
    transition: background-color 200ms ease;
    cursor: pointer;

    &:hover {
      background-color: var(--hover);
    }

    &.icon {
      padding-left: 1rem;
      padding-right: 2.25rem;

      > .remove-icon {
        right: 1rem;
        left: unset;
      }
    }

    > .remove-icon {
      cursor: pointer;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0.5rem;
    }
  }

  span:not(.content) {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
  }

  .content {
    a {
      text-decoration: underline;
      cursor: pointer;
      color: inherit;

      &:hover {
        color: var(--hover);
      }
    }
  }

  > .icon {
    display: inline-block;
    margin-right: 0.5rem;
    font-size: 1.25rem;
  }

  @include text-color;
  @include colors();
  @include fade-colors(--hover);
}
</style>
