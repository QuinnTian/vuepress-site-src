---
title: Linux 文件系统基础
date: 2022-01-08 21:53:46
update:
article: false
permalink: /docs/linux/1643441184.html
---

# Linux 基础命令

基础的 Linux 命令，主要包含如下部分

- 查看 bash 版本的命令
- 理解挂载点和虚拟目录
- 进入和显示当前目录的命令，同时理解相对路径和绝对路径
- 查看目录下文件的命令
- 文件创建命令
- 文件复制命令
- 创建链接文件命令，理解软链接和硬链接
- 移动文件或目录的命令
- 删除文件的命令
- 创建和删除目录的命令
- 查看文件的命令，包含查看文件类型，查看文件内容，查看部分文件内容，其中查看文件内容包括三种方式，查看部分文件内容有查看开头和查看末尾两种

## 查看 bash 版本命令

- 查看当前发行版可以使用的bash

```bash

[root@localhost ~]$ cat /etc/shells
/bin/sh
/bin/bash
/sbin/nologin

```

- 查看当前使用的bash

```
echo $SHELL
```

- 环境变量中查看

```

env | grep SHELL
SHELL=/bin/bash

```

- 文件中查看

```
cat /etc/passwd | grep root
```

- 查看当前进程

```
ps
```

- 先查看bash进程号再查询

```
echo $$
1862
[root@localhost ~]$ ps -ef | grep 1862
root 1862 1860 0 01:50 pts/0 00:00:00 -bash
root 2029 1862 0 02:07 pts/0 00:00:00 ps -ef
root 2030 1862 0 02:07 pts/0 00:00:00 grep 1862
```

- 一条命令

```
ps -ef | grep `echo $$` | grep -v grep | grep -v ps
```

- 使用 man 手册查看帮助

```
man - [需要查询的命令]
```

## 挂载点和虚拟目录

- 第一块硬盘**根驱动器**，**虚拟目录**放在此处；
- **虚拟目录**与实际存储位置并不一致
- 其他硬盘挂载于相应位置，该位置称**挂载点**

![image-20220129140747654](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220129140747654.png)

- 常见目录及用途

![image-20220129140527365](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220129140527365.png)



## 进入及显示路径命令

- `cd [绝对路径或相对路径]`

- `pwd`显示当前绝对路径

---

绝对路径和相对路径

绝对路径

- 绝对路径总是以 / 起

相对路径

- 用法1：基于当前目录

  例子：从根目录进入root目录

  ```
  [root@localhost ~]# cd ..
  [root@localhost /]# cd root/
  ```

  

- 相对路径常用符号

  - .  表示当前目录

  - .. 表示切换到当前目录的父目录

    例子：切换父目录的 son1 目录

    ```
    [root@localhost son2]# pwd
    /root/father/son2
    [root@localhost son2]# cd ../son1
    [root@localhost son1]#
    ```

  

## 查看目录命令

ls 命令：查看目录下文件

- `ls -[option1] -[option2] -[and more] [指定目录（可省略）]` 列出当前目录所有文件
  - 例子 `ls -F -a`
  - 多选项简单写法：`ls -[option1][option2][and more]`
    - 例子 `ls -FaR`

参数列表

- `-F` 区分文件和目录

- `-a` 显示隐藏文件，隐藏文件是指 . 开头文件

- `-R` 递归显示

- `-l` 显示长格式详细列表

  例子

  ```
  ls -l
  -rw-r--r--. 1 root root 0 1月  29 22:42 file1.txt
  drwxr-xr-x. 2 root root 6 1月  29 22:30 son1
  drwxr-xr-x. 2 root root 6 1月  29 22:30 son2
  
  ```

  长格式显示内容含义

  ![image-20220129145321634](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220129145321634.png)

- `-d` 只查看目录信息，不列出里面的文件

  - 例子

    ```
    [root@localhost father]# ls -Fd son2
    son2/
    ```

- `-i` 查看目录或文件的唯一编号

  - 例子

    ```bash
    [root@localhost father]# ls -i
    50912591 fat  50912593 fct        50912594 file2       50912590 food         50912596 son   17477216 son2
    50912592 fbt  50912589 file1.txt  50912595 file2_copy  50912599 s_file1.txt   2751639 son1
    
    ```

    

特殊用法

- 过滤器用法

  - 例子1：只显示单个文件

    ```bash
    ls -l file1.txt 
    -rw-r--r--. 1 root root 0 1月  29 22:42 file1.txt
    ```

  - 例子2：使用通配符

    - `*`表示0或多个

        ```bash
        ls fi*
        file1.txt
        可以匹配fi file filemore
        ```

    - `?`表示1个

      ```bash
      ls f??e1.txt
      file1.txt
      可以匹配 file1.txt fffe1.txt 
      ```

    
    - `[]` 指定匹配的内容
    
      - `[start-end]` 指定单个位置匹配范围
    
        ```bash
        当前存在文件
        ls
        fat  fbt  fct  file1.txt  food  son1  son2
        
        指定第二个字符必须是 a-c 任意一个
        ls f[a-c]*
        fat  fbt  fct
        ```
    
        
    
      - `[!char1]` 排除char1字符
    
        ```bash
        指定第二个字符不能出现 b
        ls f[!b]*
        fat  fct  file1.txt  food
        ```



---

## 文件创建命令

touch 命令：文件创建

- 用于创建新文件 `touch [文件名]`

- 用于修改文件创建时间 `touch [已存在文件名]`

  ![image-20220129220139600](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220129220139600.png)

- 用于修改访问时间`touch -[a] [文件名]`

  ```bash
  touch -a file2
  ls -l --time=atime
  
  ```

  - 默认查看的是创建时间，查看文件访问时间需要加`--time`

---

## 文件复制命令

cp 命令：文件复制

- 基本格式：`cp -[选项] [当前文件] [目标文件]`

  - 例子1

    ```bash
    cp file2 file2_copy
    ls -l file*
    -rw-r--r--. 1 root root 0 1月  29 22:42 file1.txt
    -rw-r--r--. 1 root root 0 1月  30 06:00 file2
    -rw-r--r--. 1 root root 0 1月  30 06:11 file2_copy
    ```
  - 例子2：使用绝对路径复制

    ```bash
    cp /root/father/son1/file1 /root/father/son2/
    // 复制文件到另外一个目录，第二个目录最后的../son2/的 / 不能省略
    // 因为如果目标目录不存在会自动创建
    // 目录与文件名不能重名，因为目录也是文件
    ```
    
  - 例子3：使用相对路径，复制到将文件复制到当前目录
  
    ```bash
    cp /root/father/son1/file1 .
    ```
    
  
- `-i` 当存在同名文件提示是否覆盖

  - 例子1

    ```bash
    [root@localhost father]# cp -i file2 file2_copy
    cp：是否覆盖"file2_copy"？ 
    ```

- `-R` 递归复制整个目录，若目录不存在会自动创建

  - 例子1：复制当前目录到 /root/father2

    ```
    cp -R . /root/father2
    cd /root/
    ls 
    anaconda-ks.cfg  father  father2  initial-setup-ks.cfg  公共  模板  视频  图片  文档  下载  音乐  桌面
    
    ```

---

## 创建链接文件命令

链接文件：指向真实文件占位符

分类

- 符号链接：与原始文件不同；是指向原始文件

  - 创建

    例子：创建 file1.txt 符号链接

    ```bash
    [root@localhost father]# ls
    fat  fbt  fct  file1.txt  file2  file2_copy  food  son  son1  son2
    [root@localhost father]# ln -s file1.txt s_file1.txt
    [root@localhost father]# ls -l
    总用量 0
    -rw-r--r--. 1 root root  0 1月  29 23:09 fat
    -rw-r--r--. 1 root root  0 1月  29 23:10 fbt
    -rw-r--r--. 1 root root  0 1月  29 23:10 fct
    -rw-r--r--. 1 root root  0 1月  29 22:42 file1.txt
    -rw-r--r--. 1 root root  0 1月  30 06:00 file2
    -rw-r--r--. 1 root root  0 1月  30 06:11 file2_copy
    -rw-r--r--. 1 root root  0 1月  29 23:09 food
    lrwxrwxrwx. 1 root root  9 1月  30 06:51 s_file1.txt -> file1.txt
    -rw-r--r--. 1 root root  0 1月  30 06:26 son
    drwxr-xr-x. 2 root root 19 1月  30 06:19 son1
    drwxr-xr-x. 2 root root 19 1月  30 06:20 son2
    // 通过查看编号证明不是一个文件
    [root@localhost father]# ls -i
    50912591 fat  50912593 fct        50912594 file2       50912590 food         50912596 son   17477216 son2
    50912592 fbt  50912589 file1.txt  50912595 file2_copy  50912599 s_file1.txt   2751639 son1
    
    ```

    

- 硬链接：同一个文件

  - 创建 `ln [原始文件] [硬文件]`

    例子

    ```
    ln file1.txt h_file1.txt
    // 查看编号证明是同一个文件
    [root@localhost father]# ls -i
    50912591 fat  50912593 fct        50912594 file2       50912590 food         50912599 s_file1.txt   2751639 son1
    50912592 fbt  50912589 file1.txt  50912595 file2_copy  50912589 h_file1.txt  50912596 son          17477216 son2
    [root@localhost father]# 
    ```

---

## 文件重命名命令

## 文件和目录移动命令

mv 命令

- 用法1：重命名 `mv [文件名] [新文件名]`    

- 用法2：移动文件或目录到指定目录 `mv -[选项] [文件名或目录] [指定目录]`

  - `-i` 有重名文件是否提示

    - 例子1：移动 fct 到 /

      ```
      mv fct /
      ls /
      bin  boot  dev  etc  fct  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
      [root@localhost father]# 
      
      ```

    - 例子2 移动文件到指定目录并重命名

      ```
      [root@localhost father]# mv fat /ts
      [root@localhost father]# ls 
      fbt  file1.txt  file2  file2_copy  food  h_file1.txt  s_file1.txt  son  son1  son2
      [root@localhost father]# ls /
      bin  boot  dev  etc  fct  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  ts  usr  var
      [root@localhost father]# 
      
      ```

      - 移动文件不改变文件编号和时间戳

    - 例子3 移动目录下文件到指定目录，源目录删除

      ```
      # mv father /mv_father
      // 注意：移动后 father 目录已经不存在，里面文件全部移动到 /mv_father 里
      ```

## 删除文件命令

rm 命令

- 基本格式 `rm -[option] [文件]`
  - `-i` 提示是否删除
  - `-f` 强制删除且无任何提示

## 创建和删除目录命令

mkdir 命令

- 基本格式 `mkdir [option] [目录名1] [目录名2]`

- 用法1 创建单个目录和连续创建多个目录

  ```
  mkdir d1
  ---
  [root@localhost ~]# mkdir first second
  [root@localhost ~]# ls
  anaconda-ks.cfg  father2  first  initial-setup-ks.cfg  one  second  公共  模板  视频  图片  文档  下载  音乐  桌面
  [root@localhost ~]# 
  
  ```

- 用法2 连续创建多个子目录和连续创建多个目录

  - `-p`

    ```
    [root@localhost ~]# mkdir -p one/two/three
    [root@localhost ~]# ls -R one
    one:
    two
    
    one/two:
    three
    
    one/two/three:
    ```

---

rmdir 命令

- 基本格式 `rmdir [目录名]`
  - 注意：该命令只能删除空目录

rm 命令

- 用法1：递归删除非空目录并带有提示

  - `rm -ri` 

    ```
    [root@localhost ~]# rm -ri /root/one
    rm：是否进入目录"/root/one"? y
    rm：是否进入目录"/root/one/two"? y
    rm：是否删除目录 "/root/one/two/three"？y
    rm：是否删除目录 "/root/one/two"？y
    rm：是否删除目录 "/root/one"？y
    
    ```

- 用法2：递归强制删除且无任何提示

  - `rm -rf`

    ```
    [root@localhost ~]# rm -rf /root/one
    ```

## 查看文件内容命令

主要包含

- 查看文件类型
- 查看文件内容
- 查看部分文件

---

查看文件类型

`file [文件名]`

---

查看文件内容

查看整个文件

cat 命令

- 基本格式 `cat -[option] [fileName]`
  - 用法1 查看文件并带行号
    - `-n`
  - 用法2 查看文件并只显示有文本的行号
    - `-b`
  - 用法3 不显示制表符，制表符用 ^ 替换
    - `-T`



more 命令

- 功能：简单文件内容查看

  - 允许分页查询；并且显示进度
  - 使用空格或回车控制
  - 按 q 退出

  例子

  ```
  more initial-setup-ks.cfg 
  ```

  ![image-20220202000946900](https://cdn.jsdelivr.net/gh/QuinnTian/imgchr/imgs/image-20220202000946900.png)

less 命令

- 功能：功能丰富的查询内容
  - 可以使用方向键控制
  - 使用 man less 查看更多选项
  - 待补充

---

查看部分文件

- 显示文件开头
- 显示文件末尾

显示文件末尾

tail -[选项] [文件名]

- 默认显示最后12行

- `-n` 显示指定最后几行

  例子

  ```
  tail -n 2 initial-setup-ks.cfg 
  pwpolicy luks --minlen=6 --minquality=1 --notstrict --nochanges --notempty
  %end
  
  ```

- `-f` 实时监测文件状态，如删除或添加

显示文件开头

head

- 默认显示开头10行

- `-n`同上

- `-f`同上

  





未完待续...

参考文档

- [Linux下查看使用的是哪种shell的方法汇总_LINUX_操作系统_脚本之家 (jb51.net)](https://www.jb51.net/LINUXjishu/247797.html)
- Linux命令行与shell脚本编程大全.第3版