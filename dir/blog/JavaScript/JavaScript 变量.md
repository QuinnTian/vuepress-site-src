---
title: js 变量总结
date: 2022-01-17 00:15:41
updated: 
categories: JavaScript
tags: 
    - JavaScript
    - 变量
    - let
    - var
    - const
    - 代码风格
comments: true
---
JavaScript 变量的总结和相关例子
<!-- more -->
# js 变量

- 变量命名规范

- 用 var 字声明变量
  - 可以声明和赋值同时进
  - 可以先声明在赋值
  - 同时声明多个变量
  - 声明和初始化可以混用
  - 若只声明不赋值会造成错误
  - 使用 var 声明允许重复声明
  - 不建议省略 var 关键字，因为在函数内省略关键字会成为全局变量
  - 使用 var 关键字定义的变量存在变量提升问题，也就是可以先用后使用
- 用 let 关键字进行声明变量
  - let 声明的变量作用域是块级，比如在函数内其作用域是函数
  - let 声明变量不存在提升，所以不允许出现重复声明的状况
  - 在不同作用域出现相同的使用 let 声明的变量名不会报错，因为他们属于不同作用域
  - 使用 var 声明再使用 let 声明会报错
  - let 变量不存在提升，不允许先使用后声明，这一现象叫做锁区
  - let 变量不会成为全局 windows 的属性，但用 var 声明的会
  - let 变量不能用条件式声明，因为他的作用域是块级
- 用 const 声明变量
  - const 声明的变量必须初始化
  - 不允许修改值
  - 不允许重复声明
  - const 声明的对象可以修改其对象属性，因为限制的是对象的引用不变
  - 使用 const 可以遍历对象
- 代码风格问题
  - 不使用 var 关键字
  - const 优先，let 其次

```js
// 变量名基本要求
/**
1. 变量必须以字母开头
2. 变量也能以 $ 和 _ 符号开头（不过我们不推荐这么做）
3. 变量名称对大小写敏感（y 和 Y 是不同的变量）
**/

// 例子1 使用 var 声明变量
var name = 1; // 声明同时赋值叫初始化

// 例子2 先声明后赋值
var name;
name = 1;

// 例子3 同时初始化多个变量
var name = 1 , age = 1;

// 例子4 声明和初始化混用
var name , age = 1; // 正确不建议

// 例子5 只声明不赋值会导致 undefined 错误
var x,y,z=1;// 错误写法

// 例子6 使用 var 声明，允许多次声明同一个变量不会报错
var x = 1;
var x = 2;// 不会报错

// 例子7 使用 var 声明，先初始化后再次声明不会报错
var x = 1;
var x;// 不会报错

// 例子8 函数内部用 var 声明的变量是全局变量
funciton(){
    var p1 = 1;// 使用 var 声明是局部变量
    p2 = 2;// 不使用 var 声明是全局变量，不建议这么做
}
console.log(p1);// 外部访问不到的
console.log(p2);// 外部可以访问到

// 例子9 var 关键字定义变量存在变量提升
// 变量提升表现：可以先用后声明变量
function(){
    console.log(name);// 可以先用
    var name = 1;// 后声明，js会自动提升到该作用域顶部
}
// 同样在全局作用域也是
console.log(name);
var name = 1;//会自动提升到全局作用域顶部
// 由于总是存在变量提升那么多次初始化同一个变量不会报错
var name = 1;
var name = 1;// name 总是提升并且覆盖之前的变量
console.log(name);// 输出1

// 例子10 let 是块级作用域
// 在函数内部声明，作用域是函数作用域
funciton(){
    let age = 1;
}
console.log(age);// 外部作用域无法访问
// 
if(true){
    let age = 1;
}
console.log(age);// 无法访问

// 例子11 let 不允许重复声明
let name;
let name;// 报错
var age;
var age;// 不报错

// 例子12 在不同的作用域内有重复的变量名不会报错，因为他们属于不同作用域
var age = 1;
if(true){
    var age = 2;
    console.log(age);//输出2，该变量作用域{块}
}
console.log(age);// 输出1，该变量作用域全局
let age = 1;
if(true){
    let age = 2;
    console.log(age);//输出2
}
console.log(age);// 输出1

// 例子13 重复声明混用会报错
var name;
let name;//报错

// 例子14 let 变量不会提升
console.log(age);// 报错
let age = 1;// 该声明 js 会注意到，但在未声明之前任何引用都会暂时性锁区，不允许使用

// 例子15 let 声明的变量不会成为全局 windows 对象的属性
let age = 1;
console.log(windows.age);//报错未定义
// var 声明的变量是全局对象属性
var age = 1;
console.log(age);// 输出1

// 例子15 使用 let 声明变量不会提升，所以不能重复声明
<script>
var name = 'a';
var age = 1;
</script>
<script>
var name = '2';// 不会报错，会自动提升覆盖已有变量名
let age = 36;// 报错变量已经声明
// let 声明变量不会提升覆盖，导致报错已经声明
</script>

// 例子16 不可以用条件判断声明 let （条件式声明 let ）
// 因为 let 作用域是块级
<script>
var name = 'a';
var age = 1;
</script>
<script>
var name = '2';
if(typeof name === 'undefined'){
	let age = 36;// 该变量作用域是{块}
}
name = 'b';// 该变量仍然是全局变量
try{
	console.log(age);
}catch(error){
	let age;// 该变量作用域是{块}
}
age = 26;// 该变量仍然是全局变量

// 例子17 使用 for 循环时用var的困扰

// 例子18 const 变量必须初始化，不允许修改值
const age = 23;
age = 30;// 报错

// 例子19 const 不允许重复声明
const age = 1;
const age = 2;

// 例子20 const 的作用域是块
if(true){
    const age = 1;
}
// 外部无法访问

// 例子21 使用 const 声明一个对象
const person = {};
person.name = 'a';// 不会报错，const 限制的是对象的引用，引用没有变

// 例子20 使用 const 遍历对象
for (const key in {a:1,b:2}){
    console.log(key);
}
// 输出 a,b ; 这里每次迭代都会创建一个新 key
for (const value of{1,2,3,4,5}){
    console.log(value);
}
// 输出1 2 3 4 5 6
for (var value of[1,2,3,4,5]){
    console.log(value);
}
// 输出1 2 3 4 5 6，这里的 value 是最初创建的，迭代一次不会新创建
```

