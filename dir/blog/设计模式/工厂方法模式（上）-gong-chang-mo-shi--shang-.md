---
title: 工厂方法模式（上）
date: 2020-12-30 23:06:41.0
updated: 2021-01-01 19:41:09.0
categories: 设计模式
tags: 
comments: true
---



# 什么是工厂方法模式
定义一个抽象接口，这个接口其实现类来选择实例化哪一个类。简单来说就是实例化不再通过new而是通过一个类，这个类是工厂类。
# 工厂方法模式最简单例子
我们想象女娲造人，这里涉及三样，女娲、炼造炉、人类，其中人类是一个抽象类，其有很多实现类，有黄色、白色和黑色人种。锻造炉就是一个工厂，在这个工厂可以指定去造哪一种类型的人。这里我们吧锻造炉用一个接口声明，其实现类里有相应的方法来选择去锻造哪一种类型的人类。女娲就是一个场景类。具体UML图和代码如下
![image.png](https://quinntian.com/upload/2020/12/image-bd3f6bd8ba184fa9a49b4c5393e7626e.png)
package case1;
```java
/**
 * <pre>人类总称</pre>
 *
 * @author QuinnTian
 * @since
 */
public interface Human {
    /*获取人类的颜色*/
    public void getColor();
    /*人类说话*/
    public void talk();
}

```
```java
package case1;

/**
 * <pre>黑色人种</pre>
 *
 * @author QuinnTian
 * @since
 */
public class BlackHuman implements Human {
    @Override
    public void getColor() {
        System.out.println("黑色人种的皮肤是黑色的。");
    }

    @Override
    public void talk() {
        System.out.println("黑人正在说话..");

    }
}

```
```java
package case1;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class WhiteHuman implements Human {
    @Override
    public void getColor() {
        System.out.println("白色人种的皮肤是白色的。");

    }

    @Override
    public void talk() {
        System.out.println("白色人种在说话。");

    }
}

```
```java
package case1;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class YellowHuman implements Human {
    @Override
    public void getColor() {
        System.out.println("黄色人种的皮肤是黄色的。");

    }

    @Override
    public void talk() {
        System.out.println("黄色人种正在说话。");

    }
}

```
```java
package case1;

/**
 * <pre>创建人类的抽象工厂</pre>
 *
 * @author QuinnTian
 * @since
 */
public abstract class AbstractHumanFactory {
    public abstract <T extends Human> T createHuman(Class<T> c);
}

```
```java
package case1;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class HumanFactory extends AbstractHumanFactory {

    @Override
    public <T extends Human> T createHuman(Class<T> c) {
        /*定义一个生产的人种*/
        Human human = null;
        try {
            /*产生一个人种*/
            human = (T)Class.forName(c.getName()).newInstance();
        }catch (Exception e){
            System.out.println("人类产生错误！");
        }
        return (T)human;
    }
}

```
```java
package case1;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class NvWa {
    public static void main(String args[]){
        /*模拟女娲造人*/
        AbstractHumanFactory abstractHumanFactory = new HumanFactory();
        System.out.println("第一次造出的人是黑人");
        Human blackHuman = abstractHumanFactory.createHuman(BlackHuman.class);
        blackHuman.getColor();;
        blackHuman.talk();

        System.out.println("第二次造出的人是白人");
        Human whiteHuma = abstractHumanFactory.createHuman(WhiteHuman.class);
        whiteHuma.getColor();
        whiteHuma.talk();

        System.out.println("第三次造出的人是黄人");
        Human yellowHuman = abstractHumanFactory.createHuman(YellowHuman.class);
        yellowHuman.getColor();
        yellowHuman.talk();
    }

}

```
# 工厂方法模式通用模板
上面的女娲造人的过程，可以用一个通用的代码模板来表示，UML图。
![image.png](https://quinntian.com/upload/2020/12/image-6bb9c8e788744891ad4060ea3b11bc63.png)
```java
package case2;

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
package case2;

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
package case2;

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
```java
package case2;

/**
 * <pre>抽象工厂类</pre>
 *
 * @author QuinnTian
 * @since
 */
public abstract class Creator {
    /**/
    public abstract <T extends Product> T createPoduct(Class<T> c);
}

```
```java
package case2;

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class ConcreteCreator extends Creator {
    @Override
    public <T extends Product> T createPoduct(Class<T> c) {
        Product product = null;
        try {
            product = (Product) Class.forName((c.getName())).newInstance();
        }catch (Exception e){

        }
        return (T)product;
    }
}

```
```java
package case2;

/**
 * <pre>场景类</pre>
 *
 * @author QuinnTian
 * @since
 */
public class Client {
    public static void main(String args[]){
        Creator creator = new ConcreteCreator();
        Product product = creator.createPoduct(ConcreteProduct1.class);
        /*......*/
    }
}

```
