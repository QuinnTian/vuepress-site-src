---
title: css框模型总结
date: 2020-02-23 21:44:08.0
updated: 2020-02-23 21:44:08.0
categories: CSS
tags: 
comments: true
---

# css框模型
![image.png](https://quinntian.com/upload/2020/2/image-b1d9940ce7124af6b0100718386301b0.png)


```css
由外到内 
外边距margin 由边框到外的距离。
边框border 边框。
内边距padding 由边框到内的距离。
元素element 实际部分。
外边距、边框、内边距的默认都是0，但是有可能被设置过。
正常下width设置的是元素的宽度，但是早起IE宽度是指元素宽度+内边距+边框宽度。
```

## margin

```css
各种写法
margin:长度单位、百分比、负值,其中百分比基于父元素
margin:上 左 下 右
margin-top
margin-buttom
margin-right
margin-left
外边距的合并
上下合并 使用最大的外边距
包含合并 如果没有设置内边距，也会发生合并
空元素合并 没有内容、边距、填充也会发生合并
```

值传递

![image.png](https://quinntian.com/upload/2020/2/image-e03349933f784aac9776d9cca6567ba6.png)

## border

```css
border-style
none	定义无边框。
hidden	与 "none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。
dotted	定义点状边框。在大多数浏览器中呈现为实线。
dashed	定义虚线。在大多数浏览器中呈现为实线。
solid	定义实线。
double	定义双线。双线的宽度等于 border-width 的值。
groove	定义 3D 凹槽边框。其效果取决于 border-color 的值。
ridge	定义 3D 垄状边框。其效果取决于 border-color 的值。
inset	定义 3D inset 边框。其效果取决于 border-color 的值。
outset	定义 3D outset 边框。其效果取决于 border-color 的值。
inherit	规定应该从父元素继承边框样式。
border-width
thin	定义细的边框。
medium	默认。定义中等的边框。
thick	定义粗的边框。
length	允许您自定义边框的宽度。
inherit	规定应该从父元素继承边框宽度。
border-color
透明色：transparent
统一设置
border:宽度 样式 颜色
样式必须设置
宽度、样式、颜色都可以四方向分别设置上右下左、单独设置，值传递和外边距一样。
```

## padding

```css
padding 长度\百分比  不允许负值
padding 上左下右
padding-top/buttom/right/left

```

