---
title: python爬虫正则表达式用法
date: 2021-03-08 00:15:25.0
updated: 2021-03-08 00:15:25.0
categories: Python
tags: 
comments: true
---

[toc]

# 常用匹配表参考
`\w`匹配字母、数字、下划线
`\W`匹配不是字母、数字、下划线的字符
`\s`匹配任意空白字符等价于`[\t\n\t\f]`
`\S`匹配任意非空字符
`\d`匹配任意数字等价`[0-9]`
`\D`匹配任意非数字的字符
`\A`匹配字符串开头
`\Z`匹配字符串结尾，如果存在换行，只会匹配换行前的结束字符串
`\z`匹配字符串结尾，如果存在换行，同时还会匹配换行符
`\G`匹配最后匹配完成的位置
`\n`匹配换行符
`\t`匹配制表符
`^`匹配一行字符串的开头
`$`匹配一行字符串的结尾
`.`匹配任意字符，除了换行符，当re.DOTAKK标记被指定，则可以匹配包含换行符的任意字符，**这里表示匹配1个字符，如果想要匹配任意字符可以写成**`.*`
`[...]`表示一组字符，单独列出，比如`[amk]`匹配a或m或k
`[^...]`不在[]的字符，比如`[^abc]`表示匹配a、b、c之外的字符
`{n}`精确匹配n个前面的表达式，比如`\w{10}`表示往后匹配10次只要符合\w规则即可
`{n,m}`匹配n到m次有前面正则表达式定义的片段，贪婪方式
`a|b`匹配a或b
`{}`匹配括号内的表达式
`*`匹配0或多个前面的子表达式或字符
`+`匹配1个或多个前面的子表达式或字符
`？`匹配0个或1个前面正则表达式定义的片段


# match方法
引入`re`库
**这个方法是从开头匹配**
```python
# 正则
import re

content = 'hello 123 456 world_this is a regex demo'
print(len(content))
result = re.match(r"^hello\s\d\d\d\s\d{3}\s\w{10}", content)
# 输出匹配的内容
print(result.group())
# 输出匹配的范围
print(result.span())

40
hello 123 456 world_this
(0, 24)
```
# 提取内容
首先将要匹配的内容提取的内容括起来
然后`match(1)`从1开始，1表示提取第一个括号
```python
# 正则
import re

content = 'hello 123 456 world_this is a regex demo'
print(len(content))
result = re.match(r"^hello\s\d\d\d\s\d{3}\s\w{10}", content)
# 输出匹配的内容
print(result.group())
# 输出匹配的范围
print(result.span())
# 2.提取内容
result = re.match(r"^hello\s(\d\d\d)\s\d{3}\s\w{10}", content)
# 提取第一个123
print(result.group(1))
运行结果
123



```
# 通用匹配
```python
# 正则
import re

content = 'hello 123 456 world_this is a regex demo'
print(len(content))
# 通用匹配
result = re.match(r'^hello.*demo$', content)
print(result.group())
# 这里对比只用.不用.*的区别，会发现只用.会报错，因为没匹配到任何东西，因为.的意义是匹配任意1个字符，只有和.*配合才代表匹配任意字符
result =re.match(r'^hello.demo$', content)
print(result.group())
运行结果
hello 123 456 world_this is a regex demo
Traceback (most recent call last):
  File "C:\Users\Quinn\PycharmProjects\pythonProject\正则表1.py", line 19, in <module>
    print(result.group())
AttributeError: 'NoneType' object has no attribute 'group'

```
# 贪婪模式
## .*用法
所谓`贪婪模式`就是在此模式下使用比如`.*`尽量匹配多个字符，`.*`原意代表匹配任意字符+匹配0个或N个表达式（也就是匹配前面的这里的.表达式），这时候贪婪模式表示匹配最多的任意字符，而不是0个
```python
# 贪婪模式示例
# 我们提取中间数字部分
result = re.match(r'^hello.*(\d+).*demo$', content)
print(result.span())
print(result.group(1))
输出
(0, 40)
6
# 原因：开启贪婪模式.*会尽量匹配多个字符，所以一直匹配到了数字7前面，而\d+则只能匹配了一个数字
```
# 非贪婪模式
## .*?用法
我们愿意是提取数字部分，但是由于贪婪模式导致无法提取，可以使用`.*?`非贪婪模式
```python
# 正则
import re

content = 'hello 123 456 world_this is a regex demo'
# 非贪婪模式示例
result = re.match(r'^hello.*?(\d+).*demo$', content)
print(result.span())
print(result.group(1))
输出
123


```
非贪婪模式就是尽可能匹配少的字符，.*匹配任意字符直到遇到\d+这时候在贪婪模式下会匹配，但是在非贪婪模式下就直接交给\d+去匹配了
**尽量使用非贪婪模式而不是贪婪模式**
下面情况**非贪婪模式会导致无法匹配**
```python
content2 = 'http://quinntian.com/category'
result = re.match(r'^http.*?com/(.*)', content2)
print(result.group(1))
result = re.match(r'^http.*?com/(.*?)', content2)
print(result.group(1))
运行结果
category

# 这里第二个并没有提取出来是因为没有匹配到任何内容
```
## .+?用法
```python
非贪婪模式2
<img src=``test.jpg` width=`60px` height=`80px`/>
src='.*?'则搜索出来的结果是：src=''
非贪婪模式3
.+? 表示至少匹配一个字符串
src='.+?'则搜索出来的结果是：src='’test.img'
content3 = "<img src=''test.jpg' width='60px' height='80px'/>"
result = re.match(".*(src='.+?')", content3)
print(result.group(1))
print(result.span())
运行
src=''test.jpg'
(0, 20)

```

# 修饰符
```python
# 修饰符
content4 = """hello 123456 world this 
    is a regex demo"""
# 正常情况下上面字符串有换行符，因此无法匹配，因为.代表匹配任意除了换行符以外的字符
result = re.match(r'he.*?(\d+).*demo$', content4)
print(result.group(1))
# 传入第三个参数re.S
result = re.match(r'he.*?(\d+).*demo$', content4, re.S)
print(result.group(1))
```
常见修饰符
`re.S`**使得.可以匹配换行符**
`re.I`**使匹配对大小写不敏感**
`re.M`多行匹配，影响`^和$`
`re.L`做本地化识别
`re.U`根据Unicode字符集识别，会影响`\w\W\b\B`
`re.X`更灵活的格式

# 转义匹配
```python
# 转义匹配
content5 = '(百度)www.baidu.com'
result = re.match(r'\(百度\)www\.baidu\.com', content5)
print(content5)
输出
(百度)www.baidu.com
```
当遇到特殊字符的时候可以使用`\`转义
# search方法
- 扫描整个字符串，并返回第一个匹配

```python

# search方法
content6 = 'extra stings hello 123456 world this is regex demo'
result = re.match('hello.*?(d+).*?demo', content6)
print(result)
# 换用search
result = re.search('hello.*?(d+).*?demo', content6)
print(result)
输出结果
None
<re.Match object; span=(13, 50), match='hello 123456 world this is regex demo'>

```
case2
```python
content7 = """<div id="songs-list">
    <h2>经典歌曲</h2>
    <p class="introduction">
    经典歌曲列表
    </p>
    <ul id="list" class="list-group">
        <li data-view="2">
            <a href="/2.mp3" singer="田馥甄">小幸运</a>
        </li>
        <li data-view="3">
            <a href="/3.mp3" singer="吴青峰">带我走</a>
        </li>
        <li data-view="4">
            <a href="/4.mp3" singer="苏打绿">小情歌</a>
        </li>
        <li data-view="5">
            <a href="/5.mp3" singer="飞儿乐团">月牙湾</a>
        </li>
    </ul>
</div>
"""
# 要开启换行
result = re.search('singer="(.*?)">(.*?)</a>', content7, re.S)
print(result)
运行结果
<re.Match object; span=(183, 203), match='singer="田馥甄">小幸运</a>'>
```
# findall方法
返回所有匹配的结果，以列表方式存储
```python
result = re.findall('singer="(.*?)">(.*?)</a>', content7, re.S)
print(result)
for r in result:
    print(r)
运行结果
[('田馥甄', '小幸运'), ('吴青峰', '带我走'), ('苏打绿', '小情歌'), ('飞儿乐团', '月牙湾')]
('田馥甄', '小幸运')
('吴青峰', '带我走')
('苏打绿', '小情歌')
('飞儿乐团', '月牙湾')
```
# sub方法
替换或修改文本
```python
# sub
content8 = 'kfhdkfhg43jkh43k434h2h46h45'
# content8 = re.search(r'\d', content8)
# print(content8)
content8 = re.sub(r'\d+', '', content8)
print(content8)
运行结果
kfhdkfhgjkhkhhh
```
# compile方法
编译成字符表达式，没看出来什么用，还不如直接传写好的
```python
# compile
c1 = '2021年3月7日20:18:23'
c2 = '2021年3月7日20:18:32'
c3 = '2021年3月7日20:18:39'
pattern = re.compile('\d{2}:\d{2}')
print(pattern)
r1 = re.sub(pattern, '', c1)
r2 = re.sub(pattern, '', c2)
r3 = re.sub(pattern, '', c3)
print(r1)
print(r2)
print(r3)
运行结果
2021年3月7日:23
2021年3月7日:32
2021年3月7日:39
```






