---
title: python文件和异常
date: 2021-03-04 23:12:34.0
updated: 2021-03-04 23:12:34.0
categories: Python
tags: 
comments: true
---

016-文件和异常
 
# 1.基本用法
```python
with open('文件名') as obj:
    contents = obj.read()
```
case
```python
with open('file_test.txt') as file_obj:
    contents = file_obj.read()
    print(contents.rstrip())# 本方法会最后一行会增加一个空行，因此要去除
 
输出
3.1415978896897087
4.86795766796
8.09085605860
```
# 2.文件路径
- 相对路径可以
    - 注意的点：win是`\`，Linux是`/`
- 绝对路径可以
    - 一般把绝对路径存入变量
    - 注意的点：win是`\`，Linux是`/`
 
# 3.逐行读取
```python
with open('file_test.txt') as file_obj1:
    for line in file_obj1:
        print(line.rstrip())
 
输出
3.1415978896897087
4.86795766796
8.09085605860
 
```
# 4.读取每一行并存为列表
```python
with open('file_test.txt') as file_obj2:
    list1 = file_obj2.readlines()
 
for l in list1:
    print(l.rstrip())
结果
3.1415978896897087
4.86795766796
8.09085605860
```
# 5.写入文件
```python
filename = 'file_test.txt'
 
with open(filename, 'w') as file_obj:
    file_obj.write('i love you')
 
```
`open(参数1，参数2)`
- 参数1文件名
- 参数2模式
    - 默认只读模式`r`
    - 写入模式`w`,文件若不存在自动创建。**若文件存在且有内容会先清空后写入**
    - 附加模式`a`
- python只支持字符串写入，若写入数值请先转换成str()
- `write`表示写入，但是不会在末尾添加换行符
 
# 6.写入多行
没什么可说的，你写入的时候自己在里面加上`\n`
# 7.附加写入
`open(文件名，'a')`
- 写入文件不会清空原有内容
- 没有文件会自动创建
# 8.异常
基本语法
```python
try:
    监测的代码
except 捕获的异常:
    处理异常
else:
    监测的代码成功执行运行的代码
```
case1
```python
try:
    print(2/0)
except ZeroDivisionError:
    print('除数不能是0')
运行结果
除数不能是0
```
case2
```python
 
while True:
    first_number = input('\n输入第一个数：')
    if first_number == 'q':
        break
    second_number = input('\n输入第二个数：')
    try:
        answer = int(first_number) / int(second_number)
    except ZeroDivisionError:
        print('除数不能是0')
    else:
        print(answer)
运行
输入第一个数：2
 
输入第二个数：0
除数不能是0
 
输入第一个数：q
 
Process finished with exit code 0
```
# 9. 异常不上报不终止继续运行
**关键`pass()函数`**
```python
try:
 
except ZeroDivisionError:
    pass()
else:
 
```
 