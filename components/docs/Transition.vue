<template>
  <article>
    <header>
      <strong>{{ transition }}</strong>
      <d-switch v-model="toggle" small color="secondary" />
    </header>
    <main>
      <transition :name="transition">
        <div v-if="toggle" class="sample" />
      </transition>
    </main>
    <footer>
      <d-button
        v-tooltip="'Copy to clipboard'"
        icon="clipboard"
        type="secondary"
        @click="copy"
      />
    </footer>
  </article>
</template>

<script>
export default {
  props: {
    transition: {
      type: String,
      default: 'fade'
    }
  },
  data () {
    return {
      toggle: true
    };
  },

  methods: {
    copy () {
      navigator.clipboard.writeText(`
        <transition name="${this.transition}" mode="out-in">

        </transition>`);

      this.$toast({
        title: 'Copied transition tag.',
        subtitle: 'Transition tag copied to clipboard',
        icon: 'clipboard'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  article {
    display: flex;
    flex-direction: column;
    min-width: 5rem;
    border: 1px solid $shade-100;
    box-shadow: $shadow-small;
    background-color: $shade-100;
    border-radius: $border-radius;
    overflow: hidden;
    margin: 1rem;

    header {
      padding: 0.5rem;
      background-color: $shade-200;

      > .switch {
        margin: 0.5rem;
      }

      @include flex(space-between);
    }

    footer {
      background-color: $shade-300;

      @include flex(flex-end);
    }

    main {
      @include flex;
      padding: 1rem;
      overflow: hidden;
      flex: 1;
    }

    .sample {
      background-color: $error;
      height: 2rem;
      width: 2rem;
      border-radius: 2rem;
    }
  }
</style>
