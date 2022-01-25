---
title: VSCode配置Picgo插件实现GitHub当图床
date: 2022-01-05 00:34:57
update:
categories: 其他
tags: 
    - VSCode
    - 图床
    - PicGo
comments: true
---
利用VSCode的PicGo插件可以直接实现截图粘贴自动上传并返回MD格式插入到文档中
<!-- more -->
#
# 1.安装VSCode
# 2.VSCode配置
侧面插件市场搜索PicGo安装，安装后重启，再次打开插件市场，选择PicGo右下方的设置小按钮，选择扩展设置，配置Github有关信息，具体配置如图和下面配置信息
```yml
配置信息说明
current:选择github
branch:选择你所在分支，一般是master或main
custom url:选择CDN用于加速图片输出，用如果不配置，会导致图片无法预览
    配置格式https://cdn.jsdelivr.net/gh/你的GitHub用户名/存放图床的仓库名
path:仓库下的文件夹
    如果需要存放在某个仓库下文件夹
    比如picgo仓库里的img文件夹
        img/
        不可以省略/，否则不会识别为文件夹
        不可以写成/img，否则会识别服务端错误
repo:你的GitHub用户名/仓库名
token:GitHub申请的token
    申请步骤
    登录GitHub后点击头像下拉选择setting，选择developer setting，选择personal access token，新建一个token，输入名称和设置有效期，勾选repo权限，生成后的授权码赋值到此
```
![20220104220611](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/20220104220611.png)
# 3.快捷键说明
   ```yml
    win/unix系统
        ctrl alt u 从剪贴板复制上传
        ctrl alt e 弹出文件管理器选择上传
        ctrl alt o 弹出截屏上传
    苹果系统
        ctrl opt u
        ctrl opt e
        ctrl opt o
   ```
   


