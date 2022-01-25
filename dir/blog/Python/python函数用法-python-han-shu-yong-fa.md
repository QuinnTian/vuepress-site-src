---
title: python函数用法
date: 2021-03-02 00:58:53.0
updated: 2021-03-02 00:58:53.0
categories: Python
tags: 
comments: true 
---

# 1.基本格式
```python
def greet_user():
    """显示简单问候语"""
    print('hello')
greet_user()# 函数调用
```
1. 关键字def
2. 不要忘记括号
3. 不要忘记冒号
4. 不要忘记缩进

# 2.传递参数
case1
```python
def greet_user2(username):
    print('hello:'+username.title())

greet_user2('xiaoming')

hello:Xiaoming
```
# 3.形参和实参
1. 函数中定义的参数形参
2. 调用的时候穿的参数实参数
```python
def greet_user3(username, age): # 形参
    print('your name is :'+ username+'and age is:'+str(age))

greet_user3('xiaohong', 18) # 实参
```
# 4.位置实参
实参与形参根据位置排列传递
case1
```python
def desc_pet(animal_type, petName):
    """显示宠物信息"""
    print('animal type is :'+ animal_type + ", name is :"+ petName)

desc_pet("dog",'小柴')

输出
animal type is :dog, name is :小柴
```
# 5.关键字实参
- 调用时直接使用形参名称传值
case
```python
def desc_pet2(animal_type, pet_name):
    """显示宠物信息"""
    print('animal type is :' + animal_type + ", name is :" + pet_name)
    
    
desc_pet2(animal_type='cat', pet_name='harry')

```
# 6.默认值
- 是指形参中的默认值
- 指定后可以在调用时不必传值
- **无默认值的形参要放在前面，带默认值要放在后面，否则报错not default value，原因是实参仍然会把第一个当做位置实参**
case
```python
# 形参默认参数
def desc_pet3(pet_name, animal_type= 'dog' ):
    """显示宠物信息"""
    print('animal type is :' + animal_type + ", name is :" + pet_name)


desc_pet3(pet_name='harry')

输出
animal type is :dog, name is :harry

```
# 7.等效调用
- 由于位置实参和关键字实参，因此可以混合使用，只要得到想要结果就可

case
```python
def desc_pet4(pet_name, animal_type='dog' ):
    """显示宠物信息"""
    print('animal type is :' + animal_type + ", name is :" + pet_name)
	

# 1.
desc_pet4(pet_name='harry')
# 2.
desc_pet4('harry')
# 二者调用方式都可
desc_pet4('tom', 'cat')
desc_pet4(pet_name='tom', animal_type='cat')

输出
animal type is :dog, name is :harry
animal type is :dog, name is :harry
animal type is :cat, name is :tom
animal type is :cat, name is :tom
```
# 8.实参错误
1. 形参无默认值，实参无值会报错
case
```python
# 实参错误
def desc_pet5(animal_type, pet_name):
    """显示宠物信息"""
    print('animal type is :' + animal_type + ", name is :" + pet_name)


desc_pet5()

报错
Traceback (most recent call last):
  File "C:\Users\Quinn\PycharmProjects\pythonProject\function1.py", line 62, in <module>
    desc_pet5()
TypeError: desc_pet5() missing 2 required positional arguments: 'animal_type' and 'pet_name'
```
# 9.返回值
函数具有返回值
```python
# 返回值函数
def desc_pet6(animal_type, pet_name):
    message = 'animal type is :' + animal_type + ", name is :" + pet_name
    return message


message = desc_pet6('dog', 'tom')
desc_pet6(message)
输出
animal type is :cat, name is :tom
```
# 10.实参可选
- 实参指定默认值尾空字符，``
- **原因是python会识别成true，也就不会报错了**
case
```python
def get_format_name(first_name, last_name, middle_name=''):
    if middle_name:
        format_name = first_name + ' ' + middle_name + ' ' + last_name
    else:
        format_name = first_name + ' ' + last_name

    return format_name


format_name1 = get_format_name('jimi', 'hendic')
format_name2 = get_format_name('john', 'hooker', 'lee')
print(format_name1)
print(format_name2)

输出
jimi hendic
john lee hooker
```
- 如果不指定中间名有默认值，那么如果某个人没有中间名，那只传入两个参数一定会报错
- 上述指定中间值为空字符""，则if条件不执行走else，若中间名有值，那就不是空字符if通过

# 11.返回字典
- 可返回任何复杂数据结构，如字典、列表、元组
case
```python

# 返回字典
def build_person(first_name, last_name, middle_name = ''):
    person = {'first_name:': first_name, 'last_name': last_name}
    if middle_name:
        person['middle_name:'] = middle_name
    return person


person1 = build_person('jimi', 'hendic')
person2 = build_person('john', 'hooker', 'lee')
print(person1)
print(person2)

输出
{'first_name:': 'jimi', 'last_name': 'hendic'}
{'first_name:': 'john', 'last_name': 'hooker', 'middle_name:': 'lee'}
```

# 12.传递列表
case
```python
# 传递列表
def greet_user7(usernames):
    """向列表中的每一个人问候"""
    for username in usernames:
        msg = 'hello:' + username
        print(msg)
        

greet_user7(['jerry', 'tom'])
运行结果
hello:jerry
hello:tom
```
# 13.在函数中修改列表
- 函数外一个列表，然后以参数传入函数内，在函数内对列表修改，也会修改外部列表，说明函数内修改列表与函数外列表是一个列表
case
```python
# 在函数中传递列表
def print_models(unprinted_designs, completed_models):
    """
    模拟打印每个设计，知道没有打印的设计为止
    打印每个设计后，都将其移动到打印完的列表中
    """
    while unprinted_designs:
        current_design1 = unprinted_designs.pop()

        # 模拟根据设计制作3D答应你模型的过成
        print('printing model:' + current_design1)
        completed_models.append(current_design1)


def show_completed_models(completed_models):
    """显示所有打印好的模型"""
    print("\n打印好的模型有：")
    for completed_model1 in completed_models:
        print(completed_model1)

unprinted_designs1 = ['iphone case', 'rebot pendant', 'dodecahedron']
completed_models1 =[]
print_models(unprinted_designs1, completed_models1)
show_completed_models(completed_models1)
print(unprinted_designs1)

输出
printing model:dodecahedron
printing model:rebot pendant
printing model:iphone case

打印好的模型有：
dodecahedron
rebot pendant
iphone case
[]

```

# 14.禁止函数修改列表
- 外部定义的列表，作为参数传入函数内部，函数内部修改列表，也会修改外部列表，如何禁止修改？
- 将列表的副本传递进去
```python
列表名 = ['case1']
调用函数名(列表名[:])#切片表示把列表副本传入
```
case1 使用列表副本
```python
# 列表副本
list1 = ['xiaoming', 'xiaohong', 'xiaopang']

def dispose_name(names):
    # 把所有名字全部移除
    while names:
        names.pop()


dispose_name(list1[:])
print(list1)
结果
['xiaoming', 'xiaohong', 'xiaopang']
```
case2 直接传入列表
```python
def dispose_name(names):
    # 把所有名字全部移除
    while names:
        names.pop()


dispose_name(list1)
print(list1)

运行结果
[]
```

# 15.传递任何数量实参
`def 函数名(*形参名)`
- `*形参名`表示创建了一个**空元组**，把所有的实参都放进里面了
- 
case1
```python
# 传递任何数量的实参
def make_pizza(*toppings):
    """打印顾客点的所有配两"""
    print(toppings)


make_pizza('配料1')
make_pizza('配料2', '配料2')

运行结果
('配料1',)
('配料2', '配料2')
```

# 16.位置实参+任意数量实参
要混合使用注意
1. 任意数量实参永远放在最后
2. python会首先匹配位置实参和关键字实参，最后才是任意数量实参
```python
# 任意位置实参+位置实参
def make_pizza2(size, *toppings):
    """打印顾客点的所有配两"""
    print('\nMaking a ' + str(size) + '-寸 pizza ,有以下配料：')
    for topping in toppings:
        print('- ' + topping)


make_pizza2(16, '配料1')
make_pizza2(15, '配料2', '配料2')
输出

Making a 16-寸 pizza ,有以下配料：
- 配料1

Making a 15-寸 pizza ,有以下配料：
- 配料2
- 配料2
```
# 17.函数存储在存储块中
把函数分离单独存储在`模块中`，用的时候在`导入`
1. 创建模块
把要存储函数直接放到一个`.py`文件中
case 存储在model.py
```python
def make_pizza2(size, *toppings):
    """打印顾客点的所有配两"""
    print('\nMaking a ' + str(size) + '-寸 pizza ,有以下配料：')
    for topping in toppings:
        print('- ' + topping)
```
2.导入模块
创建一个import.py
语法
```python
import 模块名

模块名.方法名()
```
case
```python
import model

model.make_pizza2(16, '配料1')
model.make_pizza2(15, '配料2', '配料2')
```

# 18.导入特定函数
`from 模块名(文件名) import 函数名[,函数2,函数3]`

- []不算
- 多个函数用逗号分隔
- **用的时候直接写函数名，不需要模块名.函数名（）**
case
```python
from model import make_pizza2

make_pizza2(16, '配料1')
```
- **指定函数别名**使用`from 模块名 import 函数名 as 别名`
case
```python
from model import make_pizza2 as pz

pz(16, '配料1')
```
-- **指定模块别名**`import 模块名 as 模块别名`
```python
import model as m

m.make_pizza2(16, '配料1')
```
- **导入模块中所有函数**`from 模块名 import *`**此时使用模块中的函数不在需要使用模块名.函数名了，直接使用（不推荐用法）**

# 19.函数编写指南
1. 函数名只用下划线和小写字母
2. 注释紧跟函数定义后，采用文档注释
3. 形参指定默认值=号两边不要有空格
4. 关键字实参等号两边不要有空格
5. 代码行长度不要超过79字符
6. 若形参参数名过长可以在左括号按回车，并在下一行按两次tab后再输入形参
7. 多个函数之间间隔可以用两个空行分隔