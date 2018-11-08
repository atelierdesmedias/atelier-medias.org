# Install PHP, Apache and MySQL with Brew

First install the following packages:

```
brew install apache-httpd mysql php
```

Edit `/usr/local/etc/httpd/httpd.conf` and replace:

```
DocumentRoot "/usr/local/var/www"
<Directory "/usr/local/var/www">
...
```

By

```
DocumentRoot "/path/to/wordpress"
<Directory "/path/to/wordpress">
...
```

And add the following line:

```
LoadModule php7_module /usr/local/opt/php/lib/httpd/modules/libphp7.so
```

Replace the following:

```
<IfModule dir_module>
     DirectoryIndex index.html
</IfModule>
```

```
<IfModule dir_module>
     DirectoryIndex index.html index.php
</IfModule>

<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>
```

Link the theme to your Wordpress:

```
$ ln -sf /path/to/wp-admtheme /path/to/wordpress/wp-content/theme/wp-admtheme
```

Start apache server:

```
$ brew services start httpd
```
