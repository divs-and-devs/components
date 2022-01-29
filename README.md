# Divs and devs components

This library contains all global Divs and Devs components.

## Installing

install this module following these steps.
1. when authentication is succesful run `npm install @divs-and-devs/components`
2. add it to the `buildModules` in your `nuxt.config.js` above all other modules.

## Options

You can change the default colors in this library using module options.

```ts
// default options
componentLibrary: {
  dimColorsInDarkMode?: boolean;
  navbarHeight?: number;
  borderRadius: string;
  primary?: string | {
    base: string,
    fade?: string,
    shade?: string,
    text?: string
  },

  secondary?: string | {
    base: string,
    fade?: string,
    shade?: string,
    text?: string
  },

  error?: string | {
    base: string,
    fade?: string,
    shade?: string,
    text?: string
  },

  warning?: string | {
    base: string,
    fade?: string,
    shade?: string,
    text?: string
  },

  shade: {
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
  }
},

// or inside buildModules

buildModules: [
  '@divs-and-devs/components',
  '@nuxtjs/style-resources'
],
```

## Storybook

This module uses storybook, a component inspector/documentation. Run it using `npm run storybook`.

## Development

New versions are automatically rolled out using pipelines.
