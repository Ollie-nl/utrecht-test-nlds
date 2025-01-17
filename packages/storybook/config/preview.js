import React from 'react';
import { defineCustomElements as defineUtrechtComponents } from '@utrecht/web-component-library-stencil/loader';
import '@utrecht/component-library-css';
import * as ReactDOMServer from 'react-dom/server';
import prettierBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';

// Import all themes
import '@nl-design-system-unstable/amsterdam-design-tokens/dist/index.css';
import '@nl-design-system-unstable/bodegraven-reeuwijk-design-tokens/dist/index.css';
import '@nl-design-system-unstable/borne-design-tokens/dist/index.css';
import '@nl-design-system-unstable/buren-design-tokens/dist/index.css';
import '@nl-design-system-unstable/buren-design-tokens/src/font';
import '@nl-design-system-unstable/bodegraven-reeuwijk-design-tokens/src/font';
import '@nl-design-system-unstable/drechterland-design-tokens/dist/index.css';
import '@nl-design-system-unstable/duiven-design-tokens/dist/index.css';
import '@nl-design-system-unstable/duiven-design-tokens/src/font';
import '@nl-design-system-unstable/example-theme/dist/design-tokens.css';
import '@nl-design-system-unstable/example-theme/src/custom.scss';
import '@nl-design-system-unstable/example-theme/src/font';
// import '@nl-design-system-unstable/duo-design-tokens/dist/index.css';
import '@nl-design-system-unstable/enkhuizen-design-tokens/dist/index.css';
import '@nl-design-system-unstable/groningen-design-tokens/dist/index.css';
import '@nl-design-system-unstable/haarlemmermeer-design-tokens/dist/index.css';
import '@nl-design-system-unstable/hoorn-design-tokens/dist/design-tokens.css';
import '@nl-design-system-unstable/hoorn-design-tokens/src/font';
import '@nl-design-system-unstable/horstaandemaas-design-tokens/dist/index.css';
import '@nl-design-system-unstable/leidschendam-voorburg-design-tokens/dist/index.css';
import '@nl-design-system-unstable/nijmegen-design-tokens/dist/index.css';
import '@nl-design-system-unstable/nijmegen-design-tokens/src/font';
import '@nl-design-system-unstable/noordoostpolder-design-tokens/dist/index.css';
import '@nl-design-system-unstable/noordoostpolder-design-tokens/src/font';
import '@nl-design-system-unstable/provincie-zuid-holland-design-tokens/dist/index.css';
import '@nl-design-system-unstable/rotterdam-design-tokens/dist/index.css';
import '@nl-design-system-unstable/rotterdam-design-tokens/src/custom.scss';
// Uncomment the following line when proprietary fonts for Rotterdam are available:
// import '@nl-design-system-unstable/rotterdam-design-tokens/src/font.scss';
import '@nl-design-system-unstable/stedebroec-design-tokens/dist/index.css';
import '@nl-design-system-unstable/tilburg-design-tokens/dist/index.css';
import '@nl-design-system-unstable/venray-design-tokens/dist/index.css';
import '@nl-design-system-unstable/vught-design-tokens/dist/index.css';
import '@nl-design-system-unstable/westervoort-design-tokens/dist/index.css';
import '@nl-design-system-unstable/westervoort-design-tokens/src/font';
import '@nl-design-system-unstable/zevenaar-design-tokens/dist/index.css';
import '@nl-design-system-unstable/zevenaar-design-tokens/src/font';
import '@nl-design-system-unstable/zwolle-design-tokens/dist/index.css';
import '@utrecht/design-tokens/dist/index.css';
import '@gemeente-denhaag/design-tokens-components/dist/theme/index.css';

defineUtrechtComponents();

const statuses = {
  BETA: '#9F5E0F',
  STABLE: '#339900',
  DEPRECATED: '#f02c2c',
  'IN DEVELOPMENT': '#174050',
};

const previewTabs = {
  'storybook/docs/panel': { title: 'API' },
  canvas: { title: 'Design Tokens' },
};

const themes = [
  'Amsterdam',
  'Bodegraven-Reeuwijk',
  'Borne',
  'Buren',
  'Den Haag',
  'Drechterland',
  'DSO',
  'Duiven',
  'DUO',
  'Enkhuizen',
  'Groningen',
  'Haarlemmermeer',
  'Hoorn',
  'Horst aan de Maas',
  'Leidschendam Voorburg',
  'Nijmegen',
  'Noordoostpolder',
  'Rijkshuisstijl',
  'Rotterdam',
  'Stede Broec',
  'Tilburg',
  'Utrecht',
  'Venray',
  'Vught',
  'Westervoort',
  'Zevenaar',
  'Zuid-Holland',
  'Zwolle',
].sort();

const flatten = (a, b) => [...a, ...b];
const order = [
  ['Themes', ['README']],
  ['Example', ['README']],
  ...themes.sort().map((org) => [org, ['README']]),
].reduce(flatten, []);

export const parameters = {
  controls: { expanded: false },
  previewTabs,
  statuses,
  options: {
    panelPosition: 'bottom',
    storySort: {
      order,
    },
  },
  decorators: [
    (Story, storyContext) => {
      // Hack to make current args for a story available in the transformSource of the docs addon
      storyContext.parameters.args = storyContext.args;

      return <Story />;
    },
  ],
  transformSource: (src, storyContext) => {
    // Ensure valid HTML in the Preview source
    if (storyContext.component) {
      return prettier.format(
        ReactDOMServer.renderToStaticMarkup(storyContext.component(storyContext.parameters.args)),
        { parser: 'babel', plugins: [prettierBabel] },
      );
    }
    return src;
  },
};
