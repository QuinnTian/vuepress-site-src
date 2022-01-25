---
title: Maven配置记录
date: 2019-10-26 23:17:50.0
updated: 2020-01-26 04:23:31.0
categories: Maven
tags: 
comments: true
---

# 1.下载安装
# 2.创建环境变量
1. M2_HOME
E:\GreenSoftware\apache-maven-3.6.2
2. PATH添加%M2_HOME%\bin
3. mvn -v
# 3.配置文件修改
替换阿里仓库及本地仓库地址
阿里仓库
```xml
<!-- 阿里云仓库 -->
<mirror>
    <id>alimaven</id>
    <mirrorOf>central</mirrorOf>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
</mirror>

<!-- 中央仓库1 -->
<mirror>
    <id>repo1</id>
    <mirrorOf>central</mirrorOf>
    <name>Human Readable Name for this Mirror.</name>
    <url>http://repo1.maven.org/maven2/</url>
</mirror>

<!-- 中央仓库2 -->
<mirror>
    <id>repo2</id>
    <mirrorOf>central</mirrorOf>
    <name>Human Readable Name for this Mirror.</name>
    <url>http://repo2.maven.org/maven2/</url>
</mirror>

```

本地仓库
```
<localRepository>E:\WorkSpace\MVNRES</localRepository>
```
