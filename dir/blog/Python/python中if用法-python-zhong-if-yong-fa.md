---
title: python中if用法
date: 2021-03-01 01:03:36.0
updated: 2021-03-01 01:03:36.0
categories: Python
tags: 
comments: true
---


case1
```python
# if判断
cars = ['car1', 'car2', 'car3', 'car4']
for c in cars:
    if c == 'car1':
        print(c.upper())
    else:
        print(c.title())
```

# 1.基本格式
```python
if 判断条件:
	执行代码
else:
	执行代码
```
# 2.条件测试
## 2.1.检查两个值是否相等输出
```python
# 检查值
car1 = 'audi'
print(car1 == '1')
print(car1 == 'audi')

False
True
```

## 2.2.==区分大小写，如何忽略大小写
```python
# 不区分大小写的方法，用转换函数
car2 = 'audi'
print(car2 == '1')
print(car2.lower() == 'auDI'.lower())
print(car2)
# 转换函数不会改变原来变量的大小写
```
## 2.3.and、or
```python
>>> age1 = 0
>>> age2 = 1
>>> age1 < 0 and age2 ==1
False
>>> age1 == 0 or age2 == 0
True
```
## 2.4.检查特定值在列表中in和not in
```python
>>> list1 = ['a','b','c','d']
>>> 'b' in list1
True
>>> 'b' not in list1
False
```
# 3.if的多种格式
1.单个
```python
if condition:
	代码
```
2.`if else`
```python
if conditon:
	代码
else:
	代码
```
3.`if elif else`
```python
if conditon:
	代码
elif:
	代码
else:
	代码
```
4.`if elif elif`
```python
if conditon:
	代码
elif condition:
	代码
elif condition:
	代码
```

