---
title: 每天复习一点Linux命令009之SUID、SGID
date: 2020-02-20 20:06:17.0
updated: 2020-04-01 21:50:55.0
categories: Linux
tags: 
comments: true
---

- SUID
  - 原理：在用户位的rwx的x位设置成s（rw<u>x</u> rwx rwx），目的就是让文件以其原有所属者进行运行。
  - 格式：`chmod u+s`,比较典型的就是`passwd`命令。
  - 场景：首先passwd文件是只有root用户才能读写，但是其他用户如果想要修改密码呢？切换到root在修改这就显得很麻烦了。但是如果设置s位，那么普通用户修改自己密码也就可以了。
- SGID
  - 原理：就是把所属组位的rwx的x设置为s(rwx rw<u>x</u> rwx)。
  - 作用
    - 1.针对文件设置SGID：首先只有二进制可执行文件才能够设置SGID，作用就是该文件具有所属组的特权（见场景）。
    - 2.针对目录设置SGID，则复制到该目录下的所有文件，文件的都会设置成所属组的权限，除非你在复制文件命令时用cp -p选项。
  - 格式：`chmod g+s`
  - 场景：`/dev/kmenm权限为cr-- r-- ---root system`使用ps命令读取该文件，ps的权限（ps命令也是一个文件，可执行文件）为`-r-xr-sr-x 1 bin system`，所以一般用户要是读取kmenm文件的话会自动获取system组的权限。