import Vue from 'vue';
import tooltip from '../components/Tooltip.vue';

const tooltipSymbol = Symbol('tooltip');

Vue.directive('tooltip', {
  inserted (el, binding) {
    const data = {
      label: binding.value,
      align: Object.keys(binding.modifiers).filter(x => ['bottom', 'top', 'left', 'right'].includes(x)).join('-') || 'bottom-center',
      delay: Number(binding.arg === undefined ? 1000 : binding.arg),
      type: binding.modifiers.info ? 'info' : 'tooltip'
    };

    const component = new (Vue.extend(tooltip))({ propsData: data });

    el[tooltipSymbol] = component;

    component.$mount();
    el.insertAdjacentElement('afterbegin', component.$el);
    component.createEvents();
  },

  update (el, binding) {
    Vue.set(el[tooltipSymbol], 'label', binding.value);
    Vue.set(el[tooltipSymbol], 'delay', Number(binding.arg === undefined ? 1000 : binding.arg));
    Vue.set(el[tooltipSymbol], 'align', Object.keys(binding.modifiers).join('-') || 'bottom-center');
  }
});
