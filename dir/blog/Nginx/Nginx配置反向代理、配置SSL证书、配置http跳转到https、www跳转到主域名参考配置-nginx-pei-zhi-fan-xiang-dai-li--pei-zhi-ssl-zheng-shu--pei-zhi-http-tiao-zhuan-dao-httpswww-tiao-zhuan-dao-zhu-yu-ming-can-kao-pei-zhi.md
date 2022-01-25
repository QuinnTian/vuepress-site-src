---
title: Nginx配置反向代理、配置SSL证书、配置http跳转到https、www跳转到主域名参考配置
date: 2021-02-24 18:28:29.0
updated: 2021-02-24 19:00:59.0
categories: Nginx
tags: 
comments: true 
---

以下配置文件如下功能
1. 配置反向代理
2. 配置http跳转从https
3. 配置ssl证书
4. 监听80和443端口
5. 配置www跳转至主域名
# 
```xml
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
	server_tokens  off;
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
	
	#反向代理1
	upstream server1{
						
                server 127.0.0.1:1001;# 本地服务端口1，可以设置多个
	}
	#监听域名和 80端口并强制跳转ssl
    server {
        listen       80;# 端口号
        server_name  a.com;# 你的域名
		rewrite ^(.*)$ https://$host$1  permanent; # 重写成https
        
        

        
    }
	server {
        listen       80; 
        server_name  b.com;# 你的域名
		rewrite ^(.*)$ https://$host$1  permanent; # 重写成https
        
        

        
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    # 监听443端口
    server {
        listen       443 ssl;
        server_name  a.com;a.com

        ssl_certificate      a.crt;# crt文件存放的地址
        ssl_certificate_key  a.key;# key文件存放的地址

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        
		ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers  on;

        location / {
             proxy_pass http://server1;#配置反向代理，与前面的upstream server1对应
        	 proxy_set_header Host $host; # 转发host值
        	 proxy_set_header X-Real-IP $remote_addr; # 转发真实IP
             proxy_set_header REMOTE-HOST $remote_addr;
        	 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
		
		
		
    }
	
	server {
        listen       443 ssl;
        server_name  www.a.com;
		   # 配置crt和key文件路径
        ssl_certificate      .crt;
        ssl_certificate_key  .key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        
		ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers  on;
		
		# 配置www跳转到主域名，如果你配置了www
		location / {
			rewrite  ^/(.*)$  https://quinntian.com/$1 permanent;
		}
		
		
		
        
    }

}



```