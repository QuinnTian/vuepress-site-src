---
title: 每天复习一点Linux命令004之用户组命令groupadd、groupmod、groupdel
date: 2020-02-14 23:41:22.0
updated: 2020-02-14 23:41:22.0
categories: Linux
tags: 
comments: true
---

用户组：用户组与用户多对多。在创建文件或目录时都会制定一个用户组。

# groupadd

- 用途：创建用户组

- `groupadd [option] [groupname]`

- 选项

  |  选项  |      含义       |
  | :----: | :-------------: |
  | -g GID |     指定GID     |
  | -o GID | 指定不唯一的GID |

  

# groupmod 

- 用途：修改用户组名或用户组号

- `groupmod [option] [groupname]`

- 选项

  |  选项  |    含义     |
  | :----: | :---------: |
  | -g GID | 指定新的GID |
  | -o GID | 重复使用GID |
  |   -n   | 用户组改名  |

groupdel

- 用途：删除用户组

  - 注意点：用户组内必须无用户，否则先执行删除用户操作。

  