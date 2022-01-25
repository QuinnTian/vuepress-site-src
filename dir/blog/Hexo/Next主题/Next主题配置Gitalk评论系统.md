---
title: Next主题配置Gitalk评论系统
date: 2022-01-08 21:16:39
update:
categories:  
    - [Hexo,Next]
tags:
    - Next
    - Hexo
    - Gitalk
    - 主题配置

---

Next主题内置Gitalk评论系统，该评论系统存储在GitHub，不易丢失
<!-- more -->
# 1. 创建一个oauth app
1. 先登录Github
2. https://github.com/settings/apps 进入
3. 选择oauth app->new oauth app
4. 填写相关信息
![20220108212807](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/20220108212807.png)

# 2. 修改主题配置文件
- 创建成功后复制client_id和client_secret，填到配置文件中，配置文件在最下方
- 配置文件说明如下
```yml
# Gitalk
# For more information: https://gitalk.github.io
gitalk:
  enable: true # 是否启用gitalk
  github_id:  # Github的用户名 GitHub repo owner
  repo:  # 存储gitalk issue评论仓库，一般使用你部署hexo的仓库，如果你是部署在服务器上的必须新建一个仓库用于存储Repository name to store issues
  client_id:  # GitHub Application 上面的复制的Client ID
  client_secret:  # GitHub Application Client Secret
  admin_user:  # 仓库的拥有者GitHub repo owner and collaborators, only these guys can initialize gitHub issues
  distraction_free_mode: true # Facebook-like distraction free mode
  # When the official proxy is not available, you can change it to your own proxy address
  proxy: https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token # 不用改This is official proxy address
  # Gitalk's display language depends on user's browser or system environment
  # If you want everyone visiting your site to see a uniform language, you can set a force language value
  # Available values: en | es-ES | fr | ru | zh-CN | zh-TW
  language:

```

# 3. Gitalk说明
- 配置成功后，点击任意的文章都会**显示未生成issue，请联系管理员**这是正常现象，登录账户创建就行，如果之前有很多文章需要手动依次访问创建issue
- 如果关闭某篇文章或页面的评论，如下配置文章开头添加`comments: false`
```yml
---
title: Next主题配置Gitalk评论系统
date: 2022-01-08 21:16:39
update:
categories:  
    - [Hexo,Next]
tags:
    - Next
    - Hexo
    - Gitalk
    - 主题配置
comments: false
---
```

