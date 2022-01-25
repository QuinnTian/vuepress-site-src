---
title: 每天复习一点Linux命令002之usermod命令
date: 2020-02-12 18:26:34.0
updated: 2020-02-13 23:16:25.0
categories: Linux
tags: 
comments: true
---

# usermod命令

- 功能：修改用户账号各种属性

- 格式：usermod [option] [username]

- 选项

  | 选项            | 意义                 |
  | --------------- | -------------------- |
  | -d [directory]  | 修改用户登入时目录   |
  | -e [days]       | 修改账号有限期       |
  | -g [group]      | 修改用户所属组☆      |
  | -l [login name] | 修改用户登录时的名称 |
  | -p [password]   | 修改用户密码☆        |
  | -s [shell]      | 修改用户登录的shell  |

  - 注意点
    - `usermod -p` 修改用户密码是明码，在/etc/shadow显示明码，用`tail -l /etc/shadow`可查。
    - 使用`usermod`命令修改用户名，不能修改当前登录用户，且必须有root权限。