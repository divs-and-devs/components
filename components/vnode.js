import Vue from 'vue';

function cloneVNode (vnodes, h) {
  return vnodes.map(vnode => h(vnode.tag, {
    ...vnode.data,
    props: {
      ...vnode.componentOptions.propsData
    },
    on: {
      ...vnode.componentOptions.listeners
    }
  }, vnode.componentOptions.children));
}

export default Vue.extend({
  name: 'Vnode',
  functional: true,
  render (h, ctx) {
    console.log(ctx.props);
    if (!ctx)
      return h(null);
    // console.log(props.is ?? []);
    return h('li', ctx.data, [...cloneVNode(ctx.props.is ?? [], h)]);
    // return h('li', ctx.data, ctx.props.nodes?.map(x => ({ ...x })));
  }
});
