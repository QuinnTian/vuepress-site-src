---
title: css定位总结
date: 2020-02-23 22:38:01.0
updated: 2020-02-23 22:38:01.0
categories: CSS
tags: 
comments: true
---



# css定位

```css
块级元素 独占一行、可设宽高、默认父元素宽度、高度如果不设置只能靠内容撑起
	常见元素 div h p ul ol li 
行内元素 在一行显示、不可设宽高、紧靠内容撑起宽高
	常见元素 span a strong b em l del s
行内块元素 在一行显示、可设宽高、不会默认父元素宽度
	常见元素 img input td
四种定位
通过 position 属性设置
static
relative
absolute
fixed

```

## 相对定位

```css
postion:relative
top:
buttom:
right:
left
偏移原来位置，且原位置所占空间保留。
```

## 绝对定位

```css
position:absolute
根据祖先元素偏移，原来位置空间删除。
```

## 浮动

```css
float:
偏移后只是原位置不占据空间，但是文字会浮动其周围，原因是早起就是为了开发环绕图片的所开发的。
解决各种元素环绕的方法就是设置clear.
clear:right left both inherit 就是说该元素的哪一边不允许出现浮动元素
```

