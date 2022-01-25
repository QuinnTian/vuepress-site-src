---
title: Tomcat不同项目使用不同的端口号.md
date: 2018-07-21 12:04:13.0
updated: 2020-02-16 23:54:10.0
categories: Java
tags: 
comments: true 
---

title: Tomcat不同项目使用不同的端口号
date: '2018-07-21 12:04:13'
updated: '2018-07-21 12:06:45'
tags: [Tomcat, 后端]
permalink: /articles/2018/07/21/1532145852473.html
---

![Snipaste_20180721_115505png](http://p95x8s7hh.bkt.clouddn.com//file/2018/07/28ca60812b5a4fcfb323a0f78c10a533_Snipaste_20180721_115505.png) 


![Snipaste_20180721_115552png](http://p95x8s7hh.bkt.clouddn.com//file/2018/07/f60e6deae8804708b38f5df7fc027208_Snipaste_20180721_115552.png) 

![Snipaste_20180721_120147png](http://p95x8s7hh.bkt.clouddn.com//file/2018/07/6036bbd269804eec90b4ddd8e6fa0cac_Snipaste_20180721_120147.png) 

Tomcat设置不输入项目名直接访问
``` lua
<Context path="" docBase="solo" debug="0" reloadable="true"/> 
```