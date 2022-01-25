---
title: 抽象工厂模式
date: 2021-01-02 22:31:46.0
updated: 2021-01-02 22:31:46.0
categories: 设计模式
tags: 
comments: true
---

# 抽象工厂模式

# 什么是抽象工厂模式
比较官方的定义是：**为创建一组相关的或相互依赖的对象提供一个接口，而且无需指定他们的实体类**。官方这个定义十分的拗口也不易理解，可能也是因为英文翻译过来的。
我的理解是两个词，细化+组装，比如生产产品，那么在定义这个产品的时候会越来越细化，比如我们考虑女娲造人这个例子，首先，我们创建一个人类的接口，然后下面又实现了人类接口的两个抽象类叫做黑人、白人和黄人，那么我们继续细化，人肯定有男性和女性吧，于是我们在此基础上就扩展出也就是继承三个色种，单独定义继承他们的黑人男性和女性，白人男性和女性、黄人的男性和女性，这些一共6个类全部是通过继承相应的有色人种来实现的。
那我们再看工厂类，同样需要建立一个抽象工厂接口，定义第一层即在接口中分别生产各色人种的方法，但是呢每个人种还有男性和女性之分，因此我们可以继续继承这个接口，扩展出专门生产男性和女性的类，在他们类中分别定义生产各色人种男性或女性的方法。
综上我们看工厂模式就是把产品细化了，然后我们想要什么的样的产品，就在工厂下面分为不同的车间，每个车间又分为不同的生产线，怎么扩展呢，就是通过继承or实现等来实现横向或纵向扩展。
具体实现的UML的类图如下，第二个是具体调用图。
# 最简单的例子
![image.png](https://quinntian.com/upload/2021/01/image-89bd5107a3e84b5d848ae2d3450862c7.png)
![image.png](https://quinntian.com/upload/2021/01/image-3c773df03aff4cb09136ad42922e688b.png)
**人类接口**
```java
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public interface Human {
    /*人种的颜色*/
    public void getColor();
    /*人类会说话*/
    public void talk();
    /*人的性别*/
}

```
**三个人类接口的抽象实现类**
```java
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public abstract class AbstractBlackHuman implements Human {
    @Override
    public void getColor() {
        System.out.println("黑色人种的皮肤是黑色的！");
    }

    @Override
    public void talk() {
        System.out.println("黑色人种也会说话啊！");
    }
}

```
```java
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public abstract class AbstractWhiteHuman implements Human {

    @Override
    public void getColor() {
        System.out.println("白色人种的皮肤是白色的！");
    }

    @Override
    public void talk() {
        System.out.println("白色人也会说话啊！");

    }
}

```
```java
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public abstract class AbstractYellowHuman implements Human {

    @Override
    public void getColor() {
        System.out.println("黄人种的皮肤是黄色的！");
    }

    @Override
    public void talk() {
        System.out.println("黄色人种也会说话啊！");
    }
}

```
**
**各色人种，每个人种的两个分支男性和女性**

- **男性黑色人种和女性黑色人种**
- **男性黄色人种和女性黄色人种**
- **男性白色人种和女性白色人种**
```java
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class FemaleBlackHuman extends AbstractBlackHuman {
    /*黑人女性*/
    public void getSex(){
        System.out.println("黑人女性！");
    }
}

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class MaleBlackHuman extends AbstractBlackHuman {
    /*黑人男性*/
    public void getSex(){
        System.out.println("黑人男性！");
    }
}


```
```java
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class FemaleWhiteHuman extends AbstractWhiteHuman {
    /*白人女性*/
    public void getSex(){
        System.out.println("白人女性！");
    }
}

/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class MaleWhiteHuman extends AbstractWhiteHuman {
    /*白人男性*/
    public void getSex(){
        System.out.println("白人男性！");
    }
}


```
```java
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class FemaleYellowHuman extends AbstractYellowHuman {
    /*黄人女性*/
    public void getSex(){
        System.out.println("黄人女性！");
    }
}
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class MaleYellowHuman extends AbstractYellowHuman {
    /*黄人男性*/
    public void getSex(){
        System.out.println("黄人男性！");
    }
}


```


**


**人类抽象工厂接口**
**
```java
/**
 * <pre>八卦炉之定义</pre>
 *
 * @author QuinnTian
 * @since
 */
public interface HumanFactory {
    /*制造一个黄色人种*/
    public Human createYellowHuman();
    /*制造一个白色人种*/
    public Human createWhiteHuman();
    /*制造一个黑色人种*/
    public Human createBlackHuman();

}

```
**生产男性的工厂**
** **
```java
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class MaleFactory implements HumanFactory {
    @Override
    public Human createYellowHuman() {
        return new MaleYellowHuman();
    }

    @Override
    public Human createWhiteHuman() {
        return new MaleWhiteHuman();
    }

    @Override
    public Human createBlackHuman() {
        return new MaleBlackHuman();
    }
}

```
**生产女性的工厂**
```java
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class FemaleFactory implements HumanFactory {
    @Override
    public Human createYellowHuman() {

        return new FemaleYellowHuman();
    }

    @Override
    public Human createWhiteHuman() {

        return new FemaleWhiteHuman();
    }

    @Override
    public Human createBlackHuman() {

        return new FemaleBlackHuman();
    }
}


```
**场景类**
```java
/**
 * <pre></pre>
 *
 * @author QuinnTian
 * @since
 */
public class NvWa {
    public static void main(String args[]){
        /*第一条生产线，男性生产线*/
        HumanFactory maleHumanFactory = new MaleFactory();
        /*第二条生产线，女性生产线*/
        HumanFactory femaleHumanFactory = new FemaleFactory();
        /*生产线建立完毕，开始生产人*/
        /*生产第一个黄人男性*/
        Human maleYellowHuman = maleHumanFactory.createYellowHuman();
        maleYellowHuman.getColor();
        maleYellowHuman.talk();
        /*生产第二个黄人女性*/
        Human femaleYellowHuman = femaleHumanFactory.createYellowHuman();
        femaleYellowHuman.getColor();
        femaleYellowHuman.talk();
    }
}

```
