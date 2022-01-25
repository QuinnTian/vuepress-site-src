---
title: python中输入函数和while循环
date: 2021-03-01 01:04:34.0
updated: 2021-03-01 01:04:34.0
categories: Python
tags: 
comments: true
---

# 1.输入
1. 输入函数`input('需要提示的东西')`
- 该函数读取后是以字符串读取
case1
```python
# 用户输入
message = input('please input more sth:')
print(message)

please input more sth：你好
你好
```
case2
```python
# 提示输入
tip1 = '如果你能看见'
tip2 = '\n请告诉我名字：'
message1 = input(tip1 + ',' + tip2)
print('你的名字：' + message1)

如果你能看见,
请告诉我名字：tom
你的名字：tom
```
2. 读取数值
- input函数读取后存储形式是字符串
- 可以使用int函数转换成数值
case1
```python
# 读取数值
message3 = input('请输入一个数：')
message3 = int(message3)
print(message3)
```

3. 求模运算符
`%表示求余数`
4. python2中的输入
`使用raw_input而不是input`
因为在2中input的表示输入的会解读成python代码
# 2.while循环
基本格式
```python
while 条件:
	执行代码
```
case1
```python
current_number = 1
while current_number <= 5:
    print(current_number)
    current_number += 1
1
2
3
4
5

```
case2
```python
# 让用户选择什么时候推出

tip = '请输入一个数：'
message = ''
while message != 'exit':
    message = input(tip)
    if message != 'exit':# 隐藏exit输出
        print(message)
	
请输入一个数：3
3
请输入一个数：4
4
请输入一个数：exit
exit
```
# 3.break
立刻退出循环，不再执行while后面的循环
```python
# break
tip1 = '请输入你去过的城市：'
message = ''
while message != 'exit':

    if message == 'exit':
        break
    else:
        message = input(tip1)
		
请输入一个数：exit
请输入你去过的城市：厦门
请输入你去过的城市：exit
```
# 4.continue
跳出这一次的循环进入下一个循环
case1 输出奇数
```python
current_number = 0
while current_number < 10:
    current_number += 1
    if current_number % 2 ==0:
        continue
    print(current_number)
1
3
5
7
9

```
# 5.while在列表中的用法
```python
 while 已有列表名:
 
```
表示只有列表中有0个元素才会终止循环

移除列表中所有含特定值的元素，因为remove只会删除第一个出现的元素[006-列表](:/b133d04ac4bc461fbd6111e587965296)
```python
# 移除列表中所有含特定值的元素
list1 = ['one', 'two', 'three', 'one']

while 'one' in list1:
    list1.remove('one')
print(list1)
```
# 5.while在字典中用法
```python
# while填充字典

dist = {}
flag = True
while flag:
    key = input('请输入名字：')
    val = input('请输出籍贯：')
    repeat = input('是否还有要调查的人呢？yse or no')
    dist[key] = val
    if repeat == 'no':
        flag = False

print(dist)

请输入名字：xiaoming
请输出籍贯：sd
是否还有要调查的人呢？yse or noyes
请输入名字：xiaohong
请输出籍贯：qingdao
是否还有要调查的人呢？yse or nono
{'xiaoming': 'sd', 'xiaohong': 'qingdao'}
```

