---
title: Nginx转发请求到新域名同时不改变URL
date: 2021-02-22 17:12:06.0
updated: 2021-02-22 17:12:06.0
categories: Nginx
tags: 
comments: true 
---

将请求路径https://kevin.com/data/test跳转到https://rubao.com/data/test/test.html页面。
```xml
server {
    listen       443;
    server_name  kevin.com;
    access_log  /data/nginx/logs/kevin.com-access.log main;
    error_log  /data/nginx/logs/kevin.com-error.log;
  
    ssl on;
    ssl_certificate /data/nginx/ssl/kevin.com.crt;
    ssl_certificate_key /data/nginx/ssl/kevin.com.key;
    ssl_session_timeout 5m;
  
    location = /data/test {
        rewrite /data/test /data/test/test.html break;
        proxy_pass https://rubao.com;
    }
}
将访问172.16.60.16:8082/m2/order/secretRecording的请求跳转到172.16.60.28:8089/order/secretRecording
```xml
server {
    listen       443;
    server_name  kevin.com;
    access_log  /data/nginx/logs/kevin.com-access.log main;
    error_log  /data/nginx/logs/kevin.com-error.log;
  
    ssl on;
    ssl_certificate /data/nginx/ssl/kevin.com.crt;
    ssl_certificate_key /data/nginx/ssl/kevin.com.key;
    ssl_session_timeout 5m;
  
    location = /data/test {
        rewrite /data/test /data/test/test.html break;
        proxy_pass https://rubao.com;
    }
}　
```　