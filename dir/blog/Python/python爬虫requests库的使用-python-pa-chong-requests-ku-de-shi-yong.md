---
title: python爬虫requests库的使用
date: 2021-03-05 22:58:21.0
updated: 2021-03-05 22:58:21.0
categories: Python
tags: 
comments: true
---

# 1.基本用法
使用`requests`库比使用`urllib`库方便
```python
import requests

# get方法与urlopen方法一样，都返回一个response对象
r = requests.get("https://www.baidu.com")
print(type(r))
print(r.status_code)
print(type(r.text))
print(r.text)
print(r.cookies)
```
`get`方法与`urlopen`方法执行相同的操作，得到了`response对象`，最大方便实现其他请求只需一句话，如`request.post()`等等。

```python
request.post()
request.put()
request.delete()
request.head()
request.option()
```
## get请求
- 基本用法

```python
import requests

r = requests.get('http://httpbin.org/get')
print(r.text)

运行结果
{
  "args": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Host": "httpbin.org", 
    "User-Agent": "python-requests/2.25.1", 
    "X-Amzn-Trace-Id": "Root=1-60423760-7d282bb073f21a9a39dfe543"
  }, 
  "origin": "27.200.129.225", 
  "url": "http://httpbin.org/get"
}

```
## 参数传递
- 构造参数，一般通过`requests.get(url,params)`第二个参数传递

```python
# 可以直接写
r = requests.get('http://httpbin.org/get?name=germey&age=18')

```
```python
data = {
    'name': 'germey',
    'age': 22

}
r = requests.get('http://httpbin.org/get', params=data)
print(r.text)
# url中的参数会自动构造
运行结果
{
  "args": {
    "age": "18", 
    "name": "germey"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Host": "httpbin.org", 
    "User-Agent": "python-requests/2.25.1", 
    "X-Amzn-Trace-Id": "Root=1-6042391b-1bab7f4d70f715a66ca76e31"
  }, 
  "origin": "27.200.129.225", 
  "url": "http://httpbin.org/get?name=germey&age=18"
}

{
  "args": {
    "age": "22", 
    "name": "germey"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Host": "httpbin.org", 
    "User-Agent": "python-requests/2.25.1", 
    "X-Amzn-Trace-Id": "Root=1-6042391c-76b823292c0c2d6a5ff07bc0"
  }, 
  "origin": "27.200.129.225", 
  "url": "http://httpbin.org/get?name=germey&age=22"
}
```
## 转换字典
上面返回的结果是一个`json`字符串，可以调用`.json()`方法将其转化成字典
```python
data = {
    'name': 'germey',
    'age': 22

}
r = requests.get('http://httpbin.org/get', params=data)
print(r.text)
# 转化成字典
print(type(r.json()))
运行结果
<class 'dict'>
```
## 抓取网页
- 抓取网页

```python
headers = {
    # 加入头部信息，否则不会让你抓取
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.81 "
}
r = requests.get('https://www.zhihu.com/explore', headers=headers)
# 配置正则表达式
pattern = re.compile('explore-feed.*?question_link.*?>(.*?)</a>')
titles = re.findall(pattern, r.text)
print(titles)
```
## 抓取图片
- 抓取图片

```python
r = requests.get('https://github.com/favicon.ico')
print(r.text)
print('------')
print(r.content)
# 将其保存到本地
# 第二个参数以二进制形式打开文件，并向其写入数据
with open('favicon.ico', 'wb') as f:
    f.write(r.content)
运行结果
前者将其转化为字符串会有乱码
后者以b开头是二进制数据也就是图片
本地目录会出现这个图片
```
## post请求
post请求
```python
data = {'name': 'germey', 'age': 18}
r = requests.post('http://httpbin.org/post', data=data)
print(r.text)
运行结果
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "age": "18", 
    "name": "germey"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Content-Length": "18", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "python-requests/2.25.1", 
    "X-Amzn-Trace-Id": "Root=1-604241e6-103df5b62be432095bba787f"
  }, 
  "json": null, 
  "origin": "27.200.129.225", 
  "url": "http://httpbin.org/post"
}
```
## 获取响应信息
- 获取响应信息

```python

import requests

data = {'name': 'germey', 'age': 18}
r = requests.post('http://httpbin.org/post', data=data)
print(r.text)
# 获取状态码
print(type(r.status_code), r.status_code)
# 获取头部信息
print(type(r.headers), r.headers)
# 获取cookies
print(type(r.cookies), r.cookies)
# 获取url
print(type(r.url), r.url)
# 获取请求历史
print(type(r.history), r.history)
运行结果
<class 'int'> 200
<class 'requests.structures.CaseInsensitiveDict'> {'Date': 'Fri, 05 Mar 2021 14:42:44 GMT', 'Content-Type': 'application/json', 'Content-Length': '500', 'Connection': 'keep-alive', 'Server': 'gunicorn/19.9.0', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true'}
<class 'requests.cookies.RequestsCookieJar'> <RequestsCookieJar[]>
<class 'str'> http://httpbin.org/post
<class 'list'> []
```
## 状态码比较
- 比较状态码
`requests.codes`是一个内置对象，用来根据返回信息查询状态码，详细直接在开发工具点开看这个对象。
```python
print(requests.codes.ok)
exit() if not r.status_code == requests.codes.ok else print('请求成功')
运行结果
200
请求成功
```




