---
title: Next主题自定义配置背景图和透明度
date: 2022-01-08 20:50:58
update:
categories: 
    - [Hexo,Next]
tags:
    - Hexo
    - Next
    - 透明
    - 背景图

---
Hexo主题纯色有些单调，可以通过自定义配置修改背景并实现透明化

<!-- more -->
# 1. 适用版本
Next 8.9.0 & Hexo 6.0.0
# 2. 设置自定义背景
创建样式文件
1. 在这个目录下Hexo目录\source\_data\创建styles.styl
2. 添加如下代码
   ```css
    body {
        background: url(背景图地址);
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        backgound-position: 50% 50%;

    }
   ```


# 3. 配置透明度
设置如下代码
```css
        //文章页面等透明化处理
        .main-inner { 
        
            background: rgba(255,255,255,0.7) none repeat scroll !important;
        

        }
        

        //菜单栏的透明度设置
        .header-inner {
        background: rgba(255,255,255,0.9) none repeat scroll !important;
        }

        
        //页脚配置 以下颜色取决于你的背景
        .footer{
            color: #fff;    
        }
         //如果没开启页脚显示Hexo版本信息和Next版本信息可以省略
        .powered-by>a{
        color: #fff;
        }
```
