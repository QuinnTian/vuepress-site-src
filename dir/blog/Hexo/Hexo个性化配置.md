---
title: Hexo个性化配置
date: 2022-01-09 00:22:32
update:
categories: 
    - Hexo
tags:
    - Hexo
    - 个性化配置

---

有关Hexo的一些个性化配置的收集
<!-- more -->
- skip_render参数
```yml
# 该参数可以配置source哪些资源不生成到public文件夹，从而避免一些私密文章被部署到网站
# 以下是配置_posts的inbox下的所有文件不会部署到网站中
skip_render: "_posts/inbox/*"
```
