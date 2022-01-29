import Vue from 'vue';

const aliases = {
  slash: '/',
  esc: 'escape',
  space: ' ',
  down: 'arrowdown',
  up: 'arrowup',
  left: 'arrowleft',
  right: 'arrowright',
  semicolon: ';',
  pipe: '|'
};

const displays = {
  ' ': '&nbsp;&nbsp;&nbsp;&nbsp;⏘&nbsp;&nbsp;&nbsp;&nbsp;',
  tab: '&nbsp;&nbsp;⭾&nbsp;&nbsp;',
  arrowright: '→',
  arrowleft: '←',
  arrowdown: '↓',
  arrowup: '↑',
  pageup: 'PgUp',
  pagedown: 'PgDn',
  enter: '&nbsp;&nbsp;⏎',
  escape: 'esc',
  backspace: '&nbsp;⌫&nbsp;',
  capslock: system => (system === 'mac' ? '&nbsp;&nbsp⇪' : 'caps lock'),
  shift: system => (system === 'mac' ? 'shift ⇧' : 'shift'),
  ctrl: system => (system === 'mac' ? '⌃' : 'ctrl'),
  alt: system => (system === 'mac' ? '⌥' : 'alt'),
  meta: system =>
    system === 'mac' ? '⌘' : system === 'windows' ? 'win' : 'meta'
};

const keybindMap = new Map();

let initialized = false;
let show = false;

function getOS () {
  if (navigator.oscpu.toLowerCase().includes('windows')) return 'windows';
  if (navigator.oscpu.toLowerCase().includes('mac')) return 'mac';

  return 'linux';
}

function showKeybinds () {
  for (const [el, keybind] of keybindMap) {
    const container = document.createElement('div');
    container.className = 'keybind-hint';
    const [rect] = el.getClientRects();

    if (!rect) {
      keybindMap.delete(el);
      continue;
    }

    container.style.position = 'absolute';
    container.style.fontFamily = 'inherit';
    container.style.fontSize = '14px';
    container.style.zIndex = '999999';
    container.style.background = 'var(--background)';
    container.style.boxShadow = '0px 8px 8px rgba(0, 0, 0, 0.03)';
    container.style.border = '1px solid var(--shade-300)';
    container.style.padding = '0.25rem 0.5rem';
    container.style.borderRadius = '0.5rem';
    container.style.opacity = '0';
    container.style.pointerEvents = 'none';
    container.style.cursor = 'default';

    const html = [];

    for (const key of keybind) {
      let keyCode = key;

      if (aliases[keyCode]) keyCode = aliases[keyCode];

      if (displays[keyCode]) {
        keyCode = displays[keyCode];

        if (typeof keyCode === 'function') keyCode = keyCode(getOS());
      }

      html.push(`<kbd>${keyCode}</kbd>`);
    }

    container.innerHTML = html.join(' + ');

    document.body.appendChild(container);

    container.style.top =
      rect.y + rect.height / 2 - container.clientHeight / 2 + 32 + 'px';
    container.style.left =
      rect.x + rect.width / 2 - container.clientWidth / 2 + 'px';

    container.animate(
      [
        {
          opacity: 1
        }
      ],
      { duration: 250, fill: 'both' }
    );
  }
}

function removeHints () {
  const keybindPopups = document.getElementsByClassName('keybind-hint');
  [...keybindPopups].forEach((x) => {
    x.animate(
      [
        {
          opacity: 0
        }
      ],
      { duration: 250, fill: 'both' }
    ).onFinish = () => x.remove();
  });
}

function initialize () {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '/' && !show) {
      e.preventDefault();

      show = true;
      showKeybinds();
      return;
    }

    show = false;
    removeHints();
  });

  window.addEventListener('unload', () => (initialized = false));
}

function createEventHandler (el, binding, vnode) {
  return (event) => {
    const { ctrl, shift, alt, meta, ...keys } = binding.modifiers;
    if (!!ctrl !== event.ctrlKey) return;

    if (!!alt !== event.altKey) return;

    if (!!shift !== event.shiftKey) return;

    if (!!meta !== event.metaKey) return;

    if (binding.arg && event.key.toLowerCase() !== binding.arg.toString())
      return;

    for (const key of Object.keys(keys))
      if (
        !(
          event.key.toLowerCase() === key ||
          event.key.toLowerCase() === aliases[key]
        )
      )
        return;

    event.preventDefault();

    if (vnode?.componentInstance?.click) vnode.componentInstance.click();

    else if (el instanceof HTMLButtonElement)
      el.click();

    if (vnode?.componentInstance?.focus)
      vnode.componentInstance.focus();
    else if (el?.focus)
      el.focus();
    else throw new Error('Element is not focusable.', el);
  };
}

Vue.directive('keybind', {
  inserted (el, binding, vnode) {
    if (!initialized) {
      initialize();
      initialized = true;
    }

    el.eventhandler = createEventHandler(el, binding, vnode);

    window.addEventListener('keydown', el.eventhandler);

    const keys = Object.keys(binding.modifiers);
    if (binding.arg) keys.push(binding.arg);

    keybindMap.set(el, keys);
  },

  update (el, binding, vnode) {
    if (el.eventhandler)
      window.removeEventListener('keydown', el.eventhandler);

    el.eventhandler = createEventHandler(el, binding, vnode);

    const keys = Object.keys(binding.modifiers);
    if (binding.arg) keys.push(binding.arg);

    window.addEventListener('keydown', el.eventhandler);
    keybindMap.set(el, keys);
  },

  unbind (el) {
    if (el.eventhandler)
      window.removeEventListener('keydown', el.eventhandler);
  }
});
