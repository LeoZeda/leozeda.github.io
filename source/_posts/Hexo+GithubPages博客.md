---
title: Hexo + Github Pages建博客
date: 2016-12-26 21:35:49
categories: [教程]
tags: [hexo, 教程]
---
## 前言
作为一个有理想的程序员都希望自己弄一个属于自己的博客，当然我也不例外哈～平时查找相关资料或解决问题的时候就看到各种牛人们的博客，自己也一直想弄，但都没有太多时间去弄（借口）。
一开始想在阿里云上弄个自己的网站然后写博客的，于是申请了两年免费的虚拟机，申请后闲置了半年才去折腾。虚拟机毕竟是虚拟机，它不支持ssh登录，不能自己安装软件，只是支持php、HTML、WAP，php、wap都不太懂。云服务器又不舍得买，也就只好安装wordpress来搭建博客，安装完选好主题之后，发现wordpress不太好用，感觉条条框框的较多，也就又搁置了一段时间。最后，在网上看到可以用hexo+githubpages搭建，也就又开始折腾了。
hexo+githubpages比较好的地方：
+ 根据Markdown文件直接生成静态的html
+ [主题](https://hexo.io/themes/)可以自己选择，并可以直接修改主题代码
+ 完全免费

## 安装及基本用法
hexo[官网教程](https://hexo.io/zh-cn/docs/index.html)（[英文](https://hexo.io/docs/)）讲解都很详细的，按照文档一步步来都可以完成，网上搜到的教程很多很杂，有些教程可能是旧版本的，所以最后还是查看官网的教程，比较新，免得自己踩坑。
**安装依赖**：
+ [Node.js](http://nodejs.org/)
+ [Git](http://git-scm.com/)

**安装hexo**：
```
$ npm install -g hexo-cli```
安装完之后可以敲下面的命令查看hexo的用法，以及验证是否安装成功：
`$ hexo -h或--help`


**新建博客**
执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。若floder不存在会自动创建。
`$ hexo init <folder>`
**新建文章**
新建一个题目为title的文章，新建的文件路径在source/_posts，文件名为title.md
`$ hexo new <title>`
**启用本地服务**
运行下面的命令， 就可以在 localhost:4000/ 查看你的博客。
`$ hexo server（或 s）`


## Hexo主题
hexo默认的是landscape主题, 可以自己安装其他主题。在主题官网上个人比较喜欢的主题是[indigo](https://github.com/yscoder/hexo-theme-indigo),这个主题的安装配置[教程](https://github.com/yscoder/hexo-theme-indigo/wiki)还是比较完善的。
上了船之后，后来发现还有一些很不错的主题：
+ [material](https://github.com/viosey/hexo-theme-material)
+ [NexT](https://github.com/iissnan/hexo-theme-next)

这两个教程就更完善了，不过这个还是看个人的喜好哈～

官网的[主题介绍](https://hexo.io/zh-cn/docs/themes.html)相对比较简单，不过也说明了一些关键点，如：
+ 修改主题只需修改_config.xml内的theme即可切换，前提是在themes文件夹内有这个主题
+ 一个主题的文件结构为：
    + _config.yml， 主题内的配置文件
    + languages， 一些国际化的配置
    + layout，主题的模板， 自己定制可以修改这里的模板
    + scripts， 第三方库脚本
    + source，样式，图片等

详细的安装过程，可以参考所下载主题的安装教程，如本站的[indigo](https://github.com/yscoder/hexo-theme-indigo)。需要注意的是该主题要求Node 版本为 6.x 以上，要不然会导致一些插件编译或部署错误。


## Github Pages部署发布
[github pages](https://pages.github.com)是一个托管静态站点的服务，旨在能够直接从github仓库里托管个人、组织或项目页面。新建github page可以参考[官网教程](https://pages.github.com/)。
如果有个人域名的可参考如何将[github pages绑定到个人域名](http://blog.csdn.net/lmj623565791/article/details/51319147), 绑定后访问你的域名就可以直接访问到github pages，瞬间变得高大上。

**生成静态文件**
`$ hexo generate(或g)`将md文件编译成静态网页到pulic目录下。
``` bash
PS： public 目录下的style.css需要删除后，在生成，否则不会覆盖，不知道是否是bug
```

**部署到git**    [官网教程](https://hexo.io/zh-cn/docs/deployment.html#Git)
安装 hexo-deployer-git
`$ npm install hexo-deployer-git --save`
修改配置文件_config.xml
```
deploy:
  type: git
  repo: <repository url>
  branch: [branch]
  message: [message] (commit msg)
```
``` bash
PS： 一些非hexo的文件也可以放在public目录下，如CNAME，README.md等，放在其他地方不能部署到github
```

## 传送门
+ [haroopad](http://pad.haroopress.com/user.html) Markdown的编辑软件
+ [Markdown语法及haroopad软件安装](http://blog.csdn.net/tao_627/article/details/50625436)
+ [hexo 插件](https://github.com/hexojs/hexo/wiki/Plugins)

