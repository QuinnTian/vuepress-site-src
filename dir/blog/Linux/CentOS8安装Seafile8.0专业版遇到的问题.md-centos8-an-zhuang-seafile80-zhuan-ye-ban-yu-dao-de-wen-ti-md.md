---
title: CentOS8安装Seafile8.0专业版遇到的问题.md
date: 2021-03-09 23:33:08.728
updated: 2021-03-09 23:33:08.728
categories: Linux
tags: 
comments: true
---

# 写在前面

- 我是用手动安装的，如果是用脚本安装和docker安装请忽略。
- 另外如果你想在centos7下装7.1+或8.0,必须装好python3.
- 中文版没找到专业版下载地址，直接去英文版https://download.seafile.com/d/6e5297246c/?p=/pro 3用户免费，中文官网并没有明确指明

# 安装参考文档
最好看英文文档和中文文档结合，有些中文文档并没有讲
英文文档，比如装着装着报错，肯定是没安装某些库。seafile安装会把python一家老小许多库全都装都一边。
- 英文文档
https://manual.seafile.com/deploy_pro/office_documents_preview/#faq-about-office-document-preview
- 中文文档
https://cloud.seafile.com/published/seafile-manual-cn/deploy_pro/office_documents_preview.md
# 环境
系统环境：centos8.0
# 安装中遇到的问题
## 没有安装Mysqlclient报错
因为centos8是用的python3
`pip3 install MySQLdb`前提是你要安装了pip3
否则`yum -y install pip3`
## # fatal error: Python.h: No such file or directory
没有安装`python3-dev`
`yum -y install install python3-dev`
## 已经启动seahub，没有报错，但是外网无法访问
排除防火墙和安全组、SElinux
因为`seafile7.0以后`就不支持直接8000访问了
编辑seafile安装目录下的`gunicorn.conf 把 bind=127.0.0.1 改成0.0.0.0`就可访问了
## seafile LibreOffice seahub前端报错问题，报服务器内部错误，报文件转换失败
1. 升级LibreOffice版本
2. 先查看日志，虽然中文文档写让看seafevent.log但是里面是不显示office报错的，英文文档写让看seahub.log
/conf/seafevents.conf，添加
[OFFICE CONVERTER]
enabled = true
host = 127.0.0.1 # 本机的IP地址，默认 127.0.0.1
port = 6000 # 端口，默认6000
workers = 1 # 并发运行 libreoffice 的进程数
outputdir = /tmp/ # 转换后的 office/pdf 文件的缓存路径。 默认是 /tmp/.
打开 seafile/conf/seahub_settings.py，添加:
OFFICE_CONVERTOR_ROOT = ‘http://127.0.0.1:6000/’ # 与seafevents.conf中的 host 和 port 保持一致
重启seafilehub
3. **如果重启后报文件转换失败**，
还有一种可能，这点再英文文档中提到了，但是中文文档没写`This error indicates you have not installed the package. Install it by .libreoffice-headless"sudo yum install libreoffice-headless"`没安装这个库
还不行执行`pkill -f soffice.bin`
