import Vue from 'vue';
import toast from '../components/Toast.vue';

export default (_, inject) => {
  if (process.browser)

    inject('toast', async (options) => {
      const component = new (Vue.extend(toast))({ propsData: { show: false } });

      component.$mount();
      document.body.appendChild(component.$el);
      const result = await component.open(options);
      component.$el.addEventListener('transitionend', () => component.$el.remove());
      Vue.set(component.internalValues, 'show', false);

      return result;
    });

  // eslint-disable-next-line no-console
  else inject('toast', () => console.warn('Toast called server-side, this has no effect.'));
};
