# react-study

react 学习记录

## 一、初始 `create-react-app` 脚手架

​	通过 react 官方脚手架 —— `create-react-app` 进行学习

1. 安装命令：`npm i create-react-app -g`
2. 创建项目：`create-react-app <项目名称>`

### 1. 了解 `package.json`

​	1.1	通过 `create-react-app` 安装的项目主要会默认安装以下依赖内容：

* react：React框架核心

* react-dom：React视图渲染的核心 「基于React构建WebApp（HTML页面）」

* react-native：构建和渲染App的

* react-script：脚手架为了让项目目录看起来干净整洁，把 webpack 打包的规则及相关插件/Loader等都隐藏到 node_modules 目录下。

* web-vitals： 用于监测性能

​	1.2	项目默认调试命令是通过 `react-script` 依赖运行的。`react-script` 是脚手架中自己对打包命令的一种封装，但是其本质是调用 node_modules 中的 webpack 等进行处理。

![image-20230905162414415](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230905162414415.png)

​	1.3	项目中设置 eslint 配置的地方

![image-20230905164457255](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230905164457255.png)

​	1.4	对浏览器兼容设置，分为对生产环境和开发环境两种配置

![image-20230905165614940](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230905165614940.png)
