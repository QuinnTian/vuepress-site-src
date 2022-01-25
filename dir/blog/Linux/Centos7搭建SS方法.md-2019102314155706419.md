---
title: Centos7搭建SS方法.md
date: 2018-07-24 10:43:33.0
updated: 2020-04-20 16:16:27.0
categories: Linux
tags: 
comments: true
---

title: Centos7搭建SS方法
date: '2018-07-24 10:43:33'
updated: '2018-07-24 11:05:53'
tags: [SS, 后端, Linux]
permalink: /articles/2018/07/24/1532400212591.html
---
参考文章地址
https://blog.csdn.net/u013309540/article/details/74330305
https://blog.csdn.net/tmacsky/article/details/78795809
SS：https://github.com/shadowsocks
#### 1.安装pip

##### 1.1安装epel扩展源

```
sudo yum install epel-release
```

##### 1.2安装python-pip

```
sudo yum -y install python-pip
```

##### 1.3升级pip

```
sudo pip install --upgrade pip
```

显示Complete！后表示安装成功，最好清除下cache。

```
sudo yum clean all
```

#### 2.安装shdowsocks

```
pip install shadowsocks
```

安装过程中可能会提示pip版本低了，需要更新下pip。

##### 2.1配置服务端

新建一个配置文件。

```
vi /etc/shadowsocks.json
```

然后输入如下内容：

``` xml
{    "server":"server_ip",    "server_port":25,    "local_address": "127.0.0.1",    "local_port":1080,    "password":"password",    "timeout":300,    "method":"aes-256-cfb",    "fast_open": false } 
```

多用户支持可以如下设置：

```
{ "server":"0.0.0.0", "local_address":"127.0.0.1", 
"local_port":1080, 
"port_password":{ "8989":"password8989", 
"7979":"password7979", 
"6969":"password6969" }, 
"timeout":300, 
"method":"aes-256-cfb", 
"fast_open": false }
```

主要需要设置server_ip、port和password三项，设置好后保存退出。

##### 2.2启动shadowsocks

最好将其设置成服务启动。

```
vi /etc/systemd/system/shadowsocks.service
```

然后输入以下内容：

```
[Unit]Description=Shadowsocks [Service]TimeoutStartSec=0ExecStart=/usr/bin/ssserver -c /etc/shadowsocks.json [Install]WantedBy=multi-user.target
```

启动服务：

```
systemctl enable shadowsocks
```

```
systemctl start shadowsocks
```

查看服务是否启动成功：

```
systemctl status shadowsocks -l
```

如需要停止服务使用：

```
systemctl stop shadowsocks
```

##### 2.3开启防火墙端口

如果没设置防火墙端口开启，可能不能访问到该端口服务。

```
firewall-cmd --zone=public --add-port=25/tcp --permanent
```

#### 3.加速

加速可以选择用锐速或者BBR，这里就不赘述了。