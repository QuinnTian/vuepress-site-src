---
title: MySql回顾（一）数据定义（数据库定义、表定义、索引和视图定义）.md
date: 2018-07-31 22:54:13.0
updated: 2020-01-25 15:51:29.0
categories: MySQL
tags: 
comments: true 
---

title: MySql回顾（一）数据定义（数据库定义、表定义、索引和视图定义）
date: '2018-07-31 22:54:13'
updated: '2018-08-27 11:33:27'
tags: [Mysql, Mysql回顾]
permalink: /articles/2018/07/31/1533047632551.html
---
![imagepng](https://res.quinntian.xyz//file/2018/08/5362f5d2727a4e09ab2e10f38285330c_image.png) 
## 第一部分 模式定义

### 1. 登录数据库
``` 
  mysql -h localhost -u root -p
  
```
### 2. 创建数据库
#### 2.1 标准语法
```
  create {database||schema} [if not exists] 数据库名 
  [default] character set[=]字符集 
  [default] collate[=]字符集校验规则
```
#### 2.2 简易写法
```
  create database||schema [if not exist] 数据库名
```
### 3. 删除数据库
```
  drop database ||schema  [if not exist] 数据库名
```
### 4. 选择数据库
``` 
  use 数据库名 
```
### 5. 修改数据库
参照**修改表**时和修改数据库同时使用
``` 
  alter database 数据库名 
```
### 6. 查看数据库
``` 
  show databases||schemas [like ‘’|where expression]
```

## 第二部分 表定义

### 1. 创建表
#### 1.1 完整语法

``` 
  create [temporary] 表名(
  字段名 数据类型[完整性约束],
  字段名2 数据类型[完整性约束],
  ......)[engine=引擎类型];
```
#### 1.2 参数及注意事项
* [temporary] 创建临时表。
* [engine=引擎类型]可选引擎类型
* 创建数据库前要进行选择数据库，否则会报错，选择数据库语法``` use 数据库名```。

#### 1.3 完整性约束
* ``` primary key```  标识主键
* ``` foreign key``` 标识外键
* ``` not null key```  标识不能为空
* ``` unique```  标识该属性是唯一
* ``` auto_increase```  标识该属性值是自动增长
* ``` default```  为该属性设置默认值

##### 1.3.1 主键
1. 单一字段主键 
 ```
  属性名 数据类型 primary key 
 ``` 
2. 多字段主键

	* ``` primary key(属性1,2,3,4....) ```
	* 结合创建表语句的例子(联合主键)
	
		 ``` 
			create table example2(
				stu_id int,
				course_id int,
				grade float,
				primary key(stu_id,course_id)
			); 
		 ```
##### 1.3.2 外键
1. 区分父表和主表
> A表-> sno->外键
> B表-> id
> 若sno->依赖->id, B为父表，A为子表
> sno->A表外键
**外键在的表为子表，被引用的键所在的表是主表**

2. 语法格式
	* ``` constraint 外键别名 foreign key(属性1,属性...) references 表名(属性2,属性...)```
	* 结合创建语句的示例
		```
			create table example3(
			  id int(primary key),
			  stu_id int,
			  constraint c_fk foregin key(stu_id,course_id) references example2(stu_id,course_id);
			);
			联合外键参考example2中的两个属性
		```
##### 1.3.3 非空约束
1. 基本语法
``` 属性名 数据类型 not null ```
2. 结合创建语句示例
	 ```
		create table example4(id int not null primary key,
		name varchar(20) not null,
		stu_id int,constraint c_fk foregin key(stu_id) references example(stu_id))
		
	```
##### 1.3.4 唯一约束

1. 基本语法
``` 属性名 数据类型 unique```
2. 结合创建语句示例
	```
	create table example5(id int primary key,
	stu_id int unique,
	name varchar not null);
	```
##### 1.3.5 属性自动增长
1. 基本语法
``` 属性名 数据类型 auto_increment ```
2. 结合创建语句示例
	```
		 create table example6(
		  id int primary key auto_increment,
		  stu_id int unique,
		  name varchar(20) not null
		  );
	```
##### 1.3.6 属性的默认值
1. 基本语法
``` 属性名 数据类型 defaut 默认值```
2. 结合创建语句示例
	```
	create table example7(id int primary key auto_increment,
	stu_id int unique,
	name varchar(20) not null,
	english varchar(20) default 'zero'),
	math float default 0,
	computer float default 0);
	```
##### 1.3.7 注释
### 2. 更新表（表的列）
#### 2.1 表增加列
add[column]
``` 
  alter table 表名 add[column] 属性1 数据类型 [完整性约束条件] [first || after 属性名2];
```

#### 2.2 修改列名称或数据类型
``` 
  alter table 表名 change 旧属性 新属性 新的数据类型 
```
#### 2.3 修改或删除列的默认值
#### 2.4 修改列数据类型
modify[column]
``` 
  alter table 表名 modify[column] 属性名 数据类型
```

#### 2.5 删除列
drop[column]
``` 
  alter table 表名 drop[column] 属性名 
```
#### 2.6 重命名
rename[to]
``` 
  alter table 旧表名 rename to 新表名
```
#### 2.7 修改列的排列位置
``` 
  alter table 表名 modify 属性名 数据类型  first || after 属性名2;
```
#### 2.8 更改表的存储引擎
``` 
  alter table engine=存储引擎
```
#### 2.9 删除表的外键约束
``` 
  alter table 表名 drop foregin key 外键别名 
```
### 3. 重命名表
``` 
  rename table 表名 to 新表名,.......
```
可命名多个
### 4. 删除表
``` 
  drop table[if exist] 表名1,... 
```
### 5. 查看表
#### 5.1 查看所有表名
``` 
  show [full] tables [from|in] 数据库
```
#### 5.2 查看表结构
``` 
  show [full] columns from|in 表名 [from|in 数据库名]
  [like '' | where expr]
```
或
``` 
  describe(或简写desc) 表名 
```
#### 5.3 查看表详细结构
``` 
  show create table 表名 \g(以较优雅的方式显示)
```
## 第三部分 索引定义







