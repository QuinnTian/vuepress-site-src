---
title: python简单读取一个网页
date: 2021-02-24 17:28:55.0
updated: 2021-02-24 17:28:55.0
categories: Python
tags: 
comments: true
---

# urlopen基本用法
参考文档：https://docs.python.org/zh-cn/3/library/urllib.request.html#module-urllib.request
`urlopen(url)`
```python
import urllib.request
# request的urlopen方法基本使用
response = urllib.request.urlopen('https://www.python.org')
print(response.read().decode('utf-8'))
print(type(response))
# 调用read对象可以读取网页的内容
# 调用status属性可以获取状态码
print(response.status)
# 调用getheaders方法可以获取header头部信息
print(response.getheaders())
print(response.getheader('server'))
```
`urlopen(url,data,timeout)`
```python
import socket
import urllib.request
import urllib.parse
import urllib.error


data = bytes(urllib.parse.urlencode({'world': "hello"}), encoding='utf-8')
# 其中第二个参数是可选
# 若选了其格式必须是byte格式
# 有这个参数就不再是get->post
response = urllib.request.urlopen('http://httpbin.org/post', data=data)
print(response.read())
# timeout参数:设置超时时间
response = urllib.request.urlopen('http://httpbin.org/get', timeout=100)
print(response.read())


# 使用try catch 捕获，若超时则输出错误信息

try:
    response = response = urllib.request.urlopen('http://httpbin.org/get', timeout=0.02)
except urllib.error.URLError as e:
    if isinstance(e.reason, socket.timeout):
        print('Time out')
```
# url.request.Request()用法


```python
import urllib.request

# 同过Request方法构造数据结构
request = urllib.request.Request('http://python.org')
respose = urllib.request.urlopen(request)
print(respose.read().decode('utf-8'))
```
包装作用
req = `Request(需要包装的数据若干)`
`urlopen(req)`
不同：传入的参数是经过包装的
```python
from urllib import request, parse

# 准备数据结构
url = 'http://httpbin.org/post'
headers = {
    'User-Agent': 'Mozilla/4.0 (compatible;MSIE 5.5;Windows NT',
    'Host': 'httpbin.org'

}
dict = {
    'name': 'Germey'
}
# 包装data
data = bytes(parse.urlencode(dict), encoding='utf8')
# 使用Request包装数据
req = request.Request(url=url, data=data, headers=headers, method='POST')
# 使用urlopen方法
response = request.urlopen(req)
# 打印
print(response.read().decode('utf-8'))



```
