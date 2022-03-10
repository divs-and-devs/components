<template>
  <div class="carrousel">
    <div class="header">
      <slot name="header">
        <h2>
          {{ name }}
        </h2>
      </slot>

      <div v-if="items && items.length > 2" class="arrows">
        <button @click="previous">
          <d-icon name="chevron-left" />
        </button>
        <button @click="next">
          <d-icon name="chevron-right" />
        </button>
      </div>
    </div>
    <sub v-if="!items || items.length == 0" class="carrousel">
      <slot name="empty">No {{ name.toLowerCase() }} found.</slot>
    </sub>
    <swiper
      ref="carrousel"
      auto-update
      auto-destroy
      :loop="loop"
      :options="options"
      grab-cursor
      class="swiper"
    >
      <swiper-slide v-for="item in items" :key="item.id || item">
        <slot name="item" :item="item" />
      </swiper-slide>
      <div v-if="paginator" slot="pagination" class="swiper-pagination" />
    </swiper>
  </div>
</template>

<script>
import 'swiper/css/swiper.min.css';
import { directive, Swiper, SwiperSlide } from 'vue-awesome-swiper';
export default {
  directives: { swiper: directive },
  components: { Swiper, SwiperSlide },

  props: {
    name: {
      type: String,
      default: 'items'
    },

    loop: {
      type: Boolean,
      default: false
    },

    paginator: {
      type: Boolean,
      default: false
    },

    itemsPerView: {
      type: [Number, String],
      default: 3
    },

    items: {
      type: Array,
      default: () => [],
      required: true
    }
  },

  data () {
    return {
      options: {
        autoHeight: true,
        grabCursor: true,
        loop: this.loop,
        slidesPerView: Number(this.itemsPerView) || 'auto',
        pagination: {
          enabled: this.paginator,
          el: '.swiper-pagination'
        }
      }
    };
  },

  methods: {
    next () {
      this.$refs.carrousel.$swiper.slideNext();
    },
    previous () {
      this.$refs.carrousel.$swiper.slidePrev();
    }
  }
};
</script>

<style lang="scss" scoped>
  .header {
    @include flex(space-between, center);

    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;

    h2 {
      flex: 1;
      margin-top: 1rem;
    }

    .arrows {
      white-space: nowrap;
      display: flex;
      justify-content: space-between;
      gap: 1rem;

      @include mobile {
        display: none;
      }

      > button {
        color: $primary;
        background-color: $shade-100;
        border: 1px solid $shade-300;
        font-size: 1.2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        text-align: center;
        height: 3rem;
        width: 3rem;
        border-radius: 3rem;
        border: none;

        &:disabled {
          color: $shade-500;
          pointer-events: none;
          cursor: pointer;
        }
      }
    }
  }

  .swiper-pagination::v-deep {
    bottom: 0.5rem;

    .swiper-pagination-bullet {
      opacity: 1;
      background: $shade-200;
      transition: background-color 250ms ease;

      &.swiper-pagination-bullet-active {
        background-color: $primary;
      }
    }
  }

  .swiper-slide {
    --container-padding: 1rem;
    width: auto;
  }
</style>
