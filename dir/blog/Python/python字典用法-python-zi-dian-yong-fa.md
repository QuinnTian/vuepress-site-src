---
title: python字典用法
date: 2021-02-28 12:05:16.0
updated: 2021-02-28 12:05:16.0
categories: Python
tags: 
comments: true
---

# 1.字典格式
`字典名 = {键名:值名}`
1. 花括号
2. 冒号
3. 逗号分隔不同键值对


case1
```python
# 创建字典
alien0 = {'color': 'green', 'points': '5'}
print(alien0['color'])
```
```python


```
# 2.访问字典值
`字典名['键名']`
# 3.添加键值对
1. `字典名['键名'] = 值`
case1
```python
# 添加键值对
alien1 = {'color': 'green', 'points': '5'}
alien1['x_pos'] = 12
alien1['y_pos'] = 22
print(alien1)
```
case2
```python
# 创建空键值对
alien2 = {}
alien2['x_pos'] = 12
alien2['y_pos'] = 22
print(alien2)

```
# 4.修改键值对
`字典名['键名'] = 值`
```python
# 修改键值对
alien3 = {'color': 'green', 'points': '5'}
alien3['color'] = 'blue'
print(alien3)
```
# 5.删除键值对
`del 字典名['键名']`
```python
# 删除键值对
alien4 = {'color': 'green', 'points': '5'}
del alien4['color']
print(alien4)
```