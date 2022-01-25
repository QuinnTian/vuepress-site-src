---
title: 在CentOS8上安装Nginx+Nextcloud21
date: 2021-03-12 14:02:06.653
updated: 2021-03-12 14:02:06.653
categories: Linux
tags: 
comments: true
---

# 1.安装Nginx


如果是CentOS8以下替换成`yum`安装，`dnf`是新一代包管理工具。
`sudo dnf install nginx`
```xml
# 启动
systemctl start nginx
# 设置开机自启
systemctl enable nginx
# 查看状态
systemctl status nginx
```
添加https和http端口到防火墙，如果你开启了防火墙，否则忽略这一步
```
firewall-cmd --add-service=http --permanent
firewall-cmd --add-service=https --permanent
firewall-cmd --reload
```
# 2.安装PHP FPM
安装一些必要的工具
```
dnf install -y epel-release yum-utils unzip curl wget \
bash-completion policycoreutils-python-utils mlocate bzip2
```
安装REMI仓库
```
dnf install https://rpms.remirepo.net/enterprise/remi-release-8.rpm

```
安装yum-utils package
```
dnf install yum-utils
```
```
dnf module reset php
dnf module install php:remi-7.4
```
安装PHP所需模块
```
dnf install -y php php-gd php-mbstring php-intl php-pecl-apcu\
     php-mysqlnd php-opcache php-json php-zip

dnf install -y php-redis php-imagick
```

# 3.配置PHP-FPM
`vim /etc/php.ini`增加或取消如下注释并保存
```
memory_limit = 512M
date.timezone = Asia/Shanghai
cgi.fixpathinfo = 0
```
配置PHP opcache
```
vim /etc/php.d/10-opcache.ini
```
配置PHP-FPM
```
vim /etc/php-fpm.d/www.conf
```
确保如下内容，取消注释或者修改，保存
```
listen = /run/php-fpm/www.sock
user = nginx
group = nginx
user.ower = nginx
group.ower = nginx
listen.mode = 0660
env[HOSTNAME] = $HOSTNAME
env[PATH] = /usr/local/bin:/usr/bin:/bin
env[TMP] = /tmp
env[TMPDIR] = /tmp
env[TEMP] = /tmp
php_value[opcache.file_cache] = /var/lib/php/opcache

```
创建如下文件夹并授予权限，如提示已存在，直接授予权限即可
```
mkdir -p /var/lib/php/{session,opcache}
chown -R nginx:nginx /var/lib/php/{session,opcache}
```
设置开机自启和重启
```
systemctl enable php-fpm
systemctl start php-fpm
```
查看服务状态，正常如下
```
netstat -pl | grep php
systemctl status php-fpm
```
正常显示如下
```
unix  2      [ ACC ]     STREAM     LISTENING     18586    673/php-fpm: master  /run/php-fpm/www.sock

 Active: active (running) since Fri 2021-03-12 03:16:42 HKT; 10h ago
 Main PID: 673 (php-fpm)
   Status: "Processes active: 0, idle: 13, Requests: 335, slow: 0, Traffic: 0req/sec"
    Tasks: 24 (limit: 11493)
   Memory: 670.3M
   CGroup: /system.slice/php-fpm.service
           ├─ 673 php-fpm: master process (/etc/php-fpm.conf)
           ├─ 709 php-fpm: pool www
           ├─ 710 php-fpm: pool www
           ├─ 711 php-fpm: pool www
           ├─ 712 php-fpm: pool www
           ├─ 713 php-fpm: pool www
           ├─1168 php-fpm: pool www
           ├─1174 php-fpm: pool www
           ├─1179 php-fpm: pool www
           ├─1183 php-fpm: pool www
           ├─1199 bash -c ( /var/www/nextcloud/apps/richdocumentscode/collabora/Collabora_Online.AppImage || /var/www/nextcloud>
           ├─1214 /var/www/nextcloud/apps/richdocumentscode/collabora/Collabora_Online.AppImage --appimage-extract-and-run

```
# 3.安装数据库
如果本来已经安装Mysql也可，建议安装8.0，新版已经不支持8.0以下的MySQL
`sudo dnf install mariadb mariadb-server
`
```
systemctl start mariadb
systemctl enable mariadb
```
按照提示设置密码等选项
```
mysql_secure_installation

```
登录
`mysql -u root -p yourpassword`
执行如下命令创建数据库并新建专属用户授予其权限
```
create database nextcloud_db;
create user nextclouduser@localhost identified by 'nextcloudpassdb';
grant all privileges on nextcloud_db.* to nextclouduser@localhost identified by 'nextcloudpassdb';
flush privileges;
```
# 4.生成SSL证书
这一步，推荐直接去腾讯云等申请SSL证书
当然也可以如下
```
sudo dnf install certbot
```
下面确保换成你的域名和邮箱
```
certbot certonly --webroot --webroot-path /usr/share/nginx/html --agree-tos -m myemail@gmail.com -d cloud.hakase-labs.io
```
保存在了`/etc/letsencrypt/live/cloud.hakase-labs.io/`
用下面命令检查
```
ls -lah /etc/letsencrypt/live/cloud.hakase-labs.io/
```
# 5.安装Nextcloud
安装解压工具`sudo dnf install unzip`
切换目录并下载
```
cd /var/www/
# 最新版下载链接https://nextcloud.com/install/  ->server
wget https://download.nextcloud.com/server/releases/nextcloud-21.0.0.zip

```
解压
```
uzip nextcloud-21.0.0.zip
```
创建数据目录并更改权限
```
mkdir -p /var/www/nextcloud/data/
sudo chown -R nginx:nginx /var/www/nextcloud
```
# 6.配置Nginx
在nginx.conf添加如下内容
```

upstream php-handler {
    server 127.0.0.1:9000;
    server unix:/run/php-fpm/www.sock;
}

server {
    listen 80;
    listen [::]:80;
    # 替换成你的
    server_name cloud.example.com;

    # Enforce HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443      ssl http2;
    listen [::]:443 ssl http2;
    # 替换成你的
    server_name cloud.example.com;

    # Use Mozilla's guidelines for SSL/TLS settings
    # https://mozilla.github.io/server-side-tls/ssl-config-generator/
    # 下面给两个证书地址替换成你的
    ssl_certificate      /ssl/;
    ssl_certificate_key  /ssl/;

    # HSTS settings
    # WARNING: Only add the preload option once you read about
    # the consequences in https://hstspreload.org/. This option
    # will add the domain to a hardcoded list that is shipped
    # in all major browsers and getting removed from this list
    # could take several months.
    #add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload;" always;

    # set max upload size
    client_max_body_size 512M;
    fastcgi_buffers 64 4K;

    # Enable gzip but do not remove ETag headers
    gzip on;
    gzip_vary on;
    gzip_comp_level 4;
    gzip_min_length 256;
    gzip_proxied expired no-cache no-store private no_last_modified no_etag auth;
    gzip_types application/atom+xml application/javascript application/json application/ld+json application/manifest+json application/rss+xml application/vnd.geo+json application/vnd.ms-fontobject application/x-font-ttf application/x-web-app-manifest+json application/xhtml+xml application/xml font/opentype image/bmp image/svg+xml image/x-icon text/cache-manifest text/css text/plain text/vcard text/vnd.rim.location.xloc text/vtt text/x-component text/x-cross-domain-policy;

    # Pagespeed is not supported by Nextcloud, so if your server is built
    # with the `ngx_pagespeed` module, uncomment this line to disable it.
    #pagespeed off;

    # HTTP response headers borrowed from Nextcloud `.htaccess`
    add_header Referrer-Policy                      "no-referrer"   always;
    add_header X-Content-Type-Options               "nosniff"       always;
    add_header X-Download-Options                   "noopen"        always;
    add_header X-Frame-Options                      "SAMEORIGIN"    always;
    add_header X-Permitted-Cross-Domain-Policies    "none"          always;
    add_header X-Robots-Tag                         "none"          always;
    add_header X-XSS-Protection                     "1; mode=block" always;

    # Remove X-Powered-By, which is an information leak
    fastcgi_hide_header X-Powered-By;

    # Path to the root of your installation
    root /var/www/nextcloud;

    # Specify how to handle directories -- specifying `/index.php$request_uri`
    # here as the fallback means that Nginx always exhibits the desired behaviour
    # when a client requests a path that corresponds to a directory that exists
    # on the server. In particular, if that directory contains an index.php file,
    # that file is correctly served; if it doesn't, then the request is passed to
    # the front-end controller. This consistent behaviour means that we don't need
    # to specify custom rules for certain paths (e.g. images and other assets,
    # `/updater`, `/ocm-provider`, `/ocs-provider`), and thus
    # `try_files $uri $uri/ /index.php$request_uri`
    # always provides the desired behaviour.
    index index.php index.html /index.php$request_uri;

    # Rule borrowed from `.htaccess` to handle Microsoft DAV clients
    location = / {
        if ( $http_user_agent ~ ^DavClnt ) {
            return 302 /remote.php/webdav/$is_args$args;
        }
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    # Make a regex exception for `/.well-known` so that clients can still
    # access it despite the existence of the regex rule
    # `location ~ /(\.|autotest|...)` which would otherwise handle requests
    # for `/.well-known`.
    location ^~ /.well-known {
        # The following 6 rules are borrowed from `.htaccess`

        location = /.well-known/carddav     { return 301 /remote.php/dav/; }
        location = /.well-known/caldav      { return 301 /remote.php/dav/; }
        # Anything else is dynamically handled by Nextcloud
        location ^~ /.well-known            { return 301 /index.php$uri; }

        try_files $uri $uri/ =404;
    }

    # Rules borrowed from `.htaccess` to hide certain paths from clients
    location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data)(?:$|/)  { return 404; }
    location ~ ^/(?:\.|autotest|occ|issue|indie|db_|console)              { return 404; }

    # Ensure this block, which passes PHP files to the PHP process, is above the blocks
    # which handle static assets (as seen below). If this block is not declared first,
    # then Nginx will encounter an infinite rewriting loop when it prepends `/index.php`
    # to the URI, resulting in a HTTP 500 error response.
    location ~ \.php(?:$|/) {
        fastcgi_split_path_info ^(.+?\.php)(/.*)$;
        set $path_info $fastcgi_path_info;

        try_files $fastcgi_script_name =404;

        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $path_info;
        fastcgi_param HTTPS on;

        fastcgi_param modHeadersAvailable true;         # Avoid sending the security headers twice
        fastcgi_param front_controller_active true;     # Enable pretty urls
        fastcgi_pass php-handler;

        fastcgi_intercept_errors on;
        fastcgi_request_buffering off;
    }

    location ~ \.(?:css|js|svg|gif)$ {
        try_files $uri /index.php$request_uri;
        expires 6M;         # Cache-Control policy borrowed from `.htaccess`
        access_log off;     # Optional: Don't log access to assets
    }

    location ~ \.woff2?$ {
        try_files $uri /index.php$request_uri;
        expires 7d;         # Cache-Control policy borrowed from `.htaccess`
        access_log off;     # Optional: Don't log access to assets
    }

    location / {
        try_files $uri $uri/ /index.php$request_uri;
    }
}
```
测试配置文件并保存
```
nginx -t
systemctl restart nginx
```
# 7.配置SELinx
仅仅在启动的情况下，否则忽略这一步
安装管理工具
```
sudo dnf install policycoreutils-python-utils

```
配置
```
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/data(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/config(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/apps(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/assets(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/.htaccess'
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/.user.ini'
 
restorecon -Rv '/var/www/nextcloud/'
```
# 8.进入Nextcloud网页端安装
此处按界面提示操作即可

# 9.故障排除
一般出现最多的是由于权限问题导致禁止访问，首先保证上面步骤中的授予某些目录权限是否执行。其次查看 nginx的`error.log`确定原因。



