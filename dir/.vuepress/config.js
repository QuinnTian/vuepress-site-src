const { config } = require("vuepress-theme-hope");

module.exports = config({
  plugins: [
    [
      "@mr-hope/git",
      {
        // 你的选项
        timezone: "Asia/Shanghai"
      },
    ]


  ],
  title: "北纬36度",
  description: "构建个人知识文档",
  dest: "./dist",
  head: [

    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
  ],
  locales: { 
    "/": {
      // 设置需要的语言
      lang: "zh-CN",
    },
  },


  themeConfig: {
    darkmode: 'switch',
    pwa: false,
    hostname: "https://quinntian.com",

    author: "Quinn Tian",
    repo: "https://github.com/QuinnTian",
    displayAllHeaders: false,
    nav: [

      { text: "主页", link: "/", icon: "home" },
      {
        text: "运维",
        icon: "info",

        items: [
          { text: "Linux", link: "/docs/linux/", icon: "info",}
         
        ],
      },
      {
        text: "旧站",
        icon: "info",

        items: [
          { text: "Hexo站", link: "https://hexo.quinntian.com", icon: "home", target: '_blank' },
          { text: "Halo站", link: "https://halo.quinntian.com", icon: "home", target: '_blank' },
        ],
      }

    ],
    sidebarDepth: 3,
    sidebar: {
     
      "/docs/linux/": [
        {
          title: "Linux",
          icon: "creative",
          collapsable: true,
          children: ["10-Linux 命令基础", 
          "20-Linux 系统管理"],
        },
        {
          title: "Shell",
          icon: "creative",
          collapsable: true,
          children: ["blog", "install", "markdown"],
        },


      
    ]
  },
blog: {
      avatar: "https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/blog-imgs/avatar.jpg",
      intro: "/intro/",
      sidebarDisplay: "mobile",

      links: {
        Zhihu: "https://zhihu.com",
        Baidu: "https://baidu.com",
        Github: "https://github.com",
      },
    },

    footer: {
      display: true,

      copyright: "©2018-2022 Quinn Tian"
    },

    comment: {
      type: "vssue",
      platform: "github",

      // all other options of Vssue are allowed
      owner: "QuinnTian",
      repo: "vssue-repo",
      clientId: "6ca198c53e0ea15c661d",
      clientSecret: "ce4d93baec296838d584fa2a6515b6f0f542c228",

    },

    copyright: {
      status: "global",
    },



    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon/favicon.ico",
      cachePic: true,
      apple: {
        icon: "/favico/apple-touch-icon.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/favico/mstile-150x150.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/favicon/android-chrome-512x512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/favicon/android-chrome-192x192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
});
