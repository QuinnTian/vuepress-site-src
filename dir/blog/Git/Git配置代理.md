---
title: Git配置代理
date: 2018-07-30 10:20:53.0
updated: 
categories: 
    - Git
tags: 
    - Git
    - 代理
comments: true
---


Github国内访问过慢，可以配置代理
<!-- more -->

# 设置http和https代理
`git config --global http.proxy http://127.0.0.1:20211`
`git config --global https.proxy https://127.0.0.1:20211`

# 设置socks5代理
`git config --global http.proxy socks5://127.0.0.1:20210`
`git config --global https.proxy socks5://127.0.0.1:20210`

# 全局查看设置代理
`git config -l --global`

# 取消当前代理
`git config --global --unset http.proxy`
`git config --global --unset https.proxy`
- 上面将`--global`去掉是设置当前项目代理
- 修改配置文件是C:\Users\用户名\.gitconfig




参考文章地址
https://bitbucket.org/gotoh/connect/wiki/Home
https://gist.github.com/chuyik/02d0d37a49edc162546441092efae6a1
https://www.hi-linux.com/posts/11850.html
