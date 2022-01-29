---
title: Git基本命令.md
date: 2018-07-23 20:40:37.0
updated: 
categories: Git
tags: 
comments: true 
---

title: Git基本命令详解及示例
date: '2018-07-23 20:40:37'
updated: '2018-08-16 00:26:49'
tags: [Git, 后端]
permalink: /articles/2018/07/23/1532347122477.html
---
![git_big_jb51jpg](https://res.quinntian.xyz//file/2018/07/41a7bd07145c4182940a798877a487df_git_big_jb51.jpg) 
## 1.Git设置签名
* 项目/仓库级别
1.范围
**只对当前的仓库有效**
2.命令
``` git config user.name xx```
```	git config user.email xx@xx.co```
* 全局级别
1.范围
**对当前登陆用户有效**
2.命令
```git config --global```
* 级别优先级
 就近原则：2者都有时采用项目级别
## 2.Git初始化仓库
* 命令
``` git init ```
## 3.Git查看状态
* 命令
```git status ```
* 工作区、暂存区、仓库区都无文件时状态
![Snipaste_20180723_162933png](https://res.quinntian.xyz//file/2018/07/b8449a4c6a10497e9a1028cdfdf83169_Snipaste_20180723_162933.png)
* 工作区、暂存区有文件、仓库区无文件时
![Snipaste_20180723_163151png](https://res.quinntian.xyz//file/2018/07/444a4f4d2ce1462bbb0297f13a7ae18f_Snipaste_20180723_163151.png)
![Snipaste_20180723_164402png](https://res.quinntian.xyz//file/2018/07/51e89c27a5414c75826aa9993ed8f350_Snipaste_20180723_164402.png) 
## 4.Git删除暂存区文件命令
``` git rm --cached[file]```
![Snipaste_20180723_165121png](https://res.quinntian.xyz//file/2018/07/b6b8d70261384568a5235d88ca252d29_Snipaste_20180723_165121.png) 
## 5.Git提交到仓库命令
``` git commit –m[信息][filename] ```

* 工作区、暂存区、仓库区都有文件
![Snipaste_20180723_165635png](https://res.quinntian.xyz//file/2018/07/09811684c4054441b10d9476b1493884_Snipaste_20180723_165635.png) 
![Snipaste_20180723_165743png](https://res.quinntian.xyz//file/2018/07/84ff456ba07045db89e803c2ece7e070_Snipaste_20180723_165743.png) 
继续向文件中添加内容
![Snipaste_20180723_170530png](https://res.quinntian.xyz//file/2018/07/132e65b13d5f43c4bd35108924ddefed_Snipaste_20180723_170530.png) 
此时Git status
![Snipaste_20180723_170107png](https://res.quinntian.xyz//file/2018/07/8899ce3111ae482f8b6935745dc1dbf6_Snipaste_20180723_170107.png) 
## 6.Git添加到暂存区
```git add [file]```
![Snipaste_20180723_170504png](https://res.quinntian.xyz//file/2018/07/daff6a09fae7480197505868c6ef723e_Snipaste_20180723_170504.png) 
## 7.Git查看历史记录
### 7.1 最完整的形式
```git log```
![Snipaste_20180723_172635png](https://res.quinntian.xyz//file/2018/07/7d0052114a0c4957b38b88100e360f4c_Snipaste_20180723_172635.png) 


多屏显示相关操作
1.空格向下翻页
2.b上翻页
3.q下翻页

### 7.2 简洁的形式
```git log --pretty=oneline ```
![Snipaste_20180723_172752png](https://res.quinntian.xyz//file/2018/07/f71416c5cec14515bf700ef6700c89e5_Snipaste_20180723_172752.png) 

### 7.3 更简洁的形式
```git log --oneline```
![Snipaste_20180723_172823png](https://res.quinntian.xyz//file/2018/07/1e624849669341e5864d1505d4732b86_Snipaste_20180723_172823.png) 


### 7.4 显示步数的方式
```git relog```
![Snipaste_20180723_172848png](https://res.quinntian.xyz//file/2018/07/1ec4aebb753a4aa0816688fba1c3b68b_Snipaste_20180723_172848.png) 
![Snipaste_20180723_174108png](https://res.quinntian.xyz//file/2018/07/9e9bbbb134c948c594b485c03e902551_Snipaste_20180723_174108.png) 

## 8.Git回退

### 8.1 回退本质

![Snipaste_20180723_173044png](https://res.quinntian.xyz//file/2018/07/26d100c9e83444c9b6cdcd2faffe6fce_Snipaste_20180723_173044.png)
### 8.2 基于索引值回退
先查看历史记录
``` git reset [索引值]```
![Snipaste_20180723_172823png](https://res.quinntian.xyz//file/2018/07/c8ee605037ff4a348aee9caf377c80c7_Snipaste_20180723_172823.png) 
![Snipaste_20180723_174108png](https://res.quinntian.xyz//file/2018/07/9d6e90c6f3bd4253afb0403456946b73_Snipaste_20180723_174108.png)
### 8.3 使用^
``` git relog``` 只能查看以当前**为起点**的历史记录
``` git reset --hard head[^] ^``` 回退几步就是几个^ 
 ![Snipaste_20180723_174852png](https://res.quinntian.xyz//file/2018/07/782d82c6d5d74508be4d264c653e5586_Snipaste_20180723_174852.png) 

### 8.4 使用~[n]
``` git reset --hard head[~n]```
### 8.5 相关参数
![Snipaste_20180723_175326png](https://res.quinntian.xyz//file/2018/07/6c31992ea8a74e7da0abef54f99a7c30_Snipaste_20180723_175326.png) 

**[soft]参数** 本地库移动指针
**[mixed]参数** 本地库移动head指针和重置暂存区
**[hard]**参数 本地库、暂存区、工作区重置
### 8.6 删除文件的找回
前提：删除之前，文件存在时的状态提交到本地库
操作：```git reset --hard HEAD[指针位置]```

* 删除操作提交到本地库，指针位置指向历史记录
* 删除操作尚未提交到本地库，指针位置直接使用HEAD

## 9.Git比较文件差异命令

* 命令```git dff [filename]```
git工作区和暂存区比较
示例
![imagepng](https://res.quinntian.xyz//file/2018/07/87947e464ab747cf937ff6966aec74b8_image.png) 
![imagepng](https://res.quinntian.xyz//file/2018/07/c9acaa7be1fb46fc9e9b226ec578086b_image.png)
* 命令```git dff [本地库中的历史版本][filename]```
将工作区中的文件和本地库历史记录作比较
示例
``` git diff HEAD [file] 或git diff head^ [file]```
* 不指定文件名的时候比较当前工作区中所有的文件
示例
``` git diff head或git diff ```

10.版本控制命令
版本控制中使用多条线同时推进多个任务
![imagepng](https://res.quinntian.xyz//file/2018/07/f838925f4bb542449ba61fffaaafe424_image.png) 
同时并行推进多个功能开发
各个分支开发过程中，某分支开发分支不会对其他分支有任何映像
### 10.1 查看分支
```git branch -v```
![imagepng](https://res.quinntian.xyz//file/2018/07/0e8c787edc7246a6b79e3e68c134b96d_image.png) 


### 10.2 创建分支
```git branch [分支名]```
![imagepng](https://res.quinntian.xyz//file/2018/07/058db832b317423e9900ab807651242d_image.png) 
![imagepng](https://res.quinntian.xyz//file/2018/07/9de37d7dfb68491e99375d923658f0a6_image.png) 

### 10.3 切换分支
```git checkout [分支名]```
![imagepng](https://res.quinntian.xyz//file/2018/07/e408ac349838486e8a2152912299b733_image.png) 

### 10.4 合并分支
``` git merger [要合并的分支]``` **要合并分支首先切换到主分支**

示例

![imagepng](https://res.quinntian.xyz//file/2018/07/1eb354c66f09479d9103e020a2510961_image.png) 
![imagepng](https://res.quinntian.xyz//file/2018/07/893edc14012d4e449bce739f78cdf8df_image.png) 
### 10.4 解决冲突
冲突的表现
会自动合并并标记冲突
![imagepng](https://res.quinntian.xyz//file/2018/07/c343eb632eef47aba77bbc1187f59db0_image.png) 


冲突的解决

* 1.编辑文件，把文件修改到满意程度
* 2.git add[文件名]
* 3.git commit -m[]此时不需要加文件名


<Vssue title="Vssue Demo" />








































