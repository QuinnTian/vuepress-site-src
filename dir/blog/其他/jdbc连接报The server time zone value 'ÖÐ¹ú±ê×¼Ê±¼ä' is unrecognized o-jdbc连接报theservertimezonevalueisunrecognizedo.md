---
title: jdbc连接报The server time zone value 'ÖÐ¹ú±ê×¼Ê±¼ä' is unrecognized o
date: 2020-12-08 20:03:01.0
updated: 2020-12-08 20:03:11.0
categories: 其他
tags: 
comments: true
---

# 原因
> 在安装mysql的时候时区设置的不正确， mysql默认的是美国的时区，而我们中国大陆要比他们迟8小时，采用+8:00格式
使用的数据库是MySQL，没有指定MySQL驱动版本的情况下它自动依赖的驱动是8.0.12很高的版本，这是由于数据库和系统时区差异所造成的，在jdbc连接的url后面加上serverTimezone=GMT即可解决问题，如果需要使用gmt+8时区，需要写成GMT%2B8，否则会被解析为空。再一个解决办法就是使用低版本的MySQL jdbc驱动，5.1.28不会存在时区的问题。

# 解决方法1
在url配置加上  ?serverTimezone=GMT%2B8
```xml
localhost:3306/tk-admin?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf-8
```

# 解决方法2
修改mysql的my.ini配置文件

找到这个文件之后，在[mysqld]节点在节点下面加上下面这句话

default-time-zone=’+08:00’

然后记得重启MySQL的服务，打开cmd窗口登录MySQL执行show variables like ‘%time_zone%’;这句命令，

然后在mysql执行语句:

set global time_zone='+8:00'