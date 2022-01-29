import { writeFileSync } from 'fs';
import { basename, resolve } from 'path';
import glob from 'fast-glob';
import { parse } from 'vue-docgen-api';

const tags = {};
const attributes = {};
function convertToKebabCase (string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
}

async function parseComponent (path) {
  const ast = await parse(path, {
    alias: {
      '@/': resolve(basename(import.meta.url))
    }
  });

  const name = `d-${convertToKebabCase(ast.displayName)}`;

  tags[name] = {
    description: ast.description || 'Imported from @divs-and-devs/components',
    attributes: ast.props?.map(x => convertToKebabCase(x.name)),
    emits: ast.events?.map(x => x.name)
  };

  if (!ast.props)
    return ast;

  for (const prop of ast.props) {
    const propertyPath = `${name}/${convertToKebabCase(prop.name)}`;

    attributes[propertyPath] = {
      description: prop.description || `property on ${name}`,
      type: prop.type.name,
      required: prop.required ?? false
    };

    if (attributes[propertyPath].type === 'func')
      attributes[propertyPath].type = 'function';

    if (prop.required)
      attributes[propertyPath].description = 'required ' + attributes[propertyPath].description;

    if (prop.values) {
      attributes[propertyPath].options = prop.values;
      attributes[propertyPath].enum = prop.values.map(x => ({ value: x, description: x }));
    }
  }

  return ast;
}

async function parseComponents () {
  const components = await glob('./components/**/*.vue');
  await Promise.all(components.map(x => parseComponent(x)));

  writeFileSync('./tags.json', JSON.stringify(tags, null, 4));
  writeFileSync('./attributes.json', JSON.stringify(attributes, null, 4));
}

parseComponents();
