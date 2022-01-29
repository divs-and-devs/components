import clamp from './Clamp';

/**
 * @param {object} options
 * @param {string | object} options.primary
 * @param {string | object} options.secondary
 * @param {string | object} options.error
 * @param {string | object} options.warning
 * @param {string | object} options.shade
 * @param {boolean} options.dimColorsInDarkMode
 */
export default function generateTheme (options) {
  const dark = {
    primary: generateColorset(options.primary, options.dimColorsInDarkMode),
    secondary: generateColorset(options.secondary, options.dimColorsInDarkMode),
    error: generateColorset(options.error, options.dimColorsInDarkMode),
    warning: generateColorset(options.warning, options.dimColorsInDarkMode)
  };

  const light = {
    primary: generateColorset(options.primary, false),
    secondary: generateColorset(options.secondary, false),
    error: generateColorset(options.error, false),
    warning: generateColorset(options.warning, false)
  };

  return { dark, light, shade: options.shade, ...options };
}

function generateColorset (color, dark) {
  const base = typeof color === 'string' ? color : color.base;
  // eslint-disable-next-line prefer-const
  let [h, s, l] = hexToHSL(base);

  if (dark) {
    s /= 2;
    l /= 1.5;
  }

  return {
    base: hslToString(h, s, l),
    fade: color?.fade ?? hslToString(h, s, l + 25),
    shade: color?.shade ?? hslToString(h, s, l - 25),
    text: color?.text ?? determineTextColor(l),
    fadetext: color?.fadeText ?? determineTextColor(l + 25),
    shadetext: color?.shadeText ?? determineTextColor(l - 25)
  };
}

function determineTextColor (lightness) {
  if (lightness > 50)
    return 'black';

  return 'white';
}

function hslToString (h, s, l) {
  return `hsl(${h}deg ${Math.round(clamp(s, 0, 100))}% ${Math.round(clamp(l, 0, 100))}%)`;
}
function hexToHSL (hex) {
  // Convert hex to RGB first
  let r = 0; let g = 0; let b = 0;
  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];
  } else if (hex.length === 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0)
    h = 0;
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  else if (cmax === g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}
