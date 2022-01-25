---
title: MySql8.0登录Navcat因验证方式而报错caching_sha2_password
date: 2021-03-14 21:52:24.264
updated: 2021-03-14 21:52:24.264
categories: MySQL
tags: 
comments: true 
---

报错内容：caching_sha2_password

适用：新安装且为启动服务之前
# 解决方法1
1. 更改mysql配置文件`my.ini`或`my.cnf`

增加这一句设置默认插件为旧版
```
default_authentication_plugin = mysql_native_password

```

# 解决方法2
直接在表中修改
适用于：已经启动
查看
```
use mysql;
Database changed
SELECT Host, User, plugin from user;
```
修改root的验证方式
```
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
FLUSH PRIVILEGES;
```