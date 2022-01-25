---
title: Hexo配置一键部署到GitHub Page
date: 2022-01-08 22:40:27
update:
categories: 
    - Hexo
tags:
    - Hexo
    - 一键部署

---

Hexo使用hexo-deployer-git插件可以一键部署Github页面，方便快捷
<!-- more -->
# 安装该插件
`npm install hexo-deployer-git --save`
# 修改配置
```yml
deploy:
  type: git
  repo: <repository url> #GitHub仓库
  branch: [branch] #选择分支
  message: [message] #自定义信息一般删掉
```

# 运行命令推送
`hexo clean && hexo deploy`

