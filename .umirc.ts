// config: https://d.umijs.org/config

import { defineConfig } from 'dumi'

const logo = 'https://common-1305245006.cos.ap-shanghai.myqcloud.com/orange.png'

export default defineConfig({
  title: 'D-Form',
  favicon: logo,
  logo,
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
  styles: [
    `.__dumi-default-layout-hero{
      background-image: url(https://form-1305245006.cos-website.ap-shanghai.myqcloud.com/formIndex.png);
      background-size: cover;
      background-repeat: no-repeat;
      padding: 120px 0 !important;
    }
    .__dumi-default-layout-hero h1{
      color:#45124e !important;
      font-size:80px !important;
      padding-bottom: 30px !important;
    }
    `,
  ],
})
