---
title: JavaScript要点笔记
date: 2020-12-09 21:23:59.0
updated: 2020-12-10 16:41:33.0
categories: JavaScript
tags: 
comments: true
---


# 变量提升
> JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。
JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。
```JavaScript
x = 5; // 变量 x 设置为 5

elem = document.getElementById("demo"); // 查找元素
elem.innerHTML = x;                     // 在元素中显示 x

var x; // 声明 x
//结果相同

var x; // 声明 x
x = 5; // 变量 x 设置为 5

elem = document.getElementById("demo"); // 查找元素
elem.innerHTML = x;                     // 在元素中显示 x
```
- **变量提升：函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部**

**变量初始化不会提升**
```JavaScript
var x = 5; // 初始化 x

elem = document.getElementById("demo"); // 查找元素
elem.innerHTML = x + " " + y;           // 显示 x 和 y

var y = 7; // 初始化 y
等同于
var x = 5; // 初始化 x
var y;     // 声明 y

elem = document.getElementById("demo"); // 查找元素
elem.innerHTML = x + " " + y;           // 显示 x 和 y

y = 7;    // 设置 y 为 7

```
**运行显示y未定义；所谓初始化就是声明的同时附初始值。上面y未被声明的原因是，使用在前，初始化在在后，但初始化不会提升变量**
改成如下，可以正常运行，是因为初始化在上，尽管未被提升。
```JavaScript
var x = 5; // 初始化 x
var y = 7; // 初始化 y

elem = document.getElementById("demo"); // 查找元素
elem.innerHTML = x + " " + y;           // 显示 x 和 y

```
- **为了避免这些问题，通常我们在每个作用域开始前声明这些变量，这也是正常的 JavaScript 解析步骤，易于我们理解。**
- **JavaScript 严格模式(strict mode)不允许使用未声明的变量。**
# 严格模式
> JavaScript 严格模式（strict mode）即在严格的条件下运行。
"use strict" 指令在 JavaScript 1.8.5 (ECMAScript5) 中新增。
它不是一条语句，但是是一个字面量表达式，在 JavaScript 旧版本中会被忽略。
"use strict" 的目的是指定代码在严格条件下执行。

**严格模式下你不能使用未声明的变量。**
```JavaScript
支持严格模式的浏览器:
Internet Explorer 10 +、 Firefox 4+ Chrome 13+、 Safari 5.1+、 Opera 12+。
```
```JavaScript
"use strict";
```
**不允许删除变量或对象**
```JavaScript
"use strict";
var x = 3.14;
delete x;                // 报错

```
**不允许删除函数。**
```JavaScript
"use strict";
function x(p1, p2) {};
delete x;                // 报错

```
**不允许变量重名:**
```JavaScript
"use strict";
function x(p1, p1) {};   // 报错
```
**不允许使用八进制:**
```JavaScript
"use strict";
var x = 010;             // 报错

```
不允许使用转义字符:
```JavaScript
"use strict";
var x = \010;            // 报错

```
**不允许对只读属性赋值:**
```JavaScript
"use strict";
var obj = {};
Object.defineProperty(obj, "x", {value:0, writable:false});

obj.x = 3.14;            // 报错

```
**不允许对一个使用getter方法读取的属性进行赋值**
```JavaScript
"use strict";
var obj = {get x() {return 0} };

obj.x = 3.14;            // 报错

```
**不允许删除一个不允许删除的属性：**
```java
"use strict";
delete Object.prototype; // 报错


```
**变量名不能使用 "eval" 字符串:**
```JavaScript
"use strict";
var eval = 3.14;         // 报错

```
**变量名不能使用 "arguments" 字符串:**
```JavaScript
"use strict";
var arguments = 3.14;    // 报错

```
**不允许使用以下这种语句**
```JavaScript
"use strict";
with (Math){x = cos(2)}; // 报错

```
**由于一些安全原因，在作用域 eval() 创建的变量不能被调用：**
```JavaScript
"use strict";
eval ("var x = 2");
alert (x);               // 报错

```
**禁止this关键字指向全局对象。**
```JavaScript
function f(){
    return !this;
} 
// 返回false，因为"this"指向全局对象，"!this"就是false

function f(){ 
    "use strict";
    return !this;
} 
// 返回true，因为严格模式下，this的值为undefined，所以"!this"为true。

```
因此，使用构造函数时，如果忘了加new，this不再指向全局对象，而是报错。
```JavaScript
function f(){
    "use strict";
    this.a = 1;
};
f();// 报错，this未定义

```
**保留关键字**
```JavaScript
为了向将来Javascript的新版本过渡，严格模式新增了一些保留关键字：

implements
interface
let
package
private
protected
public
static
yield

```













# 函数
> 函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。
## 函数的基本语法
```JavaScript
function functionname()
{
    // 执行代码
}

```
**大小写敏感**
## 返回值函数
```JavaScript
function myFunction()
{
    var x=5;
    return x;
}

```
- 函数内的变量是**局部变量**，**函数外声明的是全局变量**
- **声明周期：局部变量函数运行完，全局变量页面关闭**
**变量如果没声明就赋值，则会把变量赋值为windows**
```JavaScript
var var1 = 1; // 不可配置全局属性
var2 = 2; // 没有使用 var 声明，可配置全局属性

console.log(this.var1); // 1
console.log(window.var1); // 1
console.log(window.var2); // 2

delete var1; // false 无法删除
console.log(var1); //1

delete var2; 
console.log(delete var2); // true
console.log(var2); // 已经删除 报错变量未定义

```
**意思是未声明全局变量可以配置也就是可以删除，声明的不可以配置也就是不可以删除**

## 函数表达式即匿名函数
**所谓函数表达式就是将函数赋值给一个变量的格式，这个变量以后就可以当做函数来使用，而不是以往只能用带括号的形式调用**
**另外这种格式，还有另外一种叫法++匿名函数++**
```JavaScript
var x = function (a, b) {return a * b};
var z = x(4, 3);

```
## 内置构造函数来定义函数
**使用函数构造器，通过js内置的函数构造器进行定义**
```JavaScript
var myFunction = new Function("a", "b", "return a * b");

var x = myFunction(4, 3);
//等同于
var myFunction = function (a, b) {return a * b};

var x = myFunction(4, 3);
```
## 函数提升
**参见提升**
**函数可以在声明之前就可以调用。提升将函数的作用域提升到前面**
```JavaScript
myFunction(5);

function myFunction(y) {
    return y * y;
}

```
**使用表达式定义函数无法提升**
## 自调用函数
- **只有函数表达式才能自调用，其格式是在后面加一个括号**
```JavaScript
(function () {
    var x = "Hello!!";      // 我将调用自己
})();

```
**上面的函数用一个括号括起来的意思是说明这是一个函数表达式-匿名函数**
## 函数可以当做值和表达式使用
```JavaScript
function myFunction(a, b) {
    return a * b;
}

var x = myFunction(4, 3);

function myFunction(a, b) {
    return a * b;
}

var x = myFunction(4, 3) * 2;
```
## 函数是对象
**在js中任何一个都可以当做对象**
> 在 JavaScript 中使用 typeof 操作符判断函数类型将返回 "function" 。
但是JavaScript 函数描述为一个对象更加准确。
**JavaScript的函数是由属性和方法的**
比如arguments.length返回函数调用参数个数。
```JavaScript
function myFunction(a, b) {
    return arguments.length;
}
```
**toString方法可以函数作为一个字符串返回，运行后整个函数会作为一个字符串输出**
```JavaScript
function myFunction(a, b) {
    return a * b;
}

var txt = myFunction.toString();
```
## 函数与对象里的方法的关系
- **函数如果在所定义对象里出现，叫做对象方法**
- **函数如果用于创建新的对象，叫做对象的构造函数**
## 箭头函数
**在es6笔记中提到**
**声明函数的语法变了，变得更加简洁**
```JavaScript
(参数1, 参数2, …, 参数N) => { 函数声明 }

(参数1, 参数2, …, 参数N) => 表达式(单一)
// 相当于：(参数1, 参数2, …, 参数N) =>{ return 表达式; }

```
**当括号里的参数只有一个的时候，可以把括号省略不写**
```JavaScript
(单一参数) => {函数声明}
单一参数 => {函数声明}
```
**如果没有参数，则圆括号必须写**
```JavaScript
() => {函数声明}

```
**es5当前与es6的对比**
```JavaScript
// ES5
var x = function(x, y) {
     return x * y;
}
 
// ES6
const x = (x, y) => x * y;
```
- **有的箭头函数没有自己的this,所以不适合用于对象中的方法，参见[对象方法](#对象方法)**
- 箭头函数会帮我绑定外层this的值，也就是说一个函数里如果有一个箭头函数，那么在里面的this和外层函数的this所指向的都是外层。[参见es6的this](参见es6的this
)
- **箭头函数不能提升，必须先声明后使用**
- 使用箭头函数最好使用const声明，而不是var,因为函数是个常量
```JavaScript
const x = (x, y) => { return x * y };

```
## 函数的显式参数和隐式参数
```JavaScript
functionName(parameter1, parameter2, parameter3) {
    // 要执行的代码……
}

```
- **什么是显式参数：显式参数就是定义函数的时候会显式的指明参数**
- **什么是隐式参数：就是调用函数传递函数真正的值**
- **类似Java中的形参和实参**
**参数规则**
- **显式参数不需要指定类数据类型**
- **隐式参数没有类型检测**
- **隐式参数的个数没有限制，不会检测，传几个是几个**
- **在ES5中参数掉用的时候如果没有出入参数，参数默认设置位undefined，但是建议最好设置一个默认值**
```xml
function myFunction(x, y) {
    if (y === undefined) {
          y = 0;
    } 
}
function myFunction(x, y) {
    y = y || 0;
}

```
**上面面||意思是或的意思，如果函数定义了那么代表是true，如果参数未定义则是undefined代表false，那么会返回0，并赋值给y**
## ES6函数支持设置默认值
```JavaScript
function myFunction(x, y = 10) {
    // y is 10 if not passed or undefined
    return x + y;
}
 
myFunction(0, 2) // 输出 2
myFunction(5); // 输出 15, y 参数的默认值

```
## 函数里的内置对象arguments
**函数是一个对象，里面内置一个对象，arguments里有函数调用的参数数组**
```JavaScript
x = findMax(1, 123, 500, 115, 44, 88);
 
function findMax() {
    var i, max = arguments[0];
    
    if(arguments.length < 2) return max;
 
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max;
}

```
**上面的函数 尽管没有显示参数，但是仍然可以传递参数进去，见显式参数和隐式参数，但是传入的参数如何使用，这时候就可以用arguments对象，这个对象以数组的方式存储函数的参数列表**
## 函数通过值传递参数
**函数通过隐式参数将值传入函数内，在函数内修改参数的值，不会影响外部值，也不会影响显示参数的初始值**
## 函数通过对象传递参数
**因为是对象，对象是一种引用，所以在函数内修改对象的属性，就会修改其初始值，因为对象是一种引用**
## 函数作为一个函数调用与this的指向
- **在函数中this的作用：谁调用指向谁**
- **直接调用：`函数名（参数列表）`**
> 函数不属于任何对象。但是在 JavaScript 中它始终是默认的全局对象。
在 HTML 中默认的全局对象是 HTML 页面本身，所以函数是属于 HTML 页面。
在浏览器中的页面对象是浏览器窗口(window 对象)。以上函数会自动变为 window 对象的函数。
myFunction() 和 window.myFunction() 是一样的：
```JavaScript
function myFunction(a, b) {
    return a * b;
}
window.myFunction(10, 2);    // window.myFunction(10, 2) 返回 20

```
**函数中的this**
**函数中的this指向其谁调用就指向谁**，**因此如果不是被自身调用就会指向被调用者，在web浏览器中就会指向windows对象（浏览器）**
```JavaScript
function myFunction() {
    return this;
}
myFunction();                // 返回 window 对象

```

## 函数作为方法调用与this的指向
**函数在对象中叫做方法**
```JavaScript
var myObject = {
    firstName:"John",
    lastName: "Doe",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}
myObject.fullName();         // 返回 "John Doe"

```
**上述函数做一个对象中的方法，函数同时也是一个对象，其所有者是对象myObject，那么this所代表的是函数的拥有者myObject对象**
```JavaScript

ar myObject = {
    firstName:"John",
    lastName: "Doe",
    fullName: function () {
        return this;
    }
}
myObject.fullName();          // 返回 [object Object] (所有者对象)

```

## 使用构造函数调用函数与this指向
- **什么是调用函数的构造函数：在调用函数前，前面增加一个new**
- **实际是指调用函数的构造函数，会创建一个新的对象，这个新对象继承了构造函数的属性和方法**
```JavaScript
// 构造函数：只是函数体内写法不同，其他语法未变
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}
 
// This    creates a new object
var x = new myFunction("John","Doe");
x.firstName;                             // 返回 "John"
```
**这里的this没有任何的值，只有当函数被调用实例化的时候才会创建,实例化后这里的this是指向新创建对象本身，因为这里是指新创建的实例其继承构造函数中的属性和方法，严格来说已经不叫函数对象**
## 函数的方法调用函数
**函数是一种对象，那么对象就有属性和方法**
**在函数对象中有预定义的两个方法可以调用函数，叫做call()和apply（）**
```JavaScript
<p id="demo"></p>

<script>
var myObject;
function myFunction(a, b) {
    return a * b;
}
myObject = myFunction.call(myObject, 10, 2);    // 返回 20
document.getElementById("demo").innerHTML = myObject; 


<p id="demo"></p>

<script>
var myObject, myArray;
function myFunction(a, b) {
    return a * b;
}
myArray = [10, 2]
myObject = myFunction.apply(myObject, myArray);      // 返回 20
document.getElementById("demo").innerHTML = myObject; 
</script>
```
> 在 JavaScript 严格模式(strict mode)下, 在调用函数时第一个参数会成为 this 的值， 即使该参数不是一个对象。
在 JavaScript 非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。
通过 call() 或 apply() 方法你可以设置 this 的值, 且作为已存在对象的新方法调用。

**两个方法的第一参数都是传入一个对象**
**不同的是apply第二个参数传入的是数组，而call单独传入**



























# js对象
> JavaScript 对象是拥有属性和方法的数据。

**在js中什么都是变量**
```JavaScript
var car = "Fiat";
```
**上面是变量赋值为...**
**对象是变量，变量也是对象，不同的是对象可以包含多个变量**
```JavaScript
var car = {type:"Fiat", model:500, color:"white"};
```
## 对象定义
```JavaScript
var person = {
    firstName:"John",
    lastName:"Doe",
    age:50,
    eyeColor:"blue"
};
```
## 对象属性
**对象是键值对的容器**
**所以上面的键值对叫做对象属性**
> **类似**
PHP 中的关联数组
Python 中的字典
C 语言中的哈希表
Java 中的哈希映射
Ruby 和 Perl 中的哈希表
## 访问对象属性
```JavaScript
person.lastName;
person["lastName"];

```
**一种类似java对象.属性名，一种类似键值对取值**
## 对象方法<span id="对象方法">
**访问**
```JavaScript
name = person.fullName();

```
**创建**
```JavaScript
methodName : function() {
    // 代码 
}
var person = {
    firstName: "John",
    lastName : "Doe",
    id : 5566,
    fullName : function() 
	{
       return this.firstName + " " + this.lastName;
    }
};

```
**格式是++方法名：function{方法体}++**
**对象的方法和单独创建函数格式不同**

# 作用域

**抽象来说js作用域就是变量、对象、函数的集合**
## 局部作用域
```JavaScript
// 此处不能调用 carName 变量
function myFunction() {
    var carName = "Volvo";
    // 函数内可调用 carName 变量
}

```
**函数内是局部作用域，声明的变量是局部变量不能再外部使用，函数运行完销毁**
## 全局作用域
```JavaScript
var carName = " Volvo";
 
// 此处可调用 carName 变量
function myFunction() {
    // 函数内可调用 carName 变量
}

```
- **函数外是全局作用域，声明的变量叫全局变量，任何地方可用，浏览器关闭销毁**
- **没有声明，就赋值，是全局变量，尽管可能在函数体内声明了，如下**
- **函数的参数是局部变量**
```JavaScript
// 此处可调用 carName 变量
 
function myFunction() {
    carName = "Volvo";
    // 此处可调用 carName 变量
}
```
## 变量生命周期
- 局部变量函数用完就销毁
- 全局变量浏览器关闭才销毁
## HTML全局变量与window对象
**window对象是全局变量，同时所有的全局变量都是属于window对象，所以可以如下调用**
```JavaScript
//此处可使用 window.carName
 
function myFunction() {
    carName = "Volvo";//此处是全局变量因为没有var定义就直接赋值了
}

```
# 事件
**什么是事件？发生在html元素上的事，比如单击一个按钮**
**只有你使用了js才会触发这些事件**
**HTML的事件可以使浏览器的行为，如HTML 页面完成加载，也可是用户行为如1**
**事件触发可以去执行一些js代码**

**事件的使用**
**在HTML元素的属性中有事件属性**
```JavaScript
<button onclick="getElementById('demo').innerHTML=Date()">现在的时间是?</button>

```
**这里的onclick就是HTML元素的一个属性，事件属性，在属性值里可以书写js代码！**
**如何调用js代码，比较常见的是在事件的属性值里书写js代码**
> 事件可以用于处理表单验证，用户输入，用户行为及浏览器动作:
页面加载时触发事件
页面关闭时触发事件
用户点击按钮执行动作
验证用户输入内容的合法性
等等 ...
可以使用多种方法来执行 JavaScript 事件代码：
- HTML 事件属性可以直接执行 JavaScript 代码
- HTML 事件属性可以调用 JavaScript 函数
- 你可以为 HTML 元素指定自己的事件处理程序
你可以阻止事件的发生。
等等 ..









