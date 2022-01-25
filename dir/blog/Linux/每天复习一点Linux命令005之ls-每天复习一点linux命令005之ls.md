---
title: 每天复习一点Linux命令005之ls
date: 2020-02-15 23:31:36.0
updated: 2020-02-15 23:31:36.0
categories: Linux
tags: 
comments: true
---

> 相对路径：用户工作目录开始算。
> 绝对路径：根目录开始算。
> .. 父目录 .当前目录

- 用途：列出目录或文件

- 格式：list [option] file or directory

- option

  | option |                             mean                             |                                                              |
  | :----: | :----------------------------------------------------------: | ------------------------------------------------------------ |
  | **-a** |           显示指定目录下的子目录、文件、隐藏文件。           | ![image.png](https://quinntian.com/upload/2020/2/image-ff90a923f28d4d05b585fb29b804067e.png) |
  | **-A** |     显示指定目录下的子目录、文件、隐藏文件，不含. 和 ..      | ![image.png](https://quinntian.com/upload/2020/2/image-efc82be6a7e242a4afe4b9c8cd2d28b8.png)|
  |   -b   |         对文件名中不可以显示的字符用八进制字符显示。         |                                                              |
  |   -c   |                     按文件修改时间排序。                     |![image.png](https://quinntian.com/upload/2020/2/image-527a8a16ae314daea01b0c74d06b44af.png)|
  |   -C   |                        分成多列显示。                        | ![image.png](https://quinntian.com/upload/2020/2/image-17aeee23e08344c4a309447ca0d9e7b5.png) |
  |   -d   | 参数是目录，直接显示目录名，与-l 同用，用于显示该目录详细信息。 | ![image.png](https://quinntian.com/upload/2020/2/image-50a52af3bedc495d9c2f061f954f9ac1.png)|
  | **-l** | 长格式显示文件信息。<br />文件类型与权限、文件链接数、文件所属用户、文件所属组、文件大小、文件最近修改时间。 | ![image.png](https://quinntian.com/upload/2020/2/image-d394edee30f74df9b92f9fca3cb5b87c.png) |
  |   -L   |            指定文件若为链接文件，则查出实际文件。            |                                                              |
  |   -m   |                  跨页显示，中间用逗号隔开。                  | ![image.png](https://quinntian.com/upload/2020/2/image-5ca3b1099ebc4787b45f45db8764ac84.png) |
  |   -n   |                 同-l，所属用户和组用ID来显示                 | ![image.png](https://quinntian.com/upload/2020/2/image-171d42129ba642bc8883106834249af2.png)- |
  |   -o   |                     同-l，不显示所属用户                     |                                                              |
  |   -p   |                         在目录后面/                          |                                                              |
  |   -q   |                把文件名中补课现实部分用？代替                |                                                              |
  |   -r   |                 按字母排序或最早优先顺序显示                 |                                                              |
  |   -R   |              递归显示指定目录下各个子目录的文件              |                                                              |
  |   -s   |                   给出每个目录项，所占块数                   |                                                              |
  |        |                                                              |                                                              |
  |   -u   |                   按照文件上次读取时间排序                   |                                                              |
  |   -x   |                    按行显示出各排序项信息                    |                                                              |