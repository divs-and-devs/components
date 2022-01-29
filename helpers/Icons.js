const { basename } = require('path');
function kebabize (string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
const icons = [];

// eslint-disable-next-line camelcase
if (typeof __webpack_require__ === 'undefined') {
  const glob = require('fast-glob');
  const files = glob.sync('assets/icons/*.svg');

  icons.push(...files.map(x => basename(x, '.svg')));
} else
  icons.push(...require.context('../assets/icons', true, /\.svg$/).keys().map(x => x.match(/\.\/(.*).svg$/)[1]));

module.exports = icons.map(x => kebabize(x));
