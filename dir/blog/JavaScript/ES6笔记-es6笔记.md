---
title: ES6笔记
date: 2020-12-09 20:36:09.0
updated: 2020-12-09 20:39:33.0
categories: JavaScript
tags: 
comments: true 
---

# es6是什么
> ECMAScript 6 目前基本成为业界标准，它的普及速度比 ES5 要快很多，主要原因是现代浏览器对 ES6 的支持相当迅速，尤其是 Chrome 和 Firefox 浏览器，已经支持 ES6 中绝大多数的特性。

**就是最新的JavaScript标准，之前是es5**
# let、const 和 block 作用域
## let
```java
var a = 2;
{
  let a = 3;
  console.log(a); // 3
}
console.log(a); // 2

```
> let 允许创建块级作用域，ES6 推荐在函数中使用 let 定义变量，而非 var：

**创建块级作用域，在函数体中使用不再用var 定义变量了，而是let**
## const
```JavaScript
{
  const ARR = [5,6];
  ARR.push(7);
  console.log(ARR); // [5,6,7]
  ARR = 10; // TypeError
}

```
> 同样在块级作用域有效的另一个变量声明方式是 const，它可以声明一个常量。ES6 中，const 声明的常量类似于指针，它指向某个引用，也就是说这个「常量」并非一成不变的

**使用const声明块级变量，声明的是常量，类似于C中的指针（引用），不是一成不变的**
> let 关键词声明的变量不具备变量提升（hoisting）特性
let 和 const 声明只在最靠近的一个块中（花括号内）有效
当使用常量 const 声明时，请使用大写变量，如：CAPITAL_CASING
const 在声明时必须被赋值
- **let关键字声明的变量不具备变量提升，所谓变量提升就是：先声明后用和先用后声明都一样，js默认提升到首部，但是用let就不行，变量不会被默认上升到首部，也就是说在哪声明后下面能用，之上不能使用**
- **作用域问题：let和var声明靠近最近的花括号中可以使用**
- **声明标准问题：const必须使用大写变量
- **const声明必须赋值**
# 箭头函数
> ES6 中，箭头函数就是函数的一种简写形式，使用括号包裹参数，跟随一个 =>，紧接着是函数体：

**函数的简写形式**
```xml
var getPrice = function() {
  return 4.55;
};
 
// Implementation with Arrow Function
var getPrice = () => 4.55;

```
**第一种js常见的函数，第二种函数简写形式
具体语法--->++（函数参数）=>{函数体}++**
```xml
let arr = ['apple', 'banana', 'orange'];
 
let breakfast = arr.map(fruit => {
  return fruit + 's';
});
 
console.log(breakfast); // apples bananas oranges
```

>  **关于上面map函数可能看不懂是JavaScript的原生函数，其中fruit是函数的参数，这里因为一个参数省略了括号**，
他的作用是
map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
map() 方法按照原始数组元素顺序依次处理元素。
**就是返回经过函数处理的数组，也就是说调用这个方法，会把数组中的数据依次传入后面的函数处理**
语法：**array.map(function(currentValue,index,arr), thisValue)**
**其中第二个参数是可选值**，参见 https://www.runoob.com/jsref/jsref-map.html
**下面是正常使用非es6简化函数的用法**
```xml
var numbers = [65, 44, 12, 4];

function multiplyArrayElement(num) {
    return num * document.getElementById("multiplyWith").value;
}

function myFunction() {
    document.getElementById("demo").innerHTML = numbers.map(multiplyArrayElement);
}
```
**箭头函数让this对象总是指向对象本身**
```xml
function Person() {
  this.age = 0;
 
  setInterval(function growUp() {
    // 在非严格模式下，growUp() 函数的 this 指向 window 对象
    this.age++;
  }, 1000);
alert(this.age);
}
var person = new Person();
```
**运行后会发现浏览器的提示永远都是0，也就是说明grow函数内的this.age指向的并不是外部函数person里的this.age，而是指向的windows对象**
```xml
function Person() {
  var self = this;
  self.age = 0;
 
  setInterval(function growUp() {
    self.age++;
  }, 1000);
}

```
**所以在这种写法中，如果grow函数需要使用外部的函数的age，我们通常的做法是先将this赋值给一个对象，这样就避免了指向Windows对象**
**但是使用箭头函数避免上述麻烦**
```xml
unction Person(){
  this.age = 0;
 
  setInterval(() => {
    // |this| 指向 person 对象
    this.age++;
  }, 1000);
}
 
var person = new Person();

```
# 函数参数默认值
**ES6 中允许你对函数参数设置默认值**
```xml
let getFinalPrice = (price, tax=0.7) => price + price * tax;
getFinalPrice(500); // 850

```
# Spread / Rest 操作符
> Spread / Rest 操作符指的是 ...，具体是 Spread 还是 Rest 需要看上下文语境。

**就是三个点...**
当被用于迭代器中时，它是一个 Spread 操作符：
**作为数组传入，但是参数是三个此时...的作用就是迭代数组分别传入参数**
```xml
function foo(x,y,z) {
  console.log(x,y,z);
}
 
let arr = [1,2,3];
foo(...arr); // 1 2 3

```
用于函数传参的时候是一个rest
**数组传参的时候，把参数转换为数组形式**
```xml
function foo(...args) {
  console.log(args);
}
foo( 1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]

```



