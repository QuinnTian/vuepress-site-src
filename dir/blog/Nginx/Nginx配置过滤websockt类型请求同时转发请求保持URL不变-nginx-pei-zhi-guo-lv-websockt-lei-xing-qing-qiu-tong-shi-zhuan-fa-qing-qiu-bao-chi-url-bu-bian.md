---
title: Nginx配置过滤websockt类型请求同时转发请求保持URL不变
date: 2021-02-20 14:08:43.0
updated: 2021-02-20 14:29:44.0
categories: Nginx
tags: 
comments: true 
---

# 需求
指定url并过滤websocket请求，把不符合的请求转发到其他服务器处理，
同时保持域名不变，符合的交给本地10802处理。


# 效果
访问https://a.b.com/url自动将请求转发给https://c.com，
此时域名保持不变。
如果有websocket类型的流量自动走本地端口1080。
# 配置
```xml
...父节点及其他非必要内容省略
	 location /url { 
			set $cnt keep-live;#配置连接类型
			if ($http_upgrade != "websocket") { # WebSocket协商失败时返回404
				
				rewrite /url / break;#重写url为/，因为最后地址是根域名
				proxy_pass https://c.com;
				
				
			}
			if ($http_upgrade = "websocket") { # 符合交给10802处理
				
				
				proxy_pass http://127.0.0.1:1802;
				set $cnt upgrade;
				
			}
			
			
			
			proxy_http_version 1.1;#设置http版本
			proxy_set_header Upgrade $http_upgrade; #设置upgrad类型
			proxy_set_header Connection cnt;#设置header类型
			proxy_set_header Host quinntian.com;#此处不要用$host否则无法跳转，因为$host获取的是当前域名会导致无法跳转
			# Show real IP 
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			
		}


```
变量cnt用于指定upgrade，下面是实际走websockt的值
proxy_set_header Upgrade websocket; 
proxy_set_header Connection upgrade;
为什么websocket在header中使用这两个字段参考
[为什么HTTP Upgrade的时候，需要Connection: upgrade - Robert的博客](:/6c78328e815845fa9f648b8feb1baf09)

