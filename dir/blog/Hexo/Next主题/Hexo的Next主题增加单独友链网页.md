---
title: Hexo Next主题增加单独友链网页
date: 2022-01-15 23:46:20
update:
categories:  
    - [Hexo,Next]
tags:
    - Next
    - Hexo
    - 友链
    - 友情链接
    - 主题配置

---

Next主题是带有友链，只不过在侧边栏，友链过多不美观，可以自定义一个页面专门存放友链
<!-- more -->

- 这个方法仅适用新版Next主题，即用Nunjucks模板引擎的新Next主题，确定是否是新版，layout里面的文件后缀是njk
- 早期Next主题是ejs模板引擎，网上大多数也是针对旧版添加友情链接的方法，已经不适用新版

## 1. 创建友情链接模板文件

Next主题下->layout->_partials->page->创建links.njk文件

文件内容如下

```html
{% block content %}
  {######################}
  {### LINKS BLOCK ###}
  {######################}
    <style>
    .links-content {
        margin-top: 1rem
    }

    .link-navigation::after {
        content: " ";
        display: block;
        clear: both
    }

    .card {
        width: 130px;
        font-size: 1rem;
        padding: 0;
        border-radius: 4px;
        transition-duration: .15s;
        margin-bottom: 1rem;
        display: block;
        float: left;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12);
        background: #f5f5f5
    }

    .card {
        margin-left: 16px
    }

    @media(max-width:567px) {
        .card {
            margin-left: 16px;
            width: calc((100% - 16px)/2)
        }

        .card:nth-child(2n+1) {
            margin-left: 0
        }

        .card:not(:nth-child(2n+1)) {
            margin-left: 16px
        }
    }

    @media(min-width:567px) {
        .card {
            margin-left: 16px;
            width: calc((100% - 32px)/3)
        }

        .card:nth-child(3n+1) {
            margin-left: 0
        }

        .card:not(:nth-child(3n+1)) {
            margin-left: 16px
        }
    }

    @media(min-width:768px) {
        .card {
            margin-left: 16px;
            width: calc((100% - 48px)/4)
        }

        .card:nth-child(4n+1) {
            margin-left: 0
        }

        .card:not(:nth-child(4n+1)) {
            margin-left: 16px
        }
    }

    @media(min-width:1200px) {
        .card {
            margin-left: 16px;
            width: calc((100% - 64px)/5)
        }

        .card:nth-child(5n+1) {
            margin-left: 0
        }

        .card:not(:nth-child(5n+1)) {
            margin-left: 16px
        }
    }

    .card:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04)
    }

    .card .thumb {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        background-size: 100% 100% !important
    }

    .posts-expand .post-body img {
        margin: 0;
        padding: 0;
        border: 0
    }

    .card .card-header {
        display: block;
        text-align: center;
        padding: 1rem .25rem;
        font-weight: 500;
        color: #333;
        white-space: normal
    }

    .card .card-header a {
        font-style: normal;
        color: #2bbc8a;
        font-weight: 700;
        text-decoration: none;
        border: 0
    }

    .card .card-header a:hover {
        color: #d480aa;
        text-decoration: none;
        border: 0
    }
</style>
<div class="links-content">
        <div class="link-navigation" id="links1">
            {% for link in theme.mylinks %}
            <div class="card" title="{{link.info}}">
                <a href="{{ link.site }}" target="_blank">
                    <div class="thumb" style="background: url( '{{ link.avatar }} ');">
                    </div>
                </a>
                <div class="card-header">
                    <div>
                        <a href="{{ link.site }}" target="_blank">
                            {{ link.nickname }}
                        </a>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
</div>
<hr/>
<div style="text-align:center;" color="red">
    本页面评论已禁用
  <span class="with-love" id="animate1">
    <i class="fa fa-heart"></i>
  </span>
  <a href="/comments">
    <b>点击此处添加友链</b>
  </a>
  <span class="with-love" id="animate2">
    <i class="fa fa-heart"></i>
  </span></div>         
<hr/>      
  {##########################}
  {### END LINKS BLOCK ###}
  {##########################}
{% endblock %}
```



## 2.  修改主题配置文件

```yaml
menu:
  # 增加
  links: /links || fa fa-link
  
```

## 3. 增加中文对照项

主题根目录->languages->zh-CN文件添加如下内容

```yaml
menu:
  # 自动将菜单中 links 映射成友链
  links: 友链
```

## 4. 主题配置文件添加友链信息
```yaml
mylinks:
  - nickname: #友链名称
    avatar: #友链头像
    site:  #友链地址
    info:  #友链说明
```



