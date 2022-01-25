---
title: JavaScript匿名函数和回调函数的理解.md
date: 2018-09-03 16:46:23.0
updated: 2020-01-25 15:48:49.0
categories: JavaScript
tags: 
comments: true
---

title: JavaScript匿名函数和回调函数的理解
date: '2018-09-03 16:46:23'
updated: '2018-09-03 17:06:42'
tags: [JavaScript]
permalink: /articles/2018/09/03/1535964349016.html
---
### 匿名函数
匿名函数又称闭包函数，顾名思义就是没有函数名的函数
#### 1.创建函数的方式
普通函数
``` JavaScript
  function 函数名(){函数体}
```
匿名函数
``` JavaScript
  function(){函数体}
  alert(typeof function(){});// "function" 
  alert(typeof function(x,y){return x+y;});// "function" 
  alert(typeof new Function("x","y","return x*y;"))// "function" 
  alert(typeof function(){});// "function"
  alert(typeof function(x,y){return x+y;});// "function"
  alert(typeof new Function("x","y","return x*y;"))// "function"
```
#### 2.匿名函数用途
回调函数和直接使用函数
#### 3.匿名函数调用
``` JavaScript
  var abc=function(x,y){ 
	return x+y; 
	  } 
  alert(abc(2,3)); // "5"
```
或使用小括号
``` JavaScript
  alert((function(x,y){return x+y;})(2,3));// "5" 
  alert((new Function("x","y","return x*y;"))(2,3));// "6"
```
> 小括号能把我们的表达式组合分块，并且每一块，也就是每一对小括号，都有一个返回值。这个返回值实际上也就是小括号中表达式的返回值。所以，当我们用一对小括号把匿名函数括起来的时候，实际上小括号对返回的，就是一个匿名函数的Function 对象。因此，小括号对加上匿名函数就如同有名字的函数般被我们取得它的引用位置了。所以如果在这个引用变量后面再加上参数列表，就会实现普通函数的调用形式。
```
var abc=function(x,y){return x+y;};// 把匿名函数对象赋给abc 
// abc 的constructor 就和匿名函数的constructor 一样了。也就是说，两个函数的实现是一样的。 
alert((abc).constructor==(function(x,y){return x+y;}).constructor);
```
PS ：constructor 是指创建对象的函数。也就是函数对象所代表的函数体。
总之，将其（被小括号包含的匿名函数）理解为括号表达式返回的函数对象，然后就可以对这个函数对象作正常的参数列表调用了。（前面这里犯了个错误，只有函数表达式还是不能直接调用函数的，去掉匿名函数括号必须要伴随将表达式赋值。也就是(function(){alert(1)})() 应该是与 a=function(){alert(1)}() 等价，不能连a= 都去掉。）

匿名函数链式调用
````
  (function(o) { 
  alert(o); 
  return arguments.callee; 
  })('water')('down');
````
不常见的匿名函数调用
```
  ~(function(){ 
  alert('water'); 
  })();//写法有点酷~

  void function(){ 
  alert('water'); 
  }();

  +function(){ 
  alert('water'); 
  }();

  -function(){ 
  alert('water'); 
  }();

  ~function(){ 
  alert('water'); 
  }();

  !function(){ 
  alert('water'); 
  }();

  (function(){ 
  alert('water'); 
  }());
```
#### 4.闭包
> 闭包是什么？闭包是指某种程序语言中的代码块允许一级函数存在并且在一级函数中所定义的自由变量能不被释放，直到一级函数被释放前，一级函数外也能应用这些未释放的自由变量。
怎样？看得一头冒汗吧…… 没事，我也是（虽然是我是了解的，只是表达能力的问题）。让我们换个更加简单的方法说明：闭包，其实是一种语言特性，它是指的是程序设计语言中，允许将函数看作对象，然后能像在对象中的操作般在函数中定义实例（局部）变量，而这些变量能在函数中保存到函数的实例对象销毁为止，其它代码块能通过某种方式获取这些实例（局部）变量的值并进行应用扩展。
不知道这么再解释后会否更加清晰，如果还是不明白，那么我们再简化一下：**闭包，其实就是指程序语言中能让代码调用已运行的函数中所定义的局部变量。**
```
var abc=function(y){ 
var x=y;// 这个是局部变量 
return function(){ 
alert(x++);// 就是这里调用了闭包特性中的一级函数局部变量的x ，并对它进行操作 
alert(y--);// 引用的参数变量也是自由变量 
}}(5);// 初始化 
abc();// "5" "5" 
abc();// "6" "4" 
abc();// "7" "3" 
alert(x);// 报错！“x” 未定义！
```
是否应用了闭包特性，必须确定该段代码有没有最重要的要素：未销毁的局部变量。那么很显然，没有任何实现的匿名函数不可能应用了闭包特性。但如果匿名函数里面有实现呢？那也还得确定它的实现中有没有 用到那些未销毁的局部变量。所以如果问你那个开篇中的jQuery 代码片段是应用了JS 里的什么特性？那么它只是匿名函数与匿名函数的调用而已。但是，它 隐含了闭包的特性，并且随时可以实现闭包应用。

### 回调函数 
函数的一种创建方式
```
  //可以这样创建函数`

  var fn = new `Function("arg1","arg2","return arg1 * arg2;");`

  fn(2, 3); //6
```
传递函数作为回调
```
  function fn(arg1, arg2, callback){
   var num = Math.ceil(Math.random() * (arg1 - arg2) + arg2);
   callback(num);　　//传递结果
  }

  fn(10, 20, function(num){
   console.log("Callback called! Num: " + num); 
  });　　　　//结果为10和20之间的随机数
```

[原文地址](https://www.jb51.net/article/58722.htm)
