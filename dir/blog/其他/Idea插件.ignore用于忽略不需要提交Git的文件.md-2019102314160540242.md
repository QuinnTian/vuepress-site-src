---
title: Idea插件.ignore用于忽略不需要提交Git的文件.md
date: 2018-07-23 11:20:40.0
updated: 2018-08-16 08:27:00.0
categories: 其他
tags: 
comments: true
---

title: Idea插件.ignore用于忽略不需要提交Git的文件
date: '2018-07-23 11:20:40'
updated: '2018-08-16 08:27:00'
tags: [IDEA]
permalink: /articles/2018/07/23/1532316040291.html
---
## 标准的Maven结构

```
1.  + project  
2.    |  
3.    + pom.xml  
4.    |  
5.    + src /  
6.       + main /  
7.       | + java    java源代码文件,最终会打包编译到WEB/INF下的classes目录  
8.       | + resources 资源库，会自动复制到classes目录里  
9.       | + filters  资源过滤文件  
10.       | + webapp web应用程序资源文件  
11.       + test /  
12.       | + java  测试java源文件内容  
13.       | + resources 测试的资源文件  
14.       | + filters  测试的资源过滤文件  
15.       + it /  
16.       + assembly /  
17.       + site / |  
18.    + .idea /  
19.    +  project.iml  
20.  + LICENSE.txt   工程许可说明  
21.  + NOTICE.txt   项目所需要的依赖的说明文件  
22.  + README.txt 项目工程说明文档

```
![Snipaste_20180723_110629png](https://res.quinntian.xyz//file/2018/07/52892db58d80427f90a7b8e9e7864adf_Snipaste_20180723_110629.png) 

