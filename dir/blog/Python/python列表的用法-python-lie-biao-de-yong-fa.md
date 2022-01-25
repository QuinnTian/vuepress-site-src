---
title: python列表的用法
date: 2021-02-24 17:30:41.0
updated: 2021-02-24 17:30:41.0
categories: Python
tags: 
comments: true
---

# 1. 列表特征
1. 用方括号声明
2. 中间用逗号分割
3. 有序
4. **列表是可以修改的**
5. 关键字list
```python
bicycles = ['trek','canondale','redline','specialize']
print(bicycles)
```
# 2. 访问列表中的元素
1. 语法：`列表名[序号]`
```python
bicycles = ['trek','canondale','redline','specialize']
print(bicycles)
print(bicycles[1])
print(bicycles[1].title())

```
2. 序号问题0开始
3. 最后一个元素可以用序号-1访问，意思倒数第一
4. 使用列表中的元素来拼接
```python
message = "My first bicycle is a " +bicycles[1].title() + "."
print(message)
```
# 3. 修改列表中的元素
`列表名[序号]=赋值`
```python
motorcycle = ['honda', 'yamaha', 'suzuki']
print(motorcycle)
motorcycle[0] = 'ducati'
print(motorcycle)
```
# 4. 在列表中添加元素
1. `列表名.append["值"]`末尾添加元素
```python
motorcycle.append("yadi")
print(motorcycle)
```
2. `列表名.insert[序号,"值"]`插入元素
```python
motorcycle.insert(0, "aima")
print(motorcycle)
```
表示在0处添加元素，原来元素往后推

3. 先创建列表，再添加元素
```python
motorcycles = []
motorcycles.append("yadi")
print(motorcycles)

```
# 5. 在列表中删除元素
1. `del 列表名[序号]`
```python
del motorcycle[0]
print(motorcycle)
```
删除后，后面的元素顶上来

2. `列表名.pop()`表示弹出最后一个值
```python
motorcycle2 = ['honda', 'yamaha', 'suzuki']
print(motorcycle2)
# 弹出的值赋值给一个变量
motorcycle2_pop = motorcycle2.pop()
print(motorcycle2)
print(motorcycle2_pop)
```
3. 弹出任何一个值`列表名.pop(序号)`
```python
motorcycle2 = ['honda', 'yamaha', 'suzuki']
print(motorcycle2)
motorcycle2_pop = motorcycle2.pop(0)
print(motorcycle2)
print(motorcycle2_pop)
```
- pop和del区别
	- 都是删除
	- pop不仅可以删除还可会返回删除的值
	- 如果你在删除的时候需要使用删除的值得时候可以使用pop
4. 按值删除`列表名.remove("值")`
```python
motorcycle3 = ['honda', 'yamaha', 'suzuki']
motorcycle3.remove('honda')
print(motorcycle3)

['yamaha', 'suzuki']
```
删除元素同时打印删除的元素是谁
```python
motorcycle4 = ['honda', 'yamaha', 'suzuki']
print(motorcycle4)
remove_name = 'honda'
motorcycle4.remove(remove_name)
print(motorcycle4)
print("删除的元素是："+ remove_name)
```
# 6.排序

1. 正序和倒序`列表名.sort(reverse=True or False)`
**永久排序**
```python
cars = ['ccar1', 'acar2', 'ecar3', 'fcar4']
# 永久排序
cars.sort()
print(cars)
# 永久排序倒序
cars.sort(reverse=True)
print(cars)
```
2. 临时排序
`sorted(列表名,reverse=True)`
```python
cars = ['ccar1', 'acar2', 'ecar3', 'fcar4']
```
# 7.反转列表
`列表名.reverse`
倒过来
**永久性**
```python
# 反转列表
cars3 = ['ccar1', 'acar2', 'ecar3', 'fcar4']
print(cars3)
cars3.reverse()
print(cars3)
```
>运行结果
>['ccar1', 'acar2', 'ecar3', 'fcar4']
['fcar4', 'ecar3', 'acar2', 'ccar1']
# 8.确定长度
`len(列表名)`
```python
# 获取列表长度
cars4 = ['ccar1', 'acar2', 'ecar3', 'fcar4']
print(len(cars4))
```
>运行结果：4
# 9.常见错误
1. 索引错误
`列表中第三个元素的索引是2`

2. 如何访问最后一个元素
`使用-1索引`

# 10.遍历列表
`for 项名 in 列表名:`
case1:
```python
cars4 = ['ccar1', 'acar2', 'ecar3', 'fcar4']
for car in cars4:
    print(car)
```
case2:
```python
# 使用for循环打印1-20
for n in range(1, 21):
    print(n)

# 创建一个列表1-1000然后打印出来
for n in range(1, 1001):
    print(n)
```
- 循环体是指缩进的部分
# 11.创建数值列表
1. range函数
```python
# 创建数值列表
for car in range(1, 5):
    print(car)
```
>1
2
3
4

`range(首，尾)其中不包含尾部`
2. 利用list+range函数创建数值列表
```python
# 利用range函数创建数值列表
numbers = list(range(1, 7))
print(numbers)
```
>[1, 2, 3, 4, 5, 6]

`指定步长range(开始,结束,步长)`
**创建奇数列表**
```python
numbers2 = list(range(1, 11, 2))
print(numbers2)
```
>[1, 3, 5, 7, 9]

**创建前10个整数的平方的列表**
```python
# 创建前10个整数的平方列表
numbers3 = []
for n in range(1, 11):
    number = n**2
    numbers3.append(number)
print('--')
print(numbers3)
```
>[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```python
# 创建1-20的奇数列表
numbers5 = list(range(1,21,2))
print(numbers5)
```
# 12.统计运算
`sum()`
case1:
```python
digit = [1, 2, 3, 4, 5, 6]
sum(digit)
max(digit)
min(digit)
```
case2:
```python
#  计算1-10000的和
number5 = list(range(1, 10001))
print(max(number5))
print(sum(number5))
```
case3:
```python
# 创建一个列表0-30 3的倍数并打印
numbers6 = list(range(0, 30, 3))
for n in numbers6:
    print(n)
```
# 13.列表解析
**for的简单写法**
`列表名=[表达式 for varue in range()]`
case1:生成列表前十个数的平方
```python
# 列表表达式生成列表
nums = [number**2 for number in range(1, 11)]
print(nums)
```
case2：
```python
# 创建前10个数的立方的列表
numbers7 = [number**3 for number in range(1, 11)]
print(numbers7)
```
# 14.切片

case1:
```python
# 切片
# 切片
people = ['jerry', 'tom', 'xiaoming', 'xiaohong']
# 提取前3个
print(people[0:3])
# 提取第2-3
print(people[1:3])
# 不指定头
print(people[:3])
# 不指定尾：表示到末尾含末尾
print(people[2:])
# 负数索引：其中最后一个索引是-1
print(people[-2:]) # 表示输出后两个元素
```
1. `列表名[索引1：索引2]`其中最后一个不包括
2. `列表名[:索引2]`不指定开头表示从头开始
3. `列表名[索引1:]`**包含结尾**
4. 最后一个数的索引是-1，依次往前推，结合上面规则使用，如`列表名[-2:]`

case2:
```python

```
# 15.切片和遍历
```python
# 切片和遍历结合
people2 = ['jerry', 'tom', 'xiaoming', 'xiaohong']
for p in people2[0:2]:
    print(p)
```
# 16.复制列表
正确方法`新列表=旧列表[:]`
case1:
```python
# 切片和遍历结合
people2 = ['jerry', 'tom', 'xiaoming', 'xiaohong']
for p in people2[0:2]:
    print(p)
```
错误方法`新列表=旧列表×`
```python
# 切片复制错误写法
myfoods2 = ['apple', 'orange', 'pizza', 'cake']
myfrendsfoods = myfoods2
# 看似输出一样
print(myfrendsfoods)
# 当我们向自己食物增加一个
myfoods2.append('carrot')
# 发现朋友的食物也增加了
print(myfrendsfoods)
# 其实只是类似C语言中的指针
```







