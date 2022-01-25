---
title: css选择器总结
date: 2020-02-22 16:21:21.0
updated: 2020-02-22 16:21:21.0
categories: CSS
tags: 
comments: true
---

# CSS选择器

## 1.元素选择器

```css
html元素名{}
```

## 2.分组选择器

```css
html元素名,...,...{} 中间使用逗号分隔
*{} 群组选择器
```

## 3.类选择器

```css
.class类名{css;...}
元素名.class类名{} 具有class的所有元素-结合元素选择器
.class1.class2{} 指必须包含这两个类名-多类选择器
```

## 4.ID选择器

```css
#id名{}
```

## 5.属性选择器

### 匹配属性名

```css
标签名[属性名]{} 
a[href]{}
```

### 匹配属性值

```css
1.完全匹配属性值
标签名[属性名="属性值"]{}   解释：完全匹配。
2.匹配部分属性值
标签名[属性名~="属性值1"]{} 解释：在标签下，属性值含有属性值1即可。
3.字串匹配属性选择器
标签名[属性名^="属性值1"]{} 解释：在标签下，匹配以属性值1开头的属性值。
标签名[属性名$="属性值1"]{} 解释：在标签下，匹配以属性值1结尾的属性值。
标签名[属性名*="属性值1"]{} 解释：在标签下，匹配以包含属性值1的属性值。
4.特定属性值选择器
标签名[属性名|="属性值1"]{} 解释：在标签下，匹配以属性值1或以属性值开头的属性值。
```

## 6.后代选择器

```css
标签名1 标签名2 ...{} 解释：标签之间是空格，是指标签下含有。
```

## 7.子元素选择器

```css
标签名1 > 标签名2 ...{} 解释：标签之间的符号，两个元素必须紧挨着，与后代选择器有所区别。后代选择器是下面有就可，
子元素选择器是下面必须是第一个。
```

## 8.相邻兄弟选择器

```
标签名1 + 标签名2...{} 解释：首先要使之生效必须这两个元素在同一个父元素下，其次关于后面的样式生效只能作用于两个元素的后一个元素。
```

## 9.伪类与伪元素

```css
伪类格式
标签名:伪元素{}
伪类
a:link {color: #FF0000}		/* 未访问的链接 */
a:visited {color: #00FF00}	/* 已访问的链接 */
a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
a:active {color: #0000FF}	/* 选定的链接 */
伪类+CSS类
a.red : visited {color: #FF0000}
<a class="red" href="css_syntax.asp">CSS Syntax</a>
伪元素
:first-line
p:first-line
  {
  color:#ff0000;
  font-variant:small-caps;
  }
:first-letter
p:first-letter
  {
  color:#ff0000;
  font-size:xx-large;
  }
伪类元素后面的样式限定以下，其他的不可以
font
color
background
margin
padding
border
text-decoration
vertical-align (仅当 float 为 none 时)
text-transform
line-height
float
clear
伪类+css
p.article:first-letter
  {
  color: #FF0000;
  }

<p class="article">This is a paragraph in an article。</p>
多重伪类元素
p:first-letter 第一个字母设置
  {
  color:#ff0000;
  font-size:xx-large;
  }

p:first-line 第一行设置
  {
  color:#0000ff;
  font-variant:small-caps;
  }
h1:before 元素之前插入内容
  {
  content:url(logo.gif);
  }
h1:after 元素之后插入内容
  {
  content:url(logo.gif);
  }
```

