<template>
  <transition name="fade">
    <button
      v-show="visible"
      tabindex="0"
      aria-hidden="true"
      @click="scrollToTop"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 3L19 3"
          stroke="white"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17 14L12 9L7 14"
          stroke="white"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 9L12 21"
          stroke="white"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    };
  },
  mounted () {
    if (!process.browser) return;

    window.addEventListener(
      'scroll',
      () => (this.visible = window.scrollY > window.innerHeight / 2),
      { passive: true }
    );
  },
  methods: {
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  padding: 16px;
  background-color: $primary;
  color: $primary-text;
  border: none;
  border-radius: $border-radius * 500;
  font-size: 2rem;
  box-shadow: $shadow;
  display: flex;

  &:hover {
    background-color: $primary-shade;
  }
}
</style>
