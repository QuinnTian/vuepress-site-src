---
title: linux文件权限相关命令
date: 2021-03-01 22:46:24.0
updated: 2021-03-01 22:56:18.0
categories: Linux
tags: 
comments: true
---

# 权限的基本概念
一个文件/目录如下
```java
类型标识 rwx rwx rwx
```
- 第一组文件拥有者权限
- 第二组文件拥有者所属组权限
- 第三组其他用户的权限
- `r`权限：
	- 文件：可以看、可以复制
	- 目录：可以看目录有多少文件、不能看具体某个文件里面内容
- `w`权限：
	- 文件：可以修改、不可以删除
	- 目录：可以创建、删除、重命名目录里面的文件
- `x`表示可执行权限
	- 文件：程序需要可执行不需要可读，脚本需要可执行和可读权限
	- 目录：可以进入目录并且访问目录中文件
- 与访问权限有关的用户
	- 文件拥有者 如上第一组
	- 同组用户 如上第二组
	- 其他用户 如上第三组
- 权限表示法
	- 字母表示法
		`ugoa` `+-=` `rwx`
		- u 文件拥有者
		- g 同组用户
		- o other其他用户
		- a all所有用户
		- +增加权限
		- -减少权限
		- =指定权限
	- 数字表示法
	3位二进制代码1表示有0表示无，转换成十进制就是0-7个数字
	7种
		- --- 000  
		- --x 001 1 可执行
		- -w- 010 2 可写
		- -wx 011 3 可写可读
		- r-- 100 4 可读
		- r-x 101 5 可读可执行
		- rw- 110 6 可读可写
		- rwx 111 7 可读可写可执行

# 结合命令修改权限
## 1. chmod修改目录或文件权限
```python
运行前
drwxwxr-x. 2 root root    6 3月   1 18:12 test1
chmod g+r /test1
运行结果
drwxrwxr-x. 2 root root    6 3月   1 18:12 test1
	
chmod -v 777 test1
mode of "test1" changed from 0775 (rwxrwxr-x) to 0777 (rwxrwxrwx)
```
- `-v`表示显示详细变更信息
- `-R`表示目录下所有文件都变更权限

## 2.umask设置新建文件或目录的权限
`umask`对于目录的最大权限是777`rwxrwxrwx`，对于文件最大权限是666`rw-rw-rw-`
指定一个权限比如你要指定033，那么实际设置的权限是`744`和`644`，前者目录，后者文件，实际原理是`异或`运算 033的二进制与777的二进制`异或`，644与666的二进制`异或`
case
```python
umask
0022
mkdir test2
ls -l
总用量 8
-rw-------. 1 root root 1567 3月   1 16:16 anaconda-ks.cfg
-rw-r--r--. 1 root root 1615 3月   1 16:18 initial-setup-ks.cfg
drwxr-xr-x. 2 root root    6 3月   1 22:21 test2
```
- 也就是说明默认的权限被设置成`022`，那么设置的目录默认就是`777异或022=755`，也就是`rwxr-xr-x` `=111101101`
```python
touch file1
ls -l
总用量 8
-rw-------. 1 root root 1567 3月   1 16:16 anaconda-ks.cfg
-rw-r--r--. 1 root root    0 3月   1 22:27 file1
-rw-r--r--. 1 root root 1615 3月   1 16:18 initial-setup-ks.cfg
drwxrwxrwx. 2 root root    6 3月   1 18:12 test1

```
- 那么新建文件的默认权限就是`666异或022=644`即`rw-r--r--`
>比较位相同0，不同1->异或eor^
>异或在线运算器：https://www.jisuan.mobi/pmbbmb3bzzuHuJUi.html
- `umask`**重启后失效**
## 3.chown修改文件或目录拥有者
`chown  用户名 文件或目录`
case1
```python
ls -l
总用量 8
-rw-------. 1 root root 1567 3月   1 16:16 anaconda-ks.cfg
-rw-r--r--. 1 root root    0 3月   1 22:27 file1

chown tom file1 
ls -l
总用量 8
-rw-------. 1 root root 1567 3月   1 16:16 anaconda-ks.cfg
-rw-r--r--. 1 tom  root    0 3月   1 22:27 file1

```
`chown 用户:用户组 文件或目录`
case2
```python
chown tom:tom   file1 
ls -l
总用量 8
-rw-------. 1 root root 1567 3月   1 16:16 anaconda-ks.cfg
-rw-r--r--. 1 tom  tom     0 3月   1 22:27 file1

```
4.chgrp改变文件或目录的组
`chgrp 新组 文件名或目录`

