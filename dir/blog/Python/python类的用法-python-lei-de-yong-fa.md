---
title: python类的用法
date: 2021-03-03 12:11:06.0
updated: 2021-03-03 12:11:06.0
categories: Python
tags: 
comments: true
---

# 1.定义
## 1.1基本格式
```python
class 类名()：
	def __init__(self, name, age):
		
		...

```
```python
class Dog():
    """模拟小狗"""

    def __init__(self, name, age):
        """初始化属性name和page"""
        self.name = name
        self.age = age

    def sit(self):
        """模拟小狗被命令蹲下"""
        print(self.name.title() + 'is now setting')

    def roll_over(self):
        """模拟小狗打滚"""
        print(self.name.title() + 'rolled over')
```
## 1.2_init_方法
- 是内置的方法
- 其第一个参数必须是self
- 类在创建示例时它是指向实例的引用
- self不需要传递任何实参，会自动传递

## 1.3类里面的方法
类里面的函数叫做方法，用法与函数一致

## 1.4python2里面创建类
- 多了一个`object`
```python
class dog(object):
```
# 2.用类创建实例
case
```python
my_dog = Dog('tom', 2)
print('my dog name is ' + my_dog.name.title())
print('my dog is '+ str(my_dog.age) + 'yeas old')

输出
my dog name is Tom
my dog is 2yeas old
```
- 语法：`实例名 = 类名(传入参数)`
- 类一般用大写，实例名一般用实例

# 3.访问实例属性
`实例名.属性名`
# 4.调用实例方法
`实例名.方法名`

# 5.指定默认值
- 可以在`_init_`方法里指定属性的默认值
```python
class Car():
    """一次模拟汽车"""
    def __init__(self, make, model, year):
        """初始化描述汽车属性"""
        self.make = make
        self.model = model
        self.year = year
        self.odometer_reading = 0 #指定默认值

    def get_desc_name(self):
        """返回整洁的描述信息"""
        long_name = str(self.year) + ' ' + self.make + ' ' + self.model
        return long_name.title()

    def read_odometer(self):
        """打印一条指出汽车里程的消息"""
        print("这个汽车已经有" + str(self.odometer_reading) + '公里')


my_new_car = Car('audi', 'a4', 2016)
print(my_new_car.get_desc_name())
print(my_new_car.read_odometer())

运行
2016 Audi A4
这个汽车已经有0公里
None

```
# 6.修改属性的值
1. 直接修改属性的值
```python
# 直接修改属性的值
my_new_car.odometer_reading = 23
my_new_car.read_odometer()

运行
这个汽车已经有23公里
```
2. 通过类内部定义方法来修改属性值
```python
类定义省略
其他方法省略
    def update_odometer(self, mileage):
        """将里程值设定为指定值"""
        self.odometer_reading = mileage
		
# 调用方法来修改属性值
my_new_car.update_odometer(24)
my_new_car.read_odometer()

运行结果
这个汽车已经有24公里

```

3. 通过类内的方法来递增属性值
```python
class Car():
    """一次模拟汽车"""
    def __init__(self, make, model, year):
        """初始化描述汽车属性"""
        self.make = make
        self.model = model
        self.year = year
        self.odometer_reading = 0 #指定默认值

    def get_desc_name(self):
        """返回整洁的描述信息"""
        long_name = str(self.year) + ' ' + self.make + ' ' + self.model
        return long_name.title()

    def read_odometer(self):
        """打印一条指出汽车里程的消息"""
        print("这个汽车已经有" + str(self.odometer_reading) + '公里')

    def update_odometer(self, mileage):
        """将里程值设定为指定值"""
        self.odometer_reading = mileage

    def increment_odometer(self, miles):
        """将里程表读书增加指定量"""
        self.odometer_reading += miles


my_new_car = Car('audi', 'a4', 2016)
print(my_new_car.get_desc_name())
print(my_new_car.read_odometer())

# 直接修改属性的值
my_new_car.odometer_reading = 23
my_new_car.read_odometer()

# 调用方法来修改属性值
my_new_car.update_odometer(24)
my_new_car.read_odometer()

# 通过调用方法来递增属性值
my_new_car.increment_odometer(100)
my_new_car.read_odometer()

运行结果
2016 Audi A4
这个汽车已经有0公里
None
这个汽车已经有23公里
这个汽车已经有24公里
这个汽车已经有124公里


```

# 7.继承
```python
class Car:
    """模拟汽车"""

    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.odometer_reading = 0

    def get_desc_name(self):
        long_name = str(self.year) + ' ' + self.make + ' ' + self.model
        return long_name

    def read_odometer(self):
        print('这个汽车已经有' + str(self.odometer_reading) + '公里了')

    def update_odometer(self, mileage):
        if mileage >= self.odometer_reading:
            self.odometer_reading = mileage
        else:
            print('你不能更改里程！')

    def increment_odometer(self, miles):
        self.odometer_reading += miles


class ElectricCar(Car):
    """定义电动汽车"""

    def __init__(self, make, model, year):
        """初始化父类属性"""
        super().__init__(make, model, year)


my_tesla = ElectricCar('tesla', 'model s', 2016)
print(my_tesla.get_desc_name())



```
1. 父类与子类在一个文件内
2. 父类必须在子类前面
3. 子类在括号内`class ElectricCar(Car):`必须有父类作为参数
4. 子类`__init__`方法指定接受的参数，可以与父类一致，也可以不一致
5. 子类中`__init__`的`super(）`用于与父类关联
语法简易总结
```python
class father():
 	def __init__(self,更多形参):
		
class son(father):
	def __init__(self,更多形参):
		super().__init__(实参们)
```

- python2.7中继承
```python
class father:
 	def __init__(self,更多形参):
		
class son(father):
	def __init__(self,更多形参):
	super(father,self).__init__(实参们)
```
区别：supe`super(father,self).__init__(形参们)`需两个实参，一个类名，一个self

# 8.给子类添加自己的方法和属性
```python
class Car:
    """模拟汽车"""

    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.odometer_reading = 0

    def get_desc_name(self):
        long_name = str(self.year) + ' ' + self.make + ' ' + self.model
        return long_name

    def read_odometer(self):
        print('这个汽车已经有' + str(self.odometer_reading) + '公里了')

    def update_odometer(self, mileage):
        if mileage >= self.odometer_reading:
            self.odometer_reading = mileage
        else:
            print('你不能更改里程！')

    def increment_odometer(self, miles):
        self.odometer_reading += miles


class ElectricCar(Car):
    """定义电动汽车"""

    def __init__(self, make, model, year):
        """初始化父类属性"""
        super().__init__(make, model, year)
        # 定义电动车的电量
        self.bettery_size = 70
    
    def desc_battery(self):
        """打印电平容量"""
        print("这台电动车的电量是：" + str(self.bettery_size))

my_tesla = ElectricCar('tesla', 'model s', 2016)
print(my_tesla.get_desc_name())
my_tesla.desc_battery()

运行结果
2016 tesla model s
这台电动车的电量是：70

```
# 9.重写父类方法
没什么，直接在子类重写就行.....

# 10.使用实例（类）做属性
- 主要是注意写法
``` python
class Car:
    """模拟汽车"""

    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.odometer_reading = 0

    def get_desc_name(self):
        long_name = str(self.year) + ' ' + self.make + ' ' + self.model
        return long_name

    def read_odometer(self):
        print('这个汽车已经有' + str(self.odometer_reading) + '公里了')

    def update_odometer(self, mileage):
        if mileage >= self.odometer_reading:
            self.odometer_reading = mileage
        else:
            print('你不能更改里程！')

    def increment_odometer(self, miles):
        self.odometer_reading += miles


class Battery():
    """定义电池"""

    def __init__(self, better_size=70):
        """初始化电池属性"""
        self.battery_size = better_size

    def desc_battery(self):
        """打印电池容量"""
        print('当前电池容量：' + str(self.battery_size))


class ElectricCar(Car):
    """定义电动汽车"""

    def __init__(self, make, model, year):
        """初始化父类属性"""
        super().__init__(make, model, year)
        # 定义电动车的电池※
        self.battery = Battery()

    # def desc_battery(self):
    #     """打印电平容量"""
    #     print("这台电动车的电量是：" + str(self.bettery_size))

my_tesla = ElectricCar('tesla', 'model s', 2016)
print(my_tesla.get_desc_name())
my_tesla.battery.desc_battery()
```
- 就是类可以作为一个属性，写的时候`self.属性 = 类()`，不要忘记括号
- 调用`实例名.属性.属性`

# 11.导入类
总体来说与导入函数模块差不多
- 一个py文件可以有多个类，我们称这个py文件是一个模块

- 如何导入单个或多个类
`from 文件名 impor 文件中类名,2,3.......`导入多个或一个逗号分隔，直接使用类名即可

- 导入整个模块中所有的类`import 文件名`，此时使用类必须使用`模块名.类名`
- 导入整个模块中所有类2`from 文件名 import *`,此时可以直接使用类，但是不推荐，因为会导致冲突

# 12.模块导入模块

electic_car.py模块 是依赖car的，因此需要导入car模块，你不导入实例化会报错
```python
from car import Car
class Electric_car():
	...
```
事实表述意思就是模块也可以使用导入语句，因为如上不同模块之间也有依赖关系






