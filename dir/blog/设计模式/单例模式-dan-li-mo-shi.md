---
title: 单例模式
date: 2020-12-29 21:37:48.0
updated: 2021-01-01 19:41:31.0
categories: 设计模式
tags: 
comments: true
---

# 单例模式

# 单例模式的什么
singleton pattern是指确保某一个类只有一个实例，并且自动实例化向整个系统提供。
# 单例模式最简单例子
大臣参见皇帝，每天面见的皇帝都是同一个，用UML图可以表示成如图。
![image.png](https://quinntian.com/upload/2020/12/image-f6c7b2f5e96043ed9250de64b2a87c4a.png)
```java
package case1;

/**
 * <pre>皇帝类</pre>
 *
 * @author QuinnTian
 * @since
 */
public class Emperor {
    /*初始化一个皇帝，静态和最终关键字是关键*/
    private static final Emperor emperor = new Emperor();
    /*皇帝类的构造方法*/
    private Emperor(){}
    /*静态方法用于获取皇帝的对象*/
    public static Emperor getInstance(){
        return  emperor;
    }
    /*皇帝说话*/
    public static void say(){
        System.out.println("我就是皇帝某某.....");
    }
}

package case1;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class Minister {
    public static void main(String[] args){
        for(int day = 0;day<3;day++){
            Emperor emperor = Emperor.getInstance();
            emperor.say();
        }
        /*运行输出三天见得皇帝是同一个人*/
    }
}

```
```java
运行结果
我就是皇帝某某.....
我就是皇帝某某.....
我就是皇帝某某.....
```
# 单例模式的通用模板
上面例子可以抽象成一个通用模板，类图如下。
![image.png](https://quinntian.com/upload/2020/12/image-2341a94c960c435584af398f98ed2a35.png)

```java
package case2;

/**
 * <pre>单例模式通用代码</pre>
 *
 * @author QuinnTian
 * @since
 */
public class Singleton {
    /*限制产生多个对象*/
    private static final Singleton singleton = new Singleton();
    private Singleton(){}
    /*获取对象实例*/
    public static Singleton getSingleton(){
        return singleton;
    }
    /*该类的其他方法*/
    public static void doSomeing(){}
}

写法2：不推荐
package case2;

/**
 * <pre>通用单例类-线程不安全</pre>
 *
 * @author QuinnTian
 * @since
 */
public class SingletonUnSafe {
    public static  SingletonUnSafe singletonUnSafe = null;
    public SingletonUnSafe(){}
    public static SingletonUnSafe singletonUnSafe(){
        if( singletonUnSafe == null){
            singletonUnSafe  = new SingletonUnSafe();
        }
        return singletonUnSafe;
    }
}

```
上面写法关键点

- 确保类的实例只能有一个，因此要添加**static和final**
- 构造方法必须使用**private**以此来保证，类不会在外部类中意外实例化
- 定义静态方法，专门提供实例化的方法，在外部类中调用
- 第二种写法，在高并发的情况会发生线程不安全，因为初始化实例需要时间，意思是假设线程A初始化实例，这时候线程B也来到了IF条件，但此时线程A并没有完成实例初始化，则判断条件为真，导致进程中出现了第二个实例，因此说明该线程不安全。
# 单例模式扩展-指定单例个数
第一个简单的例子只是在内存中存在一个单例，如果我们要求在内存中指定指定数量的实例，如何做？这就是单例模式扩展情况，下面是类图。
![image.png](https://quinntian.com/upload/2020/12/image-20a7da25631347ac86218f70f4920477.png)
```java
package case3;

import java.util.ArrayList;
import java.util.Random;

/**
 * <pre>单例模式扩展：生成多个单例</pre>
 *
 * @author QuinnTian
 * @since
 */
public class Emperor {
    /*定义能够产生最多的单例的数目*/
    private  static int maxNumOfEmperor = 2;
    /*定义每个皇帝的名字*/
    private static ArrayList<String> nameList = new ArrayList<>();//高并发下使用vector
    /*定义一个列表容纳所有皇帝的实例*/
    private static ArrayList<Emperor> emperorArrayList = new ArrayList<>();
    /*当前皇帝的序列号*/
    private static int countNumOfEmperor = 0;
    /*默认构造方法*/
    private Emperor(){}
    /*构造方法*/
    private Emperor(String name){
        nameList.add(name);
    }

    /*产生所有对象*/
    static{
        for (int i = 0 ; i< maxNumOfEmperor;i++){
            emperorArrayList.add(new Emperor("皇帝，序号："+i));
        }
    }
    /*随机获得一个皇帝*/
    public static Emperor getInstance(){
        Random random = new Random();
        countNumOfEmperor = random.nextInt(maxNumOfEmperor);
        return  emperorArrayList.get(countNumOfEmperor);
    }
    /*皇帝说话*/
    public static void say (){
        System.out.println(nameList.get(countNumOfEmperor));
    }
}
package case3;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class Minister {
    public static void main(String arg[]){
        /*定义五个大臣*/
        int ministerNum = 5 ;
        for (int  i =0;i<ministerNum;i++){
            Emperor emperor = Emperor.getInstance();
            System.out.println("第"+i+1+"个大臣参拜的是：");
            emperor.say();
        }
    }
}

```
# 单例模式的应用

- 要求唯一生成序列号
- Web页面的计数器，不要每次刷新都写入数据库，可以开一个单例
- 工具类
- Spring中的容器Bean的默认模式就是单例模式

代码参考：[https://github.com/QuinnTian/design-pattern](https://github.com/QuinnTian/design-pattern)
