
import { themes } from '@storybook/theming';
export default {
  isStorybookProject: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'divs and devs components',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/Tooltip.client.js',
    '@/plugins/Keybind.js',
    '@/plugins/Toast.js',
    '@/plugins/Touch.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '~/module.js',
    '@nuxtjs/style-resources',
    '@nuxtjs/device',
    'portal-vue/nuxt',
    '@nuxtjs/axios'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/svg'
  ],

  componentLibrary: {
    navbarheight: 0,
    bodyFont: 'poppins',
    headerFont: 'poppins'
  },

  styleResources: {
    scss: [],
    hoistUseStatements: true
  },

  storybook: {
    stories: [
      '~/stories/Welcome.stories.mdx',
      '~/stories/design/colors.stories.mdx',
      '~/stories/design/*.stories.mdx',
      '~/stories/**/*.stories.js'
    ],

    addons: ['storybook-dark-mode'],

    parameters: {
      options: {
        storySort: {
          order: ['Welcome']
        }
      },
      darkMode: {
        current: 'light',
        stylePreview: true,

        dark: { ...themes.dark, brandImage: '/logo_text.png', brandUrl: 'https://divsanddevs.nl' },
        light: { ...themes.light, brandImage: '/logo_text.png', brandUrl: 'https://divsanddevs.nl' }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
};
