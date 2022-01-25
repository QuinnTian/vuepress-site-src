---
title: Nginx配置域名以及映射内网不同端口.md
date: 2018-07-21 12:14:32.0
updated: 2018-07-21 12:14:32.0
categories: Nginx
tags: 
comments: true  
---

title: Nginx配置域名以及映射内网不同端口
date: '2018-07-21 12:14:32'
updated: '2018-07-21 12:15:48'
tags: [Nginx]
permalink: /articles/2018/07/21/1532146471914.html
---
**Nginx.conf**

``` nginx
	upstream tomcat1{
		server 127.0.0.1:8080;
	}
	upstream tomcat2{
                server 127.0.0.1:8081;
	}
	server {
		listen     80;
		server_name  abc.com;
		location / {
		
		 proxy_pass http://tomcat2;
        	 proxy_set_header Host $host;
        	 proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header REMOTE-HOST $remote_addr;
        	 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			}

	}


    server {
        listen       80;
        server_name abcd.com abcdef.com;
		#	root /rest_html/;
		#	index index.html;
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
           # root   html;
           # index  index.html index.htm;
		   #域名www.test1.com的请求全部转发到tomcat_server1即tomcat1服务上  
         proxy_pass http://tomcat1; 
    	 proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header REMOTE-HOST $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 }
```