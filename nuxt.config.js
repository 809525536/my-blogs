module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'my-blogs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/style/common.css' }
    ],
    script: [
      // {
      //   src: '/lib-flexible.js', type: 'text/javascript', charset: 'utf-8'
      // }
    ]
  },
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  plugins: [
    // ssr: true表示这个插件只在服务端起作用
    {src: '~/plugins/ElementUI', ssr: true },
    '~/plugins/axios',
    { src: '~/plugins/login', ssr: false },
    { src: '~/plugins/userInfo', ssr: false },
    { src: '~/plugins/updateInfo', ssr: false }
  ],

  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    // 防止element 被多次打包
    vendor: ['element-ui']
  }
}

