---
title: IDEA配置注释模板
date: 2019-07-13 12:55:12.0
updated: 2020-01-25 15:48:27.0
categories: 其他
tags: 
comments: true
---


#### 1. 打开如下配置界面

![enter description here](https://www.github.com/QuinnTian/imgchr/raw/master/imgs/1562991072983.png)

setting->live templates

#### 2. 自己创建一个组

添加如下代码

``` javascript
**
 * <pre>$method$ method</pre>
$params$
 * @return $return$
 * @author <a href="mailto:sdtkin1996@gmail.com">QuinnTian</a> 
 * @since $DATE$ $time$ 
 */!
```

#### 3. 编辑参数列表

![enter description here](https://www.github.com/QuinnTian/imgchr/raw/master/imgs/1562991209203.png)

![enter description here](https://www.github.com/QuinnTian/imgchr/raw/master/imgs/1562991254605.png)

第二个参数脚本代码如下

``` javascript
groovyScript("def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); for(i = 0; i < params.size(); i++) {result+=' * @param ' + params[i] + ((i < params.size() - 1) ? '\\n' : '')}; return result", methodParameters())
```

