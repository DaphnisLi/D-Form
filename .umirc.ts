// config: https://d.umijs.org/config

import { defineConfig } from 'dumi'

export default defineConfig({
  title: 'D-Form',
  favicon:
    'https://s2.loli.net/2022/08/14/51A6SiswhVeGnRL.png',
  logo: 'https://s2.loli.net/2022/08/14/51A6SiswhVeGnRL.png',
  outputPath: 'docs',
  resolve: {
    includes: ['./src/docs'],
  },
  mode: 'site',
  navs: [
    null,
    { title: '源码', path: 'https://github.com/DaphnisLi/D-Form.git' }
  ],
  mfsu: {},
  hash: true,
  publicPath: '/docs/'
})
