---
title: BBR加速配置
date: 2020-02-17 00:00:44.0
updated: 2020-02-17 00:00:44.0
categories: 其他
tags: 
comments: true
---

bbr这个东西真乃神器，所以如果你的代理服务器在国外，强烈建议开启bbr的功能。我的小鸡使用的是debian 9，默认内核是支持bbr加速的，但是没有开启。如果你的系统过于陈旧，需要更新linux内核至4.9以上并编译安装bbr。
开启方法

	1. 修改系统变量

	echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
	echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf

	2. 保存生效

	sysctl -p

	3. 查看内核是否已开启BBR

	sysctl net.ipv4.tcp_available_congestion_control

	显示以下即已开启：

	net.ipv4.tcp_available_congestion_control = bbr cubic reno

	4. 查看BBR是否启动

	lsmod | grep bbr

	显示以下即启动成功：

	# lsmod | grep bbr tcp_bbr 20480 14

