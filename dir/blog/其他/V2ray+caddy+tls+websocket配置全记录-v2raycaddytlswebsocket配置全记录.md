---
title: V2ray+caddy+tls+websocket配置全记录
date: 2020-02-16 23:59:08.0
updated: 2021-03-13 23:40:32.059
categories: 其他
tags: 
comments: true
---

参考的安装过程
V2ray官方说明文档：https://www.v2ray.com/
# 1. 安装v2ray
	参考网址：https://toutyrater.github.io/prep/install.html
	wget https://install.direct/go.sh
	
	sudo bash go.sh
	
	查看位置 whereis v2ray
	
# 2. 编辑配置文件
	将配置文件vsftpd传送到本地电脑进行配置，配置好后进行覆盖。
	uuid生成地址：https://www.uuidgenerator.net/
	文件的位置位于：/etc/v2ray/config.json
	{
	  "inbounds": [
	    {"sniffing": {
	        "enabled": true,
	        "destOverride": [
	          "http",
	          "tls"
	        ]
	      },
	      "port": 19966, // 服务器监听端口
	      "protocol": "vmess",    // 主传入协议
	      "settings": {
	        "clients": [
	          {
	            "id": "",  // 用户 ID，客户端与服务器必须相同
	            "alterId": 196
	          }
	        ]
	      }
	    },
	        { "sniffing": {
	        "enabled": true,
	        "destOverride": [
	          "http",
	          "tls"
	        ]
	      },
	      "port": 205, // 服务器监听端口
	      "protocol": "vmess",    // 主传入协议
	      "settings": {
	        "clients": [
	          {
	            "id": "",  // 用户 ID，客户端与服务器必须相同
	            "alterId": 196
	          }
	        ]
	      },
	          "streamSettings": {
	        "network": "ws", //使用websocket协议作为传输协议
	        "wsSettings": {
	            "path": "/v2" //WebSocket所使用的HTTP协议路径
	                }
	        }
	    }
	  ],
	  "outbounds": [
	    {
	      "protocol": "freedom",  // 主传出协议
	      "settings": {}
	    },
	        {
	      "protocol": "blackhole",
	      "settings": {},
	      "tag": "block"
	    }
	  ],
	          "routing": {
	                "domainStrategy": "AsIs",
	                "rules": [
	                  {
	                        "type": "field",
	                        "outboundTag": "block",
	                        "protocol": [
	                          "bittorrent"
	                        ]
	                  }
	                ]
	          }
	}
	
	v2ray自带的检查json格式的命令：
	$ /usr/bin/v2ray/v2ray -test -config /etc/v2ray/config.json
	如下提示为json格式正确
	V2Ray v3.26 (die Commanderin) 20180614
	A unified platform for anti-censorship.
	Configuration OK.
	遇到的坑
		○ alterId: 不要设置过大，否则不识别，虽然官方文档给的数字很大。
		○ 端口号不要设置过大，尤其是在用caddy转发的时候，caddy有bug比如你转发一个上万的端口号，无法转发。
	
# 3. 常见的命令
	systemctl status v2ray
	
# 4. caddy安装
	在完成V2Ray的安装和配置后，下面就需要实现Web+TLS的功能了。我们可以使用源码或脚本的方式安装Caddy，但是因为Caddy使用的是Go语音编写的，可能需要golang的编译器，存在一些门槛，所以推荐脚本方式安装。运行下面的命令，等待脚本执行完成。
	curl https://getcaddy.com | bash -s personal
	是用caddy搭建tls简单，证书可以自申请。
# 5. Caddy配置
	我选择使用生产环境的配置，这样比较规范吧。一般情况下会放到 /etc/caddy 里。
	
	mkdir /etc/caddy
	touch /etc/caddy/Caddyfile
	chown -R root:www-data /etc/caddy
	
	除了配置文件，caddy 会自动生成 ssl 证书，需要一个文件夹放置 ssl 证书。
	
	mkdir /etc/ssl/caddy
	chown -R www-data:root /etc/ssl/caddy
	chmod 0770 /etc/ssl/caddy
	
	因为 ssl 文件夹里会放置私钥，所以权限设置成 770 禁止其他用户访问。
	创建好这些文件和目录了之后，我们需要把 caddy 配置成一个服务，这样就可以开机自动运行，并且管理起来也方便。因为目前大多数发行版都使用 systemd 了，所以这里只讲一下如何配置 system。
	
	# 从 github 下载 systemd 配置文件 
	curl -s https://raw.githubusercontent.com/mholt/caddy/master/dist/init/linux-systemd/caddy.service -o /etc/systemd/system/caddy.service 
	sudo systemctl daemon-reload # 重新加载 systemd 配置
	
	将caddy.service文件中以下三项配置选项的注释符#删除，如下：
	
	CapabilityBoundingSet=CAP_NET_BIND_SERVICE
	AmbientCapabilities=CAP_NET_BIND_SERVICE
	NoNewPrivileges=true
	
	启动Caddy服务。
	
	systemctl enable caddy.service # 设置 caddy 服务自启动
	systemctl status caddy.service # 查看 caddy 状态
# 6. Caddy配置
	ray.mydomain.me #你的站点域名
	{
	  log /var/log/caddy/caddy.log
	  tls test@csds.xxx
	  proxy /v2ray localhost:1028 { #注意这里需要与v2ray中配置的监听端口及WebSocket所使用的HTTP协议路径一致
	    websocket
	    header_upstream -Origin
	  }
	}
	注意要有空格
	第四行的 tls 指令告诉 caddy 为网站开启 https 并自动申请证书，后面的 email 参数是告知 CA 申请人的邮箱。（caddy 会默认使用 let’s encrypt 申请证书并续约，很方便吧）
	
	这里需要注意一点的是，因为caddy.service中默认的进程运行用户和用户组为www-data，所以日志文件也需要让www-data用户能够有权限读写，当然你也可以选择将日志文件存放在配置文件目录中。
	
	touch /var/log/caddy/caddy.log
	chown -R root:www-data /var/log/caddy/
	chmod 777 /var/log/caddy/caddy.log 
	
# 7. 配置v2rayN客户端
	下载地址：https://github.com/2dust/v2rayN
	
