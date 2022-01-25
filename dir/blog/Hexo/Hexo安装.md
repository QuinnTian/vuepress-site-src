---
title: Hexo安装记录
date: 2022-01-08 21:53:46
update:
categories: Hexo
tags:
    - Hexo
    - 安装

---

Hexo博客是一款快速、简洁且高效的静态博客框架，既可以部署在服务器也可以部署在Github，结合Vscode可以很好的实现博客的快速发布
<!-- more -->
# 1. 安装Git和Node.js
这两个软件的安装直接一直点击下一步即可
# 2. 安装Hexo
1. `npm install -g hexo-cli`安装Hexo构建工具
2. 进入你的博客存放的文件夹->右键git bash->运行安装命令`hexo init blog`
3. 进入blog运行`hexo s`博客启动成功，浏览器输入`localhost:4000`即可访问
# 3. 博客目录说明
```yml
.
├── _config.yml 网站的配置文件
├── package.json 
├── scaffolds 模板文件
├── source 资源文件，存放文章的地方
|   ├── _drafts
|   └── _posts
└── themes 主题放置的地方
```

# 4. 创建文章
`hexo new [layout] <title>`
- layout一般不用写，默认创建就是post类型一篇文章
- title表示文章的标题
- 默认创建存放在source/_post/文件夹下
# 5. 生成静态资源
`hexo g`会生成`public`目录，将来会部署在网站上
# 6. 启动服务器
`hexo s`启动本地4000端口服务器
# 7. 清除缓存
`hexo c`



