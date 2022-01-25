---
title: 关于CentOS8下Nginx报错
date: 2021-03-10 03:12:38.602
updated: 2021-03-10 03:14:50.83
categories: Nginx
tags: 
comments: true 
---

系统是CentOS8

Nginx是源码安装nginx/1.18.0
突然发现重启服务器后Systemd enable Nginx配置的自启无法启动，日志文件报错误
```xml
nginx: [emerg] host not found in upstream "mydomain.com" in /etc/nginx/sites-enabled/test.conf:33
```
但是之前，在CentOS7一直都好好的。奇怪的是手动在运行一遍Systemd启动命令竟然可以运行，
Nginx配置文件也没错。百度搜了一圈，给的解决方法全都是清一色的配置DNS或者配置Host文件
最后还是谷歌大法好，原文如下

> Hello,
after installing Nginx on a new system I have some issues when rebooting the system. Nginx is unable to start and throws this error:
nginx: [emerg] host not found in upstream "mydomain.com" in /etc/nginx/sites-enabled/test.conf:33
When I try to ping mydomain.com it works without any issues, I also can start the Nginx service manually. Is it possible that Nginx tries to start before the system can resolve host names?

解决
>What distro are you using? I encountered this issue with the nginx package in Debian Stretch. It bundled a systemd service file for nginx that had an `After=network.target` dependency, so it tried to start the nginx service before the network was fully available/working. Nginx then wasn't able to resolve the upstream domain into an IP address and failed to start.
After overriding the service file so it has `After=network-online.target` dependency instead, nginx was able to start upon reboot reliably.

替换服务配置文件中After=`network-online.target`
具体原理不清楚，不知是否与Nginx最新版本或OS版本有关，至少在OS7.8不需要替换。
原文地址：https://www.reddit.com/r/nginx/comments/gh6wk5/nginx_emerg_host_not_found_in_upstream/