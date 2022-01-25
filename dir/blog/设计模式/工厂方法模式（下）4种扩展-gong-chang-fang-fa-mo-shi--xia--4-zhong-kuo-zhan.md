---
title: 工厂方法模式（下）4种扩展
date: 2021-01-01 19:39:36.0
updated: 2021-01-01 19:39:36.0
categories: 设计模式
tags: 
comments: true
---

# 工厂方法模式（下）4种扩展

# 简单工厂模式
所谓简单工厂模式就是把工厂的抽象类去掉，直接只有一个工厂类即可。其UML图如下
![image.png](https://quinntian.com/upload/2021/01/image-e5e37bbc9fa8434e8ad095d01b326681.png)
工厂类，去掉了接口
```java
package case3;



/**
 * <pre>简单工厂模式：去掉了抽象接口</pre>
 *
 * @author QuinnTian
 * @since
 */
public class HumanFactory {
    public static <T extends Human> T createHuman(Class<T> c){
        /*定义一个生产出的人种*/
        Human human = null;
        try {
            human = (Human) Class.forName(c.getName()).newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return (T)human;
    }
}

```
# 多个工厂类
与名字相同，一种产品对应一种工厂类，其类图如下
![image.png](https://quinntian.com/upload/2021/01/image-71fe7a6833674563a3e6e146c838fb8e.png)
其中，人类接口和实现类不变，一个色种对应一个工厂。
```java
package case4;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class BlackHumanFactory implements AbstractFactory {
    @Override
    public Human createHuman() {
        return new BlackHuman();
    }
}

```
```java
package case4;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class WhiteHumanFactory implements AbstractFactory {
    @Override
    public Human createHuman() {
        return new WhiteHuman();
    }
}

```
```java
package case4;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class YellowHumanFactory implements AbstractFactory {
    @Override
    public Human createHuman() {
        return new YellowHuman();
    }
}

```
```java
package case4;



/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class NvWa {
    public static void main(String args[]){
        /*模拟女娲造人*/
        System.out.println("第一次造出的人是黑人");
        Human blackHuman = new BlackHumanFactory().createHuman();
        blackHuman.getColor();;
        blackHuman.talk();

        System.out.println("第二次造出的人是白人");
        Human whiteHuma = new WhiteHumanFactory().createHuman();
        whiteHuma.getColor();
        whiteHuma.talk();

        System.out.println("第三次造出的人是黄人");
        Human yellowHuman = new YellowHumanFactory().createHuman();
        yellowHuman.getColor();
        yellowHuman.talk();
    }

}

```
# 替代单例类
用一个工厂来生产单例类，其中要用到Java的**反射特性**。
![image.png](https://quinntian.com/upload/2021/01/image-25aaefac30e84441a9b40d6b87bd0e9f.png)
```java
package case5;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class Singleton {
    /*private不允许通过new产生一个对象*/
    private Singleton(){}
    public void doSomeing(){}
}

```
```java
package case5;

import java.lang.reflect.Constructor;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class SingletonFactory {
    private static Singleton singleton;

    static{
        try{
            Class c1 = Class.forName(Singleton.class.getName());
            /*获得无参构造*/
            Constructor constructor = c1.getDeclaredConstructor();
            /*设置无参构造可访问*/
            constructor.setAccessible(true);
            /*产生一个实例对象*/
            singleton = (Singleton) constructor.newInstance();
        }catch (Exception e){

        }

    }
    public static Singleton getSingleton(){
        return  singleton;
    }
}

```
# 延迟初始化
所谓延迟初始化就是，将对象存起来，用到时候再调用，不是用完就销毁。
![image.png](https://quinntian.com/upload/2021/01/image-f54e06d46a7e4dea9bcff9255cb5655d.png)
```java
package case6;

import java.util.HashMap;
import java.util.Map;

/**
 * <pre>延迟初始化</pre>
 *
 * @author QuinnTian
 * @since
 */
public class ProductFactory {
    private  static final Map<String,Product> prMap = new HashMap<>();
    public static synchronized  Product createProduct(String type) throws Exception{
        Product product = null;
        /*如果map已经有*/
        if (prMap.containsKey(type)){
            product = prMap.get(type);
        }else {
            if (type.equals("Product1")){
                product = new ConcreteProduct1();
            }else {
                product = new ConcreteProduct2();
            }
            prMap.put(type,product);
        }
        return product;
    }
}

```
```java
package case6;

/**
 * <pre>抽象产品类</pre>
 *
 * @author QuinnTian
 * @since
 */
public abstract class Product {

    /*产品类的公用方法*/
    public void method (){
        /*业务逻辑处理*/
    }
    /*抽象方法*/
    public abstract void method2();
}

```
```java
package case6;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class ConcreteProduct1 extends Product {
    @Override
    public void method2() {
        /*业务逻辑处理*/
    }
}

```
```java
package case6;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class ConcreteProduct2 extends Product {
    @Override
    public void method2() {
        /*业务逻辑处理*/
    }
}

```
