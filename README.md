# react-study

react 学习记录

## 一、初始 `create-react-app` 脚手架

 通过 react 官方脚手架 —— `create-react-app` 进行学习

1. 安装命令：`npm i create-react-app -g`
2. 创建项目：`create-react-app <项目名称>`

### 1. 了解 `package.json`

 1.1 通过 `create-react-app` 安装的项目主要会默认安装以下依赖内容：

- react：React 框架核心

- react-dom：React 视图渲染的核心 「基于 React 构建 WebApp（HTML 页面）」

- react-native：构建和渲染 App 的

- react-script：脚手架为了让项目目录看起来干净整洁，把 webpack 打包的规则及相关插件/Loader 等都隐藏到 node_modules 目录下。

- web-vitals： 用于监测性能

 1.2 项目默认调试命令是通过 `react-script` 依赖运行的。`react-script` 是脚手架中自己对打包命令的一种封装，但是其本质是调用 node_modules 中的 webpack 等进行处理。

![image-20230905162414415](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230905162414415.png)

 1.3 项目中设置 eslint 配置的地方

![image-20230905164457255](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230905164457255.png)

 1.4 对浏览器兼容设置，分为对生产环境和开发环境两种配置

![image-20230905165614940](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230905165614940.png)

### 2 暴露 webpack 规则配置文件

 2.1 运行 `npm run eject` 命令确认暴露 webpack 配置文件进行项目自定义。暴露后项目新增以下目录结构。

- config 目录下主要包含脚手架默认隐藏的配置文件

![image-20230905172804129](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230905172804129.png)

- scripts 文件下主要包含项目后期运行命令的入口文件

![image-20230905172948671](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230905172948671.png)

 2.2 暴露后，package.json 文件会被修改。主要变化包括：

- 调试命令不再通过 `react-script` 封装的插件进行调用，而是直接通过 `node` 命令运行 scripts 目录下的 js 文件。并且删除了 `eject` 命令（不能还原暴露文件，也不能再次暴露）。

- 将隐藏的依赖再次安装显示在本文件中。
- 添加了对 jest 和 babel 进行额外的配置项

### 3 自定义脚手架配置

#### 1）babel-preset-react-app ：

​	对 @babel/preset-env 语法包的重写 「目的：把 ES6 转换为 ES5」，让 react 可以识别

#### 2）更换项目预编译语言（可选）：

​	 create-react-app 脚手架默认配置 sass。如需更换为 less，可以参考以下步骤：  

	1. 安装指定版本 less： `npm install less less-loader@8` 或 `yarn add ...`  
	1. 卸载 sass： `npm uninstall sass-loader` 或 `yarn remove ...` 
	1. 然后在 webpack.config.js 文件中将 loader 中匹配 sass 的 loader 配置更改为 less 

![image-20230907172626887](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230907172626887.png) ![image-20230907173315005](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230907173315005.png)

#### 3） 配置 src 目录别名（可选）：

 	在 webpack.config.js 文件解析器 resovle 的 alias 属性中添加别名配置

![image-20230908095956312](https://gitee.com/roada/drawingBed/raw/main/blog/image-20230908095956312.png)

#### 4）修改环境变量（可选）：

 	1. 需要安装 `cross-env` ： `yarn add cross-env` 。

	2. 在 package.j son 文件的调试命令中，需要修改的命令前加入 `cross-env <配置>` : ![image-20230911160752368](https://gitee.com/roada/drawingBed/raw/main/blog/image-20230911160752368.png) 

#### 5）修改浏览器兼容 

​	通过修改兼容列表 `browserlist` 和 `development` 实现浏览器兼容，但是无法处理 ES6 内置 API 的兼容「需要 @babel/polyfill 对常见内置的 API 进行重写」。car 脚手架已经在 react-app-polufoll 中进行处理，只需要全局导入 `react-app-polyfill/<兼容版本>` 。

![image-20230911161419064](https://gitee.com/roada/drawingBed/raw/main/blog/image-20230911161419064.png)

#### 6）处理跨域「 `webpack-dev-server` 的跨域代理原理也是基于它完成的」

1. 创建 `setupProxy.js` 文件 ​

2. 安装 `http-proxy-middleware` 依赖：`yarn add http-proxy-middleware` 

![image-20230912111135911](https://gitee.com/roada/drawingBed/raw/main/blog/image-20230912111135911.png)
