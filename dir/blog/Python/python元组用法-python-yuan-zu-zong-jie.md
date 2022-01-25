---
title: python元组用法
date: 2021-02-27 16:59:13.0
updated: 2021-02-27 16:59:51.0
categories: Python
tags: 
comments: true
---

# 1.元组与列表
1. 列表可以修改，**元组不可以修改**
2. 列表用[],元组用()
3. 都是有序的
4. 元组的关键字couple
5. 访问元组与访问列表的方式一样
# 2.定义元组
定义`元组名=（....,....）`访问`元组名[index]`
case1:
```python
# 定义一组元组表示长方形的长和宽，其值应该是不变的
demensions = (10, 20)
print(demensions)
# 索引访问
print(demensions[0])
```
试图修改元组值
case2
```python
demensions[0] = 40
print(demensions)
```
>Traceback (most recent call last):
  File "C:\Users\Quinn\PycharmProjects\pythonProject\couple1.py", line 8, in <module>
    demensions[0] = 40
TypeError: 'tuple' object does not support item assignment

# 3.遍历元组中的值
case1

```python
couple2 = (2, 7, 3, 4, 19)
for c in couple2:
    print(c)
```

# 4.元组重新赋值
对于整个元组重新赋值是合法的，但是修改元组中的某个值不合法
case
```python
# 元组重新赋值
couple3 = (2, 7, 3, 4, 19)
print(couple3)
couple3 =(2,1)
print(couple3)
```
>(2, 7, 3, 4, 19)
(2, 1)


