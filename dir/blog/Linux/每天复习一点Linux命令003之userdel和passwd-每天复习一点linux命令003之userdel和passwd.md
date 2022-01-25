---
title: 每天复习一点Linux命令003之userdel和passwd
date: 2020-02-13 23:25:00.0
updated: 2020-02-13 23:25:00.0
categories: Linux
tags: 
comments: true
---

# userdel

- 含义：删除用户

- 格式 `userdel [option]`
- 可选项 -r
  - 含义：同时删除用户以及home下的所有关于该用户的文件

# passwd

- 含义：使用新建用户命令`useradd`时并没有指定密码，所以默认无法使用，必须指定密码。

- 格式：`passwd [option] [username]`

- 可选项

  | 选项 |                             意义                             |
  | :--: | :----------------------------------------------------------: |
  |  -l  |                   锁定用户口令，无法使用。                   |
  |  -u  |                           口令解锁                           |
  |  -d  | 关闭用户登录时输入密码的功能，即无需密码登录，权限ROOT下可以操作。 |
  |  -f  |                   用户下次登录必须修改密码                   |
  |  -s  |                      指定用户密码的种类                      |

- 示例

  新建用户后，这时用户并不能使用，必须设置密码

  `passwd wang`

  ![图片](https://raw.githubusercontent.com/QuinnTian/imgchr/master/imgs/20200213232036.png)

  使用`tail -l /etc/shadow`查看wang用户的！！！已经取消。

