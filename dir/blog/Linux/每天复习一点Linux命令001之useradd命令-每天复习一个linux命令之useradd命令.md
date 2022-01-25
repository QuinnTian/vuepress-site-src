---
title: 每天复习一点Linux命令001之useradd命令
date: 2020-02-11 23:01:09.0
updated: 2020-02-13 23:16:38.0
categories: Linux
tags: 
comments: true
---

Linux用户管理

Linux用户分为三种

- root用户

  系统唯一，具有最高权限，可以执行任何命令的用户。

- 虚拟用户

  不能登录，自身拥有，后期可以自行添加。

- 普通用户

  权限受限，都是用户自行添加的。

# 添加用户命令

- 命令：useradd = adduser
- 格式：`adduser [option] [username]`
  - 在/etc/passwd文件增加一条记录。
  - /home/下增加一个用户目录。
  - /etc/skel/目录中的文件复制到用户目录中。这个目录是用来存放用户配置文件。

用户创建完后不能登陆必须使用password命令设置用户密码才能使用。

- [option]含义

  | 选项            | 含义                                                    |
  | --------------- | ------------------------------------------------------- |
  | -g [inital_grp] | 指定用户所属的组，不指定自动创建同名的组。☆             |
  | -G [grp]        | 用户添加附属组。                                        |
  | -D              | 用于现实或设置useradd命令使用的默认值。                 |
  | -d [directory]  | 指定用户主目录，若目录不存在，则用-m选项来创建主目录。☆ |
  | -m              | 使用的目录如果不存在，自动建立☆                         |
  | -u UID          | 指定用户用户号。                                        |

- 使用`tail-l`查看用户/etc/passwd和/etc/shadow文件，前者用于查看新建目录用户信息，后者用于查看用户密码信息。

  ![](https://raw.githubusercontent.com/QuinnTian/imgchr/master/imgs/20200211225302.png)

  ![](https://raw.githubusercontent.com/QuinnTian/imgchr/master/imgs/20200211225659.png)

