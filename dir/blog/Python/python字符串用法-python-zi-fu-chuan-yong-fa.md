---
title: python字符串用法
date: 2021-03-06 22:59:54.0
updated: 2021-03-06 22:59:54.0
categories: Python
tags: 
comments: true
---

# 1. 表现形式
英文的引号和单引号
# 2. 合并拼接字符串
## 2.1 常见的三个函数
```python
name = "aba lovelace"
# 首字母转成大写
print(name.title())
# 全部转成大写
print(name.upper())
# 全部转成小写
print(name.lower())
```
运行结果
>Aba Lovelace
ABA LOVELACE
aba lovelace
## 2.2 拼接字符串
```python
# 合并字符串1
first_name = "ada"
last_name = "lovelace"
full_name = first_name + " " + last_name
print(full_name)

# 合并字符串2
first_name = "ada"
last_name = "lovelace"
full_name = first_name + " " + last_name
print("hello, " + full_name.title() + "!")

# 合并字符串3
first_name = "ada"
last_name = "lovelace"
full_name = first_name + " " + last_name
message = "Hello, " + full_name.title() + "!"
print(message)
```
运行结果
>ada lovelace
hello, Ada Lovelace!
Hello, Ada Lovelace!

# 3. 换行符和制表符
```python
>>> print("hello world")
hello world
>>> print("\tpython")
        python
>>> print("\npython")

python
```
# 4. 删除字符串中的空白
## 4.1 剔除字符串末尾的空白
```python
>>> favorite_language ="python "
>>> favorite_language
'python '
>>> favorite_language.rstrip()
'python'
```
上面只是暂时删除，永久删除需要存回变量
```python
>>> favorite_language = favorite_language.rstrip()
>>> favorite_language
'python'
```
## 4.2 剔除字符串两边和开头的空白
```python
favorite_language = " python "
# 去除两端的空白
>>> favorite_language.strip()
'python'
# 去除开头的空白
>>> favorite_language.lstrip()
'python '
```
# 5.! 常见的语法错误
1. 字符串中单引号之间不要有双引号
```python
>>> favorite_language.rstrip()
' python'
>>> print('chinese" english’）
  File "<stdin>", line 1
    print('chinese" english’）
                             ^
SyntaxError: EOL while scanning string literal
```
2. 若要用可以在双引号之间出现单引号
```python
>>> print("chinese's son")
chinese's son
```
3. python2 中print没有括号
# 6.练习
```python
# 输出变量
name = "Eric"
print("Hello " + name + ",would you like to learn some Python today?")
# 分别以首字母大写、大写、小写显示姓名
name = 'xiao ming'
print("以首字母大写显示：" + name.title())
print("以大写显示：" + name.upper())
print("以小写显示：" + name.lower())
# 输出带引号的名言
print("Albert Einstein once said,'A person......'")
# 改写上面名言，名字和句子分别存到一个变量
famous_person = "Albert Einstein"
message = " once said,'A person......'"
print(famous_person + message)
# 剔除人名中的空白，分别使用\n \t一次
name = " tom "
print(name.strip())
print(name.lstrip()+"\t")
print(name.rstrip()+"\n")
```

