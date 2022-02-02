---
title: Linux 系统管理
date: 2022-02-02 13:41:24
update:
article: false
permalink: /docs/linux/1643780459.html
---




# Linux 系统管理

## 进程管理

主要包含

- 查看进程
- 实时检测
- 结束进程

---

### 查看进程

ps
![image-20220202125707370](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202125707370.png)

参数列表有三种风格

- Unix 风格 前面加单破折号
- BSD 风格 不加破折号
- GNU 风格 加双破折号

#### Unix 风格参数

![image-20220202130104042](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202130104042.png)

![image-20220202130145743](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202130145743.png)

例子1 `ps -ef` 显示所有进程并以长格式输出

![image-20220202130333821](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202130333821.png)

- 各列含义

  ![image-20220202130431069](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202130431069.png)

![image-20220202130751967](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202130751967.png)

例子2 `ps -l` 长列表

![image-20220202130531652](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202130531652.png)

---

#### BSD 风格参数

![image-20220202130932289](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202130932289.png)

![image-20220202131010898](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202131010898.png)

例子1 `ps l`

![image-20220202131541275](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202131541275.png)

- 各列含义

  ![image-20220202131233872](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202131233872.png)

  - STAT 列含义

![image-20220202131343330](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202131343330.png)

---

#### GNU 长参数

![image-20220202131744276](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202131744276.png)

![image-20220202131807918](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202131807918.png)

例子 `ps --forest` 绘制层级子进程

![image-20220202131917955](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202131917955.png)

---

### 实时监测

top 

![image-20220202132544429](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202132544429.png)

第一部分

- 第一行 系统时间、系统运行时间、系统平均负载数（最近1、5、15分钟）
- 第二行 任务数即进程数，处于休眠或活跃或停止或僵化（进程完成但是父进程没有响应）等数量
- 第三行 显示CPU概要信息
- 第四行 内存概要信息
- 第五行 交换空间概要信息

第二部分

![image-20220202133235781](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202133235781.png)

![image-20220202133254200](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202133254200.png)

- top **交互式命令**

  - 默认按照 CPU 百分比输出

  - 输入 f 选择根绝哪一列输出

    ![image-20220202133448140](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202133448140.png)

- 输入 d 指定轮询间隔

  ![image-20220202133545269](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202133545269.png)

- 输入 q 退出

---

### 结束进程

#### kill 命令



#### killall 命令





未完待续