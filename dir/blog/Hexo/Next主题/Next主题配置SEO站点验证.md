---
title: Next主题配置SEO站点验证
date: 2022-01-10 14:13:38
update:
categories:
    - [Hexo,Next]
tags:
    - Hexo
    - Next
    - SEO
    - 站点验证

---

Next主题配置SEO站点验证
<!-- more -->


# 1. 获取站点验证

## 谷歌
1. 登录谷歌站点管理https://search.google.com/search-console
2. 选择采用网址前缀验证-其他验证方式-HTML验证-将content内容复制到配置文件中
## 百度
1. 登录谷歌站点管理https://search.google.com/search-console
2. 添加网站-输入网站信息-选择网站类型-验证网站-选择HTML验证-将content的内容复制到配置文件中
## 必应
同上，也可直接导入谷歌

# 2. Next相关配置
Next主题自带通过HTML验证，只需填入相关验证代码即可，在Next主题中搜索如下内容
```yml
# Google Webmaster tools verification.
# See: https://developers.google.com/search
google_site_verification: 复制content内容

# Bing Webmaster tools verification.
# See: https://www.bing.com/webmasters
bing_site_verification: 复制content内容

# Baidu Webmaster tools verification.
# See: https://ziyuan.baidu.com/site
baidu_site_verification: 复制content内容
```