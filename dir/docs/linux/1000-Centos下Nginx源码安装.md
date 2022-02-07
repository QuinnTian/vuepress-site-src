---
title: Centos下Nginx源码安装
date: 2021-02-24 18:12:26.0
updated: 
categories: Linux
tags: 
comments: true
permalink: /docs/linux/1644260113
---

# 1.安装编译工具
```
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
```
# 2.安装PRCE
**用于支持rewrite**
```
cd /usr/local/src/
wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz
根据版本选择
```
```
解压安装包
tar zxvf pcre-8.35.tar.gz
进入文件夹
cd pcre-8.35
编译
./configure
编译安装
make && make install
```
查看版本是否安装成功
```
pcre-config --version
```
# 3.安装nginx

0. 创建用户

 ```
   [root@bogon conf]# /usr/sbin/groupadd nginx
   [root@bogon conf]# /usr/sbin/useradd -g nginx nginx
 ```

   

1. 下载nginx
```
cd /usr/local/src/
wget http://nginx.org/download/nginx-1.18.0.tar.gz
```
2. 解压安装包
```
tar zxvf nginx-1.18.0.tar.gz
```
3. 进入安装包目录
```
cd nginx-1.18.0
```
4. 编译安装
```
配置你需要安装的模块
./configure --prefix=/usr/local/webserver/nginx --with-http_v2_module --with-http_stub_status_module --with-http_ssl_module --with-pcre=/usr/local/src/pcre-8.35
各类模块作用自行谷歌

编译和安装
make
make install
```
5. 查看版本是否安装成功
```
/usr/local/webserver/nginx/sbin/nginx -v
```
4. 配置nginx
1. 备份原来的配置文件
```
cp /usr/local/webserver/nginx/conf/nginx.conf 
/usr/local/webserver/nginx/conf/nginx.conf.bak
```
2. 替换自己写的配置文件
参考https://quinntian.com/?p=104
3. 检查配置文件格式是否正确
`/usr/local/webserver/nginx/sbin/nginx -t`
4. 启动ngxin
```
/usr/local/webserver/nginx/sbin/nginx
```
# 4.常见命令
```
# 检查配置文件格式
/usr/local/webserver/nginx/sbin/nginx -V # 查看版本和已安装模块
/usr/local/webserver/nginx/sbin/nginx -t # 检查配置文件是否正确
/usr/local/webserver/nginx/sbin/nginx -s reload            # 重新载入配置文件
/usr/local/webserver/nginx/sbin/nginx -s reopen            # 重启 Nginx
/usr/local/webserver/nginx/sbin/nginx -s stop              # 停止 Nginx
```
# 5.将nginx配置成系统服务
参考https://quinntian.com/?p=103



参考文档

- [Nginx 安装配置 | 菜鸟教程 (runoob.com)](https://www.runoob.com/linux/nginx-install-setup.html)