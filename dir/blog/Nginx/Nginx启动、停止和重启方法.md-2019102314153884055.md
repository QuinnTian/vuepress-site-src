---
title: Nginx启动、停止和重启方法.md
date: 2018-07-21 12:31:39.0
updated: 2018-07-21 12:31:39.0
categories: Nginx
tags: 
comments: true 
---

title: Nginx启动、停止和重启方法
date: '2018-07-21 12:31:39'
updated: '2018-07-22 11:09:41'
tags: [Nginx]
permalink: /articles/2018/07/21/1532147499209.html
---
# Nginx启动命令
- ```Nginx安装目录 -c nginx```
# Nginx停止命令
1. 查看进程号 `ps -ef|grep nginx`  含有master的为该进程
2. 杀死进程 `kill -quit` 进程号(或`kill -term`或`kill -int`或`pkill-9`)
# Nginx重启命令
1. 进入Nginx安装目录下sbin/下
2. 验证配置文件是否正确 `./nginx -t` 或`nginx -t -c`
3. `./nginx -s reload`或查看进程号 `kill -hup` 进程号