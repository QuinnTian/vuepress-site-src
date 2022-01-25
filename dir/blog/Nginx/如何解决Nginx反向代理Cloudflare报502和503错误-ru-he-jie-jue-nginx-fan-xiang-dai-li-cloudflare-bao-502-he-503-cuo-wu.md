---
title: 如何解决Nginx反向代理Cloudflare报502和503错误
date: 2021-02-22 17:07:01.0
updated: 2021-02-22 17:07:01.0
categories: Nginx
tags: 
comments: true 
---

HTTPS
刚开始反向代理Cloudflare的HTTPS站点时不是502就是403把我头的搞大了，网络上各种复制粘贴的文章都看吐了 Nginx反向代理Cloudflare出现502,403解决办法插图
首先源站配置好SSL证书，然后去Cloudflare开启SSL（默认开启）
Cloudflare
Cloudflare
如果源站没有开启强制跳转HTTPS可以在Cloudlfare开启跳转
CloudflareCloudflare
接下来就是反向代理配置了（有坑）
删库塔配置删库塔配置
如果你直接将HTTP改成HTTPS，恭喜你，喜提502
502502
然后网上的给的解决办法五花八门，真真假假假假真真，实践才能辩真假。

``` xml
proxy_ssl_name $host;
proxy_ssl_server_name on;

```

网上说是将以上配置放进反向代理配置内即可。
删库塔配置

删库塔配置
结果还是502
将这段代码放进location所有区块内。
删库塔配置删库塔配置
结果还是502
其实代码本身没问题，只是有小瑕疵

```
proxy_ssl_name 你反向代理的域名;
proxy_ssl_server_name on;
```
改成这样即可反代成功。
反代成功

反代成功
切记：如果反代机没有IPv6而你又解析了Cloudflare的CNAME，会导致无法连接上游的问题。建议自选IPv4接入，或者关闭反代机的IPv6。还有一个办法就是使用hosts强指IPv4。