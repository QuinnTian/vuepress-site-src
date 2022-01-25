---
title: 每天复习一点Linux命令010之find
date: 2020-02-20 21:48:55.0
updated: 2020-04-01 21:51:00.0
categories: Linux
tags: 
comments: true
---



- 用途：查找文件。

- 格式：`find 路径 选项 操作`

- 选项

  - -name 根据文件名查找
  - -perm 根据权限查找
  - -prune 不在当前目录查找
  - -user 根据文件所属者查找
  - -group 根据文件所属用户组查找
  - -mtime -n+n 第一个n根据文件距离n天内，第二个n根据文件在第n天前
  - -nogroup 查找没有用户组的文件，在/etc/groups不存在
  - -nouser 查找没有所属主的文件，在/etc/passwd
  - -newer file1!file2 查找比1新比2旧的文件
  - -type 根据文件类型查找
    - b 块设备
    - d 目录
    - c 字符设备文件
    - p 管道文件
    - l  符号链接文件
    - f  普通文件

  - -size n:[c] 查找长度为n块的文件,带有c表示文件长度按照字节统计
  - -depth 查找文件现在本目录查找，然后在子目录查找

- 操作

  - -print 将匹配的文件标准输出
  - -exec 对匹配的文件执行该操作后的命令，格式为`-exec command {} \`
  - -ok 安全模式执行，就是在执行指令前给出提示

- 场景

  - `find . -name "t*"-perm 744 -print`
  - `find /etc -type f -name "rc" exec ls -l {} \