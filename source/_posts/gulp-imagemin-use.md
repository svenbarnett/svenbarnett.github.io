---
title: gulp-imagemin在压缩图片
keywords: 'gulp-imagemin,压缩图片,gulp'
description: 使用gulp进行图片压缩，借助gulp-imagemin插件
tags:
  - gulp
  - 压缩图片
  - gulp-imagemin
abbrlink: 1009bbf4
date: 2021-11-16 22:35:58
---

图片上传太大了，导致页面加载太慢，站点带宽本来不够，碰到大图片就会导致站点加载缓慢

<!-- more -->

经过各种研（bai）究（du），找到了一种方案：采用`gulp + gulp-imagemin`，对图片进行压缩，结合hexo进行对应图片压缩。

### 安装

```sh
npm install gulp --save-dev
npm install gulp-imagemin --save-dev
npm install imagemin-pngquant --save-dev
# 当然也可以--save  记得要给gulp全局安装下，npm命令不行，就是用cnpm
npm install gulp -g # 只有gulp要全局安装下
```

### gulpfile

在package.json同名目录下，增加gulpfile.js对应的入口js文件

```javascript
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

// 定义一个任务 第一个参数为名称，后面时要执行的动作
gulp.task('minify-images', function (done) {
    gulp.src('public/p/**/*.{JPG,jpg,PNG,png,GIF,gif,SVG,svg,JPEG,jpeg}')
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			usa:[pngquant()]
		}))
		.pipe(gulp.dest('public/p/'))
    done();
});
// 定义default ，后面将多个任务序列化并行执行，我们只有一个
gulp.task('default', gulp.series(gulp.parallel('minify-images')), function () {
    console.info("----------gulp Finished----------");
});
```

执行命令`gulp` 默认情况下，代表`gulp default`就执行你上面的default任务

当然你也可以制定任务名称：`gulp minify-images` 执行指定task

然后再hexo状态下：

```sh
hexo clean 
hexo g
gulp
# 输出如下：
[22:46:42] Using gulpfile ~/Desktop/blogfile/gulpfile.js
[22:46:42] Starting 'default'...
[22:46:42] Starting 'minify-images'...
[22:46:42] Finished 'minify-images' after 74 ms
[22:46:42] Finished 'default' after 99 ms
```

那说明成功了

### 遇到的坑

- 引入语法问题，插件需要使用es6语法，故此你的package.json 需要增加一个参数`  "type": "module"`如此你可以再gulpfile.js中使用es6的import语法
