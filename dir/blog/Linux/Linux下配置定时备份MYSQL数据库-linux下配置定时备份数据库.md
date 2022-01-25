---
title: Linux下配置定时备份MYSQL数据库
date: 2020-01-31 01:26:20.0
updated: 2020-02-16 23:53:34.0
categories: Linux
tags: 
comments: true
---

# 0. 写在前面
**数据无价 定时备份**
# 1. 创建备份数据库存放处
```xml
mkdir -p /backup/data
```
# 2. 编写脚本
```xml
#!/bin/bash
DATE=`date +%Y%m%d%H%M`                #备份日期时间
DATABASE=                              #备份数据库名称
DB_USERNAME=root                       #数据库账号
DB_PASSWORD=""       		       #数据库密码
BACKUP_PATH=/backup/data               #备份数据，禁止放在网站目录下

#备份命令

/usr/bin/mysqldump-u $DB_USERNAME-p $DB_PASSWORD -h 127.0.0.1 -R --opt $DATABASE | gzip > ${BACKUP_PATH}\/${DATABASE}_${DATE}.sql.gz

#删除7天前备份文件
find ${BACKUP_PATH} -mtime +7 -name "${DATABASE}_*.sql.gz" -exec rm -f {} \;
```
# 3. 测试脚本
给脚本执行权限 #chmod +x mysql_backup.sh
sh 你的脚本
# 4. 配置定时任务
`crontab -e`设置定时要求
``` xml
5 * * * * /mysql_backup.sh #设置每天五点调用
```
`crontab -l`列出当前任务
`service crontab reload`重新载入配置文件
# 6. 关于crontab命令
## 6.1 格式
`crontab [ -u user ] { -l | -r | -e }`
```xml
-e : 执行文字编辑器来设定时程表，内定的文字编辑器是 VI，如果你想用别的文							 	 
字编辑器，则请先设定 VISUAL 环境变数来指定使用那个文字编辑器(比如说 setenv 
VISUAL joe)
-r : 删除目前的时程表
-l : 列出目前的时程表
```
- 其中 f1 是表示分钟，f2 表示小时，f3 表示一个月份中的第几日，f4 表示月份，f5 表示一个星期中的第几天。program 表示要执行的程序。
- 当 f1 为 * 时表示每分钟都要执行 program，f2 为 * 时表示每小时都要执行程序，其馀类推
 -当 f1 为 a-b 时表示从第 a 分钟到第 b 分钟这段时间内要执行，f2 为 a-b 时表示从第 a 到第 b 小时都要执行，其馀类推
- 当 f1 为 */n 时表示每 n 分钟个时间间隔执行一次，f2 为 */n 表示每 n 小时个时间间隔执行一次，其馀类推
- 当 f1 为 a, b, c,... 时表示第 a, b, c,... 分钟要执行，f2 为 a, b, c,... 时表示第 a, b, c...个小时要执行，其馀类推
```xml
*    *    *    *    *
-    -    -    -    -
|    |    |    |    |
|    |    |    |    +----- 星期中星期几 (0 - 7) (星期天 为0)
|    |    |    +---------- 月份 (1 - 12) 
|    |    +--------------- 一个月中的第几天 (1 - 31)
|    +-------------------- 小时 (0 - 23)
+------------------------- 分钟 (0 - 59)
```
## 6.2 例子
```xml
每月每天每小时的第 0 分钟执行一次 /bin/ls

0 * * * * /bin/ls
在 12 月内, 每天的早上 6 点到 12 点，每隔 3 个小时 0 分钟执行一次 /usr/bin/backup

0 6-12/3 * 12 * /usr/bin/backup
周一到周五每天下午 5:00 寄一封信给 alex@domain.name

0 17 * * 1-5 mail -s "hi" alex@domain.name < /tmp/maildata
每月每天的午夜 0 点 20 分, 2 点 20 分, 4 点 20 分....执行 echo "haha"

20 0-23/2 * * * echo "haha"
下面再看看几个具体的例子：

0 */2 * * * /sbin/service httpd restart  意思是每两个小时重启一次apache 

50 7 * * * /sbin/service sshd start  意思是每天7：50开启ssh服务 

50 22 * * * /sbin/service sshd stop  意思是每天22：50关闭ssh服务 

0 0 1,15 * * fsck /home  每月1号和15号检查/home 磁盘 

1 * * * * /home/bruce/backup  每小时的第一分执行 /home/bruce/backup这个文件 

00 03 * * 1-5 find /home "*.xxx" -mtime +4 -exec rm {} \;  每周一至周五3点钟，在目录/home中，查找文件名为*.xxx的文件，并删除4天前的文件。

30 6 */10 * * ls  意思是每月的1、11、21、31日是的6：30执行一次ls命令
```
## 6.3 其他
```xml
/sbin/service crond start //启动服务

/sbin/service crond stop //关闭服务

/sbin/service crond restart //重启服务

/sbin/service crond reload //重新载入配置
```

