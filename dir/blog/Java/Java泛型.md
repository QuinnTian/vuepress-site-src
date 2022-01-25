---
title: Java泛型
date: 2022-01-14 21:12:27
update:
categories:
    - Java
tags:
    - Java
    - 泛型
    
---

# Java泛型

- 自己写一个ArrayList类，对比不使用泛型和使用泛型的区别，观察Java内部库中ArrayList类是如何使用泛型的；
- 在使用泛型的时候同时可以进行向上转型，但要避免一些问题；
- 定义一个泛型包括在类中定义泛型，静态方法中使用泛型，定义一个多类型的泛型，在接口中定义泛型；使用泛型和不使用泛型的区别

<!-- more -->

## 1.  ArrayList 泛型

- 不使用泛型会可能会导致强制类型转换错误
- 使用泛型可以避免强制类型转换方法
- 其实Java内部库中ArrayList类已经使用了泛型

---

- 定义一个ArrayList泛型

  ```java
  public class ArrayList {
      private Object[] array;
      private int size;
      public void add(Object e) {...}
      public void remove(int index) {...}
      public Object get(int index) {...}
  }
  ```

  

- 表现在使用的时候

  ```java
  // 如果不使用泛型，下面是声明的方式
  ArrayList list = new ArrayList();
  // 存入的是字符串，但是没有指定就是Object类型
  list.add("Hello");
  // 获取到Object，必须强制转型为String:
  String first = (String) list.get(0);
  // 传入的是Integer类型
  list.add(new Integer(123));
  // ERROR: ClassCastException:
  String second = (String) list.get(1);
  ```

  

- 如果不使用泛型，那么就需要建立 StringArrayList\IntegerArrayList 等等类

---

  

- 解决方法使用泛型
  
  ```java
  //这是定义泛型的基本格式
  public class ArrayList<T> {
  private T[] array;
  private int size;
  public void add(T e) {...}
  public void remove(int index) {...}
  public T get(int index) {...}
  }
  ```
  
    
  
  ```java
  // 如果使用泛型，下面是声明的方式
  ArrayList<String> list = new ArrayList();
  // 存入的是字符串，
  list.add("Hello");
  // 直接获取即可:
  String first = list.get(0);
  ```
---
- Java内部库中的ArrayList已经实现了泛型
  
  ```java
  public class ArrayList<E> extends AbstractList<E>
          implements List<E>, RandomAccess, Cloneable, java.io.Serializable
  {
      @java.io.Serial
      private static final long serialVersionUID = 8683452581122892189L;
  
      /**
       * Default initial capacity.
       */
      private static final int DEFAULT_CAPACITY = 10;
  
      /**
       * Shared empty array instance used for empty instances.
       */
      private static final Object[] EMPTY_ELEMENTDATA = {};
  
  
  ```

## 2. 向上转型

- 向上转型
- ArrayList<Integer> 转型为 ArrayList<Number>存在问题

---

- 在Java标准库中的`ArrayList<T>`实现了`List<T>`接口，它可以向上转型为`List<T>`：

  ```java
  public class ArrayList<T> implements List<T> {
      ...
  }
  
  List<String> list = new ArrayList<String>();
  ```

---

- 编译器不允许ArrayList<Integer> `转型为 `ArrayList<Number> 这种转型，因为要避免如下错误

  ```java
  // 创建ArrayList<Integer>类型：
  ArrayList<Integer> integerList = new ArrayList<Integer>();
  // 添加一个Integer：
  integerList.add(new Integer(123));
  // “向上转型”为ArrayList<Number>：
  // 此时已经报错，原因这里赋值的意思：第一，这两个是同一个对象，类似于指针；第二，强制转换
  // 即 numberList 和 integerList 同时指向一个对象
  ArrayList<Number> numberList = integerList;
  // 用 numberList 添加一个Float，因为Float也是Number；
  numberList.add(new Float(12.34));
  // 用 integerList 获取索引为1的元素：此时很明显回到类型转换错误，integer 类型不可能接受float类型
  Integer n = integerList.get(1); // ClassCastException!
  ```

  - 根据继承关系理解，Float 类型和 Integer 类型都是 Number类的子类，尽管 Integer 向上转换成 Number 类型后接受了一个 Float 类型，但在获取的时候 Integer 类型是不能接受 Float 类型的

---

## 3. 定义和使用泛型

- 类定义泛型的基本步骤
- 静态方法中如何使用泛型

---

### 3.1  类与泛型

- 类定义泛型的基本步骤
  - 先写一个普通的类
  - 将所有的强类型地方换成T
  - 类声明泛型

---

```java
public class Pair {
    private String first;
    private String last;
    public Pair(String first, String last) {
        this.first = first;
        this.last = last;
    }
    public String getFirst() {
        return first;
    }
    public String getLast() {
        return last;
    }
}
public class Pair {
    private String first;
    private String last;
    public Pair(String first, String last) {
        this.first = first;
        this.last = last;
    }
    public String getFirst() {
        return first;
    }
    public String getLast() {
        return last;
    }
}
public class Pair<T> {//声明T
    //以下所有强类型都换成T
    private T first;
    private T last;
    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() {
        return first;
    }
    public T getLast() {
        return last;
    }
}
```

---

### 3.2  静态方法与泛型

- 静态方法中的使用泛型注意点
  - 不要和带有泛型的类混淆

```java
public class Pair<T> {
    private T first;
    private T last;
    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public T getLast() { ... }

    // 静态泛型方法应该使用其他类型区分:
    // 1. 泛型的声明要写在方法声明上 2. 为了区分换一个字母
    public static <K> Pair<K> create(K first, K last) {
        
        return new Pair<K>(first, last);
    }
    // 错误写法
    // 对静态方法使用<T>:
    // 错误原因：1. 这就不是一个使用了泛型的方法 2. 下面的T是指，方法的返回类型是“使用了泛型的类”作为返回类型
    public static Pair<T> create(T first, T last) {
        return new Pair<T>(first, last);
    }
    // 不规范写法
    // 可以编译通过:
    public static <T> Pair<T> create(T first, T last) {
        return new Pair<T>(first, last);
    }
}
```

---

### 3.3 多类型泛型



```java
// 定义
public class Pair<T, K> {
    private T first;
    private K last;
    public Pair(T first, K last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public K getLast() { ... }
}
// 使用
Pair<String, Integer> p = new Pair<>("test", 123);

```



### 3.2 泛型与接口

- 对字符串String进行排序，能直接使用 sort方法因为 String类已经实现对应的泛型接口
- 自定义类进行排序必须实现对应的泛型接口
- 可以在接口中定义泛型

---

字符串排序

```java
String[] ss = new String[] { "Orange", "Apple", "Pear" };
        Arrays.sort(ss);
        System.out.println(Arrays.toString(ss));
// 可以直接对字符串进行排序的原因，String 类中已经实现了相应的接口
// 查看源码
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence,
               Constable, ConstantDesc {
.......
               }
```

---

自定义类进行排序

```java
// 对自定义的类进行排序
 Person[] ps = new Person[] {
            new Person("Bob", 61),
            new Person("Alice", 88),
            new Person("Lily", 75),
        };
        Arrays.sort(ps);
        System.out.println(Arrays.toString(ps));
// 自定义的类必须实现 Comparable<Person> 接口
class Person implements Comparable<Person> {
    String name;
    int score;
    Person(String name, int score) {
        this.name = name;
        this.score = score;
    }
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);
    }
    public String toString() {
        return this.name + "," + this.score;
    }
}

```

---

在接口中定义泛型，Comparable为例

```java
public interface Comparable<T> {
    public int compareTo(T o);
}

```
### 3.5 使用泛型的区别

- 基本泛型的使用
  - 不指定泛型，默认就是Object
  - 若指定泛型，那么就是自动识别为强类型

---

基本使用

- 使用时，不指定泛型类型，那么就是 Object

  ```java
  // 编译器警告:
  List list = new ArrayList();
  list.add("Hello");
  list.add("World");
  String first = (String) list.get(0);
  String second = (String) list.get(1);
  ```

- 指定泛型，那么就会自动识别为强类型

  ```java
  // 无编译器警告:
  List<String> list = new ArrayList<String>();
  list.add("Hello");
  list.add("World");
  // 无强制转型:
  String first = list.get(0);
  String second = list.get(1);
  ```

---

未完待续

[参考文档](https://www.liaoxuefeng.com/wiki/1252599548343744/1265104600263968)







