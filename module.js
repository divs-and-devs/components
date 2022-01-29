import { join, resolve, basename } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { template } from 'lodash';
import glob from 'fast-glob';
import generateTheme from './helpers/GenerateTheme';
import packageJson from './package.json';

const defaults = {
  dimColorsInDarkMode: true,
  navbarheight: '4.5rem',
  primary: '#18a4e0',
  secondary: '#40e018',

  error: '#f2453d',
  warning: '#f2a13d',
  borderRadius: '0.5rem',

  shade: {
    100: '#f5f5f5',
    200: '#ebebeb',
    300: '#cdcdcd',
    400: '#a8a8a8',
    500: '#787878',
    600: '#2f2f2f',
    700: '#1c1c1c',
    800: '#111'
  }
};

export default function (moduleOptions) {
  checkDependencies(this.options.buildModules);

  const options = { ...defaults, ...this.options.componentLibrary, ...moduleOptions };

  this.nuxt.options.cli.badgeMessages.push(`▸ Using Divs and devs components (v${packageJson.version})`);

  return Promise.all([
    addPlugins(this.options),
    createTheme(options, this),
    importStyles(this.options),
    importComponents(this.nuxt),
    enableStorybook(this)
  ]);
}

function createTheme (colors, nuxt) {
  const theme = generateTheme(colors);

  const templateSource = readFileSync(resolve(__dirname, 'templates/variables.css')).toString();
  const source = template(templateSource, {})(theme);
  const path = resolve(nuxt.options.rootDir, 'node_modules', '.cache', 'theme.css');

  mkdirSync(resolve(nuxt.options.rootDir, 'node_modules', '.cache'), { recursive: true });
  writeFileSync(path, source);

  const { scss } = nuxt.options.build.loaders;

  nuxt.options.css.unshift(path);

  scss.additionalData = [
    scss.additionalData,
    '@use "sass:math";',
    `$border-radius: ${colors.borderRadius};`
  ].join('\n');
  return path;
}

async function addPlugins (options) {
  const plugins = await glob('./plugins/*.js');
  options.plugins.push(...plugins.map(x => join(__dirname, x)));
}

function checkDependencies (modules) {
  if (!modules.includes('@nuxtjs/style-resources'))
    throw new Error('@nuxtjs/style-resources is not installed, this is needed by @divs-and-devs/components. install using `npm i -D @nuxtjs/style-resources` or add it to the buildModules in your nuxt.config.js');

  if (!modules.includes('portal-vue/nuxt'))
    modules.push('portal-vue/nuxt');
}

function importComponents (nuxt) {
  nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: resolve(__dirname, './components'),
      prefix: 'd',
      pathPrefix: false
    });
  });
}

function createStyleResources (nuxtOptions) {
  if (!nuxtOptions.styleResources)
    nuxtOptions.styleResources = { scss: [] };

  if (nuxtOptions.styleResources.scss === undefined)
    nuxtOptions.styleResources.scss = [];

  nuxtOptions.styleResources.hoistUseStatements = true;
}

async function importStyles (nuxtOptions) {
  const [resources, styles] = await Promise.all([glob('scss/_*.scss'), glob('scss/*.scss', { ignore: 'scss/_*.scss' })]);

  // main and reset are files with only css, no scss variables/mixins.
  nuxtOptions.css.push(...styles.map(x => join(__dirname, x)));

  createStyleResources(nuxtOptions);

  nuxtOptions.styleResources.scss.push(...resources.map(x => join(__dirname, x)));
}

function enableStorybook (options) {
  if (options.options.isStorybookProject)
    return;

  options.nuxt.hook('storybook:config', ({ stories }) => {
    stories.push(`${packageJson.name}/stories/*.stories.js`);
  });
}

module.exports.meta = packageJson;
