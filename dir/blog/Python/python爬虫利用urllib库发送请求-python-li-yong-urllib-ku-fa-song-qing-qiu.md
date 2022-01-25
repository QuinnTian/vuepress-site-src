---
title: python爬虫利用urllib库发送请求
date: 2021-03-03 15:36:07.0
updated: 2021-03-03 15:38:05.0
categories: Python
tags: 
comments: true
---

# 1.urllib库
`urllib库`是python3的内置库，主要用来`实现请求的发送`
有4个模块
- `request`基本http请求模块
- `error`异常处理模块
- `parse`工具模块
- `rebotparser`识别robots.txt文件
# 2.request模块
## 2.1urlopen()用法
参考文档：https://docs.python.org/zh-cn/3/library/urllib.request.html#module-urllib.request
`urlopen(url)`
```python
import urllib.request
# request的urlopen方法基本使用
# 打开网页
response = urllib.request.urlopen('https://www.python.org')
#打印读取
print(response.read().decode('utf-8'))
# 打印类型
print(type(response))
# 调用read可以读取网页的内容
# 调用status属性可以获取状态码
print(response.status)
# 调用getheaders方法可以获取header头部信息
print(response.getheaders())
print(response.getheader('server'))
```
`urlopen(url,data,timeout)`
传递`data`参数和`timeout`参数
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
## 2.2Request类用法

主要用于构建复杂数据结构。
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
# 3.处理器用法
利用基本的构造请求只是最简单的，如果进行一些复杂的操作比如cookie处理等，就需要`处理器`。
处理器的父类是`BaseHandler`类，其子类很多
- `HTTPDefaultErrorHandler`处理响应异常
- `HTTPRedirectHandler`处理重定向
- `HTTPCookieProcessor`处理Cookies
- `ProxyHander`设置代理
- `HTTPPasswordMgr`管理密码
- `HTTPBasicAuthHandler`管理认证

`OpenDirector`类简称`Opener`,类似`urlopen()`方法，主要是用来打开链接的。引入的原因是之前的只是用封装好的`urlopen()`打开，但是现在需要高度定制。
`Opener`可以使用`open()`方法，与`Handler`关系：通过`Handler`构建`Opener`
## 3.1.验证用户和密码
case验证用户和密码的例子，有些网页会提示让你输入用户明和密码
```python
from urllib.request import HTTPPasswordMgrWithDefaultRealm, HTTPBasicAuthHandler, build_opener
from urllib.error import URLError
# 用户名
username = 'username'
# 用户密码
password = 'password'
# URL
url = 'http://localhost:5000'
# 这个类主要是构建用户密码和用户名一些基本信息的
p = HTTPPasswordMgrWithDefaultRealm()
# 把基本参数传入
p.add_password(None, url, username, password)
# 实例化处理器，其参数尾上面的实例
auth_handler = HTTPBasicAuthHandler(p)
# 通过处理器构建一个opener
opener = build_opener(auth_handler)

try:
    # 调用opener的open方法
    result = opener.open(url)
    html = result.read().decode('utf-8')
    print(html)
except URLError as e:
    print(e.reason)



```
## 3.2设置代理
```python
""""设置代理"""
from urllib.error import URLError
from urllib.request import ProxyHandler, build_opener

# 调用代理处理器构建数据
proxy_handler = ProxyHandler({
    'http': 'htpp://127.0.0.1:9743'
    'https' 'https://127.0.0.1:9743'
})
# 调用构造器方法构造opener
opener = build_opener(proxy_handler)
try:
    # 打开网址
    response = opener.open(('https://baidu.com'))
    # 读取数据
    print(response.read().decode('utf-8'))
except URLError as e:
    print(e.reason)
```
## 3.3.配置cookies
### 3.1保存
case1
```python
"""配置cookies"""
import http.cookiejar
import urllib.request
# 声明一个cookies
cookie = http.cookiejar.CookieJar()
# 用处理器处理
handler = urllib.request.HTTPCookieProcessor(cookie)
# 构造opener
opener = urllib.request.build_opener(handler)
response = opener.open("http://www.baidu.com")
for item in cookie:
    print(item.name+"="+item.value)
运行结果
"F:\D-04. Program Space\D-04-007. Python Program\Python1\Scripts\python.exe" C:/Users/Quinn/PycharmProjects/pythonProject/配置cookies.py
BAIDUID=E4EF1513A1D64BEE3D68E25C699FE119:FG=1
BIDUPSID=E4EF1513A1D64BEE73CE7E52B0ED8BF7
H_PS_PSSID=33272_31660_33595_33570_33392_33459
PSTM=1614754529
BDSVRTM=0
BD_HOME=1

Process finished with exit code 0

```
case2 配置后存储文件
```python
"""配置cookies"""
import http.cookiejar
import urllib.request
filename = 'cookies.txt'
# 声明一个cookies****要换成下面
cookie = http.cookiejar.MozillaCookieJar(filename)
# 用处理器处理
handler = urllib.request.HTTPCookieProcessor(cookie)
# 构造opener
opener = urllib.request.build_opener(handler)
response = opener.open("http://www.baidu.com")
for item in cookie:
    print(item.name+"="+item.value)
cookie.save(ignore_discard=True, ignore_expires=True)
运行结果
生成了文件
# Netscape HTTP Cookie File
# http://curl.haxx.se/rfc/cookie_spec.html
# This is a generated file!  Do not edit.

.baidu.com	TRUE	/	FALSE	1646290472	BAIDUID	C0FDF0F7760C5DD0A2754CF35D05EBEB:FG=1
.baidu.com	TRUE	/	FALSE	3762238119	BIDUPSID	C0FDF0F7760C5DD058FD4B338DBC9A83
.baidu.com	TRUE	/	FALSE		H_PS_PSSID	33272_31253_33594_26350_22157
.baidu.com	TRUE	/	FALSE	3762238119	PSTM	1614754472
www.baidu.com	FALSE	/	FALSE		BDSVRTM	6
www.baidu.com	FALSE	/	FALSE		BD_HOME	1
```
case3生成LWP文件格式cookies文件
```python
cookie = http.cookiejar.LWPCookieJar(filename)

运行结果生成文件
#LWP-Cookies-2.0
Set-Cookie3: BAIDUID="BEAA4A525268492E8B95D972A1ACBD7F:FG=1"; path="/"; domain=".baidu.com"; path_spec; domain_dot; expires="2022-03-03 06:58:05Z"; comment=bd; version=0
Set-Cookie3: BIDUPSID=BEAA4A525268492EBA5D955552CA0D71; path="/"; domain=".baidu.com"; path_spec; domain_dot; expires="2089-03-21 10:12:12Z"; version=0
Set-Cookie3: H_PS_PSSID=33506_33261_33272_33595_26350; path="/"; domain=".baidu.com"; path_spec; domain_dot; discard; version=0
Set-Cookie3: PSTM=1614754685; path="/"; domain=".baidu.com"; path_spec; domain_dot; expires="2089-03-21 10:12:12Z"; version=0
Set-Cookie3: BDSVRTM=0; path="/"; domain="www.baidu.com"; path_spec; discard; version=0
Set-Cookie3: BD_HOME=1; path="/"; domain="www.baidu.com"; path_spec; discard; version=0


```
### 3.2读取访问
case4读取cookies并访问网页
```python
# 读取
cookie = http.cookiejar.LWPCookieJar()
cookie.load('cookies.txt', ignore_discard=True, ignore_expires=True)
handler = urllib.request.HTTPCookieProcessor(cookie)
opener = urllib.request.build_opener(handler)
response = opener.open('http://www.baidu.com')
print(response.read().decode('utf-8'))
```

