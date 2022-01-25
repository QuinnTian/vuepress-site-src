---
title: Windows10输入法小技巧快速输入当前日期和时间
date: 2022-01-13 23:00:02
update:
categories:
    - 其他
tags:
    - 输入法
    - Windows10
    - 小技巧
    - 日期
    - 时间

---

书写Markdown文件经常需要输入日期，可以设置输入法快速输入
<!-- more -->
1. 设置->时间和语言->语言->首选语言:中文->选项->键盘:微软拼音->选项->词库和自学习->用户定义的短语->添加或编辑自定义短语->添加

2. 在拼音里设置你要输入的字母，选择候选窗口位置，在短语中设置以下内容
%yyyy%-%MM%-%dd% %HH%:%mm%:%ss%,出来的就是当前时间，这个格式不能二次编辑，否则就会固定成你当时自定义的时间

更多格式参考
https://docs.microsoft.com/zh-cn/dotnet/standard/base-types/custom-date-and-time-format-strings
