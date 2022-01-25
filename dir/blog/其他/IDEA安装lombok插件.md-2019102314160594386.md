---
title: IDEA安装lombok插件.md
date: 2018-06-19 23:34:17.0
updated: 2018-06-19 23:34:17.0
categories: 其他
tags: 
comments: true 
---

title: IDEA安装lombok插件
date: '2018-06-19 23:34:17'
updated: '2018-06-19 23:34:17'
tags: [IDEA]
permalink: /articles/2018/06/19/1529422457178.html
---
项目中经常使用bean，entity等类，绝大部分数据类类中都需要get、set、toString、equals和hashCode方法，虽然eclipse和idea开发环境下都有自动生成的快捷方式，但自动生成这些代码后，如果bean中的属性一旦有修改、删除或增加时，需要重新生成或删除get/set等方法，给代码维护增加负担。而使用了lombok则不一样，使用了lombok的注解(@Setter,@Getter,@ToString,@@RequiredArgsConstructor,@EqualsAndHashCode或@Data)之后，就不需要编写或生成get/set等方法，很大程度上减少了代码量，而且减少了代码维护的负担。故强烈建议项目中使用lombok，去掉bean中get、set、toString、equals和hashCode等方法的代码。
![Snipaste_20180619_233151png](http://p95x8s7hh.bkt.clouddn.com//file/2018/06/09881d2c1cba406fb35e2c29d8f1984f_Snipaste_20180619_233151.png) 
![Snipaste_20180619_233210png](http://p95x8s7hh.bkt.clouddn.com//file/2018/06/f7ce0e950fc7457bab0fb9056d376d92_Snipaste_20180619_233210.png) 
![Snipaste_20180619_233235png](http://p95x8s7hh.bkt.clouddn.com//file/2018/06/c45b05eefebd4dbd85a91185d637df76_Snipaste_20180619_233235.png) 




