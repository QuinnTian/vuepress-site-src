---
title: Centos7以上Nginx配置成系统服务自启动
date: 2021-02-24 18:13:45.0
updated: 2021-02-24 18:13:45.0
categories: Linux
tags: 
comments: true
---

# 创建开机自启文件
首先在以下目录创建文件

   `vim /lib/systemd/system/nginx.service`

   配置文件如下

```
[Unit]
Description=nginx service
After=network.target

[Service]
Type=forking
# 设置执行启动、重新载入和停止的命令地址
ExecStart=/usr/local/webserver/nginx/sbin/nginx
ExecReload=/usr/local/webserver/nginx/sbin/nginx -s reload
ExecStop=/usr/local/webserver/nginx/sbin/nginx -s quit
PrivateTmp=true

[Install]
WantedBy=multi-user.target

```
参数说明
| \[Unit\] | 服务的说明 |
| --- | --- |
| Description | 描述服务 |
| After | 描述服务类别 |

| \[Service\] | 服务运行参数的设置 |
| --- | --- |
| Type=forking | 是后台运行的形式 |
| ExecStart | 为服务的具体运行命令 |
| ExecReload | 为重启命令 |
| ExecStop | 为停止命令 |
| PrivateTmp=True | 表示给服务分配独立的临时空间 |
tip
\[Service\]的启动、重启、停止命令全部要求使用绝对路径
\[Install\]运行级别下服务安装的相关设置，可设置为多用户，即系统运行级别为3
对于nginx的位置可以使用`find / -name nginx`进行寻找
# 设置开机自启
设置开机自启动

`systemctl enable nginx`

关闭开机自动启动

`systemctl disable nginx`

# 服务的相关命令

启动nginx服务

`systemctl start nginx.service`

停止服务

`systemctl stop nginx.service`

重新启动服务

`systemctl restart nginx.service`

查看所有已启动的服务

`systemctl list-units --type=service`

查看服务当前状态

`systemctl status nginx.service`

设置开机自启动

`systemctl enable nginx.service`

停止开机自启动

`systemctl disable nginx.service`
