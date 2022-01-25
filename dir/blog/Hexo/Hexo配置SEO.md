---
title: Hexo配置SEO
date: 2022-01-08 19:52:03
update:
categories: Hexo
tags:
    - Hexo
    - SEO
    - 百度推送
    - 谷歌推送
    - 站点地图
    - 站点管理

---
优化站点SEO相关信息，通过配置文件，配置谷歌和百度的站点验证，百度的自动推送功能
<!-- more -->

# 1. 修改站点信息
修改_config.yml中配置信息，搜索如下信息并按照自己站点信息修改
```yml
# Site
title: 站点名称
subtitle: '别名'
description: '用于描述站点信息'
keywords: 关键词，多个关键词用逗号分隔
author: 作者名称
language: zh-CN  
timezone: 'Asia/Shanghai'
```
---
# 2. 优化URL
Hexo默认的URL地址比较复杂，不利于SEO
这里改成年份+月份+天+小时+分钟+秒的形式
搜索`parmalink`，改成`permalink: :year:month:day:hour:minute:second.html`,一般此链接不会重复，如果想做到永久唯一可以增加哈希值`:hash`或者直接用`:hash`当作永久链接
---
# 3. 提交网站信息
1. 提交给百度
   1. 登录百度站点管理https://ziyuan.baidu.com/site/index#/，点击添加网站。
   2. 站点验证有几种方式，选择文件验证，下载文件并存放到Hexo的source文件目录中
2. 提交给谷歌
   1. 登录谷歌站点管理https://search.google.com/search-console
   2. 选择采用网址前缀验证，文件验证，下载文件并存放到根目录
---
# 4. 配置站点地图
1. 在你的博客所在目录运行命令
```bash
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
```
2. 修改Hexo的配置文件
添加如下代码
```yml
sitemap:
    path: sitemap.xml
    baidusitemap:
path: baidusitemap.xml
```
配置文件搜索url，修改成你的域名
```bash
url: 你的域名地址
```

# 5. 创建robots.txt文件
此文件用于告诉搜索引擎哪些可以爬取,一般无特殊需要直接设置成如下即可
基本格式
```xml
User-agent: *
Sitemap: 你的域名/sitemap.xml
Sitemap: 你的域名/baidusitemap.xml
```
---

# 6. 设置百度自动推送
1. 安装百度推送插件
   `npm install hexo-baidu-url-submit --save`
2. 获取百度推送授权码
   ![2022-01-08_18-45-25](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/2022-01-08_18-45-25.png)
3. 添加Hexo配置
    ```yml
    # 新增百度主动推送插件
    baidu_url_submit:
        count: 100               # 提交最新的多少个链接
        host: quinntian.com    # 在百度站长平台中添加的域名
        token: yMZp83Y6x7CAgn9P      # 秘钥
        path: baidu_urls.txt   # 文本文档的地址， 新链接会保存在此文本文档里
    deploy:
     - type: xx
       repo: https://xxx
     # example, https://github.com/hexojs/hexojs.github.io
       branch: main
       #新增内容
     - type: baidu_url_submitter ## 百度提交链接的deploy 
    ```
4. 运行`hexo c && hexo d`,看`public`文件夹是否生成**baidu_urls.txt**，以及界面是否返回
    ```
        {"remain":99906,"success":94}
        INFO  Deploy done: baidu_url_submitter
 
    ```
