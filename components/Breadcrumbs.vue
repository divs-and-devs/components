<template>
  <ul class="breadcrumbs">
    <li>
      <a href="/">
        <d-icon name="home" color="shade-400" />
      </a>
    </li>
    <li v-for="(crumb, i) in crumbs" :key="crumb">
      <d-icon name="chevron-right" color="shade-400" />
      <a :href="getPath(i)">
        {{ parts[crumb] || crumb }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: undefined
    },

    parts: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    crumbs () {
      return (this.url ?? this.$route.path).split('/').filter(x => x);
    }
  },

  methods: {
    getPath (index) {
      return '/' + this.crumbs.slice(0, index + 1).join('/');
    }
  }
};
</script>

<style lang="scss" scoped>
  ul {
    @include flex(flex-start);

    gap: 0.5rem;
    list-style: none;
    font-size: 0.9rem;
    line-height: 1em;
    vertical-align: middle;

    li {
      display: inline-block;

      svg {
        margin-right: 0.5rem;
      }

      a {
        color: $shade-400;
        vertical-align: middle;

        &:hover {
          color: $primary;
        }
      }
    }
  }
</style>
