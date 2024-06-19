# react-study

react 学习记录

## 一、初始 `create-react-app` 脚手架

通过 react 官方脚手架 —— `create-react-app` 进行学习

1. 安装命令：`npm i create-react-app -g`
2. 创建项目：`create-react-app <项目名称>`

### 1. 了解 `package.json`

1.1 通过 `create-react-app` 安装的项目主要会默认安装以下依赖内容：

- react：React 框架核心

- react-dom：React 视图渲染的核心 「渲染在不同平台所需要的核心代码」

- babel：讲 jsx 转换为 React 代码 的工具

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

对 @babel/preset-env 语法包的重写 「目的：把 ES6 转换为 ES5」，让 react 可以识别

#### 2）更换项目预编译语言（可选）：

create-react-app 脚手架默认配置 sass。如需更换为 less，可以参考以下步骤：

    1. 安装指定版本 less： `npm install less less-loader@8` 或 `yarn add ...`
    1. 卸载 sass： `npm uninstall sass-loader` 或 `yarn remove ...`
    1. 然后在 webpack.config.js 文件中将 loader 中匹配 sass 的 loader 配置更改为 less

![image-20230907172626887](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230907172626887.png) ![image-20230907173315005](https://raw.githubusercontent.com/C-G-L-A-D/drawingBed/main/blogimage-20230907173315005.png)

#### 3） 配置 src 目录别名（可选）：

在 webpack.config.js 文件解析器 resovle 的 alias 属性中添加别名配置

![image-20230908095956312](https://gitee.com/roada/drawingBed/raw/main/blog/image-20230908095956312.png)

#### 4）修改环境变量（可选）：

1. 需要安装 `cross-env` ： `yarn add cross-env` 。
2. 在 package.j son 文件的调试命令中，需要修改的命令前加入 `cross-env <配置>` :

![image-20230915144316930](https://gitee.com/roada/drawingBed/raw/main/blog/image-20230915144316930.png)

#### 5）修改浏览器兼容

通过修改兼容列表 `browserlist` 和 `development` 实现浏览器兼容，但是无法处理 ES6 内置 API 的兼容「需要 @babel/polyfill 对常见内置的 API 进行重写」。car 脚手架已经在 react-app-polufoll 中进行处理，只需要全局导入 `react-app-polyfill/<兼容版本>` 。

![image-20230911161419064](https://gitee.com/roada/drawingBed/raw/main/blog/image-20230911161419064.png)

#### 6）处理跨域「 `webpack-dev-server` 的跨域代理原理也是基于它完成的」

1. 创建 `setupProxy.js` 文件 ​

2. 安装 `http-proxy-middleware` 依赖：`yarn add http-proxy-middleware`

![image-20230912111135911](https://gitee.com/roada/drawingBed/raw/main/blog/image-20230912111135911.png)

## React-Router v6.4

### 安装

```bash
# 使用 yarn 安装
yarn install react-router-dom
# 使用 npm 安装
npm i react-router-dom
```

### 模式

#### 使用方式

 配置路由可以选择 `hash` 模式和 `history` 模式。以下使用路由表映射配置路由进行举例。

1. 因此先创建路由映射表文件:

```js
// router.js 文件
import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from '@/components/Layout' // 公共布局组件
import Home from '@/views/Home' // Home 页面文件
const routes = [
  {
    path: '/',
    element: <Layout />
  },
  {
    path: '/home',
    element: <Home />
  }
]

// 通过 createHashRouter 函数创建 hash 路由
const router1 = createHashRouter(routes)
// 通过 createBrowserRouter 函数创建 history 路由
const router2 = createBrowserRouter(routes)

export default router1 // 使用 hash 模式
```

2. 在 index.jsx 文件入口位置选择路由模式并注入 router ，使其生效。（）

```jsx
// index.js 文件
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider } from 'react-router-dom'
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* 使用 RouterProvider 向 App 组件下全局注入路由信息 */}
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
)
```

#### hash 和 history 模式的区别

1. 路径不同：

    hash 模式路由访问路径会在中间多一个 `#` ，如访问 home 页面， hash 模式的访问路径为 `http://hostname:port/#/home` ；而 history 模式的访问路径则是 `http://hostname:port/home` 。

 2.

### 多级路由

 多个同级路由页面需要使用上级路由页面的布局作为公共布局，这时候就需要使用子组件嵌套，使用嵌套路由。

1. 因此需要改造路由映射表 router.js 文件为嵌套路由;

```js
// router.js 文件
import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from '@/components/Layout'; // 公共布局组件
import Home from '@/views/Home'; // Home 页面文件
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [ // 二级路由
    	{
    		path: '/home',
    		element: <Home />
  		},
 			{
    		path: '/home',
    		element: <Home />
  		}
    ]
  }
]

...
```

### 基础路由搭建

1. 安装 react-router v6 版本（最新版）

```bash
npm i react-router-dom
```

2. 创建路由映射配置文件，选择路由模式。其中可以选择使用 hash 路由模式或 history 路由模式。

```js
// router -> index.js
// 引入创建路由模式方法
import { createBrowserRouter, createHashRouter } from 'react-router-dom'

// 路由映射配置信息
const routes = []

// 创建路由
// history 路由模式
const router = createBrowserRouter(routes)
// hash 路由模式
const router = createHashRouter(routes)

export default router
```

3. 配置路由表（路由映射规则）

```js
// router -> index.js
import { createRoutesFromElements, Route } from 'react-router-dom'

import Home from '@/views/Home'
import About from '@/views/About'
import App from '../App'

// 路由映射配置信息
const routes = [
  {
    path: '/', // 路由路径
    element: <App />, // 路由对应渲染的页面内容
    children: [
      // 通过 children 属性配置子路由，形成嵌套路由
      {
        // 子路由访问时自动添加父路由的路径，这里无需添加
        path: 'home',
        // 访问子路由页面也会一同显示父路由的内容
        element: <Home />
      }
    ]
  },
  {
    path: '/about', // 路由路径
    element: <About /> // 路由对应渲染的页面内容
  }
]

// 路由表配置
const routes1 = createRoutesFromElements({
  <>
  	<Route path="/" element={<App/>}>
    	<Route path="home" element={<Home/>}></Route>
  	</Route>
		<Route path="/about" element={<About/>}></Route>
  </>
})

export default routes
```

4. 将路由注入全局，使其生效

```jsx
// src -> index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App'
import routes from './router/index.js'
import { createBrowserRouter, createHashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter(routes);
// const router = createHashRouter(routes);

/*
	被 RouterProvider 包裹的内容都可以共享同一份 router 配置，
	即 App 组件及其组件下的所有内容都可以使用 router 路由配置，
	RouterProvider 外的内容不受 router 影响
*/
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
)
```

5. 创建页面组件。

    嵌套路由访问子路由页面。需要在父路由渲染的组件页面中添加占位组件。当访问子路由时，子路由的内容会替换占位组件的位置；访问父路由时占位组件不渲染。

```jsx
// src -> App.js
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <h1>Hello App</h1>
      {/* 
    	Outlet 是占位路由，访问 /home 页面时，Home 组件的内容渲染在这 			*/}
      <Outlet />
      <p>这是父路由 / 对应的组件内容页面</p>
    </div>
  )
}

export default App
```

```jsx
// scr -> views -> Home -> index.jsx
const Home = () => {
  return <div>
    <h2>Hello Home</h1>
    <p>这是子路由 /home 对应的组件内容页面</p>
  </div>
};

export default Home;
```

### 动态路由

1. 配置路由表

```js
// router -> index.js
import { createBrowserRouter, createHashRouter } from 'react-router-dom'

import Home from '@/views/Home'
import Detail from '@/views/Detail'
import App from '../App'

// 路由映射配置信息
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'detail/:id', // 动态路由
        element: <Detail />
      }
    ]
  }
]

const router = createBrowserRouter(routes)
export default router
```

2. 跳转动态路由页面

```jsx
// scr -> views -> Home -> index.jsx
import { Link } from 'react-router-dom'
const Home = () => {
  return <div>
    <h2>Hello Home</h1>
    <Link to="/detail/123">跳转123页</Link>
    <Link to="/detail/323">跳转323页</Link>
  </div>
};

export default Home;
```

3. 获取动态路由路径和参数

```jsx
// scr -> views -> Detail -> index.jsx
import { useParams, useLoaction } from 'react-router-dom'
const Detail = () => {
  const params = useParams()
  const location = useLoaction()
  return <div>
    <h2>Hello Detail</h1>
    <p>当前id参数的值为 {params.id}</p>
  </div>
};

export default Detail;
```

> Link 组件是不具备样式的，如果需要给链接加上样式，需要使用 NavLink 组件
>
> ```jsx
> // scr -> views -> Home -> index.jsx
> import './index.scss'
> import { NavLink } from 'react-router-dom'
> const Home = () => {
> return <div>
>  <h2>Hello Home</h1>
>  <NavLink to="/detail/123">跳转123页</NavLink>
>  <NavLink to="/detail/323">跳转323页</NavLink>
> </div>
> };
>
> export default Home;
> ```
>
> ```scss
> // scr -> views -> Home -> index.scss
>
> // NavLink 组件默认当前激活样式的选择器为 .active
> .active {
>   background: red;
>   color: white;
> }
> ```
>
> 如果需要使用自定义选择器样式可以解构 className 获取 isActive 变量
>
> ```jsx
> // scr -> views -> Home -> index.jsx
> import './index.scss'
> import { NavLink } from 'react-router-dom'
> const Home = () => {
> return <div>
>  <h2>Hello Home</h1>
>  <NavLink to="/detail/123" className={
>      ({isActive}) => isActive ? 'active-2' : ''
>    }>跳转123页</NavLink>
>  <NavLink to="/detail/323">跳转323页</NavLink>
> </div>
> };
>
> export default Home;
> ```
>
> ```scss
> // scr -> views -> Home -> index.scss
>
> .active {
>   background: red;
>   color: white;
> }
>
> // NavLink 自定义激活状态类名
> .active-2 {
>   background: blue;
> }
> ```

### 编程式路由

1. 跳转事件

```jsx
// scr -> views -> Home -> index.jsx
import './index.scss'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`detail/${id}`, {state: {id}})
  }

  const handleClick1 = () => {
    navigate(`home?name=asdfff`)
  }

  return <div>
    <h2>Hello Home</h1>
    <button onClick={() => handleClick(123)} >
      跳转123页
    </button>
    <button onClick={() => handleClick(323)}>
      跳转323页
    </button>
    <button onClick={handleClick1}>
      跳转323页
    </button>
  </div>
};

export default Home;
```

2. 获取跳转参数和路由信息

```jsx
// scr -> views -> Home -> index.jsx
import { useLoaction, useSearchParams } from 'react-router-dom'
const Home = () => {
  const location = useLoaction()
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(location.satate )
  return <div>
    <h2>Hello Detail</h1>
    <p>当前id参数的值为 {searchParams.get('name')}</p>
  </div>
};

export default Home;
```

### 路由权限拦截

1. 在路由映射文件中使用 `loader + redirect` 来进行路由权限拦截。

```js
// router.js
import {createBrowserRouter, redirect }  from 'react-router-dom';
import App from '../App';
import Home from '../views/Home/Home';
import Home from '../views/Login/Login';
export const routes = [
  {
    path: '/',
    element: <App/>,
    children: [
    	{
    		path: 'home',
    		element: <Home />,
    		// loader 函数在路由加载前触发
    		loader: async() {
  				// 使用异步
 					let res = await new Promise(resolve => {
  					setTimeout(() => {
              resolve({
                errorCode: Math.random() > 0.5 ? 0 : 1
              })
            }, 2000);
  				})
  				console.log('home');
					if(res.errorCode === 0) {
            // 返回的结果可以在对应组件内拿到
						return res;
          } else {
             // loader 函数中只能使用 redirect方法来重定向跳转页面
            return redirect('/login');
          }
  			}
  		}
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <div>404</div> // 找不到指定路径跳转404
  }
]

export default createBrowserRouter(routes);
```

2. 在组件内获取 loader 返回的结果

```js
import { useLoaderData } from 'react-router-dom'

const Home = props => {
  const data = useLoaderData()
  console.log(data) // 输出 loader 中返回的结果
  return <div>Home</div>
}

export default Home
```

### 路由守卫

将前置路由守卫抽离为组件包裹在需要渲染的路由组件上

1. 创建 BeforeEach 组件，将传递的组件内容进行展示（不影响原有内容展示）

```jsx
// BeforeEach.jsx
import React from 'react'

export default function BeforeEach(props) {
  // props.children 将BeforeEach组件包裹内容原封不动进行展示
  return <div>{props.children}</div>
}
```

2. 将需要使用路由守卫的映射元素包裹在 BeforeEach 组件中

```js
import {createBrowserRouter }  from 'react-router-dom';
import App from '../App';
import Home from '../views/Home/Home';
import BeforeEach from '../components/BeforeEach';


const routes = [
  {
    path: '/',
    // 将 App 根组件包裹在 BeforeEach 组件内，此时 App 根组件下所有页面都可以享有同一个路由守卫
    element: <BeforeEach><App/></BeforeEach>,
     // 错误页面
    errorElement： <div>404</div>,
    children: [
    	{
    		path: 'home',
    		element: <Home />
  		}
    ]
  }
]

export default createBrowserRouter(routes);
```

3. 编写路由守卫内容

```js
// BeforeEach.jsx
import React from 'react'
import { useLocation } from 'react-router-dom'
export default function BeforeEach(props) {
  /*
  	 useLocation() 不同路由页面不一样，
  	 会引起重新渲染，console.log 就会重新输出
  	 若页面没有变化，则不会重新渲染 console.log 只会触发一次
  	 因此要使路由守卫生效，必须有一个能够跟随页面变化而变化的东西来触发器重新渲染
  */
  const location = useLocation()
  console.log('BeforeEach')

  // props.children 将BeforeEach组件包裹内容原封不动进行展示
  return <div>{props.children}</div>
}
```

### 路由元信息

1. 在路由映射表中自定义路由元信息

```js
// router.js
import {createBrowserRouter }  from 'react-router-dom';
import App from '../App';
import Home from '../views/Home/Home';
import BeforeEach from '../components/BeforeEach';


export const routes = [
  {
    path: '/',
    element: <BeforeEach><App/></BeforeEach>,
    meta: { title: 'App' }, // 自定义路由元信息
    children: [
    	{
    		path: 'home',
    		element: <Home />,
  			meta: { title: 'Home', auth: true } // 自定义路由元信息
  		}
    ]
  },
  {
    path: '/login'
    element: <Login />,
    meta: {title: 'login', auth: false} // 登录页，无需登录
  }
]

export default createBrowserRouter(routes);
```

2. 获取路由元信息

```jsx
// BeforeEach.jsx
import React from 'react'
import { useLocation, matchRoutes, Navigate } from 'react-router-dom'
import { routes } from '../../router'
export default function BeforeEach(props) {
  const location = useLocation()

  const matchs = matchRoutes(routes, location)
  console.log(matchs)
  console.log('beforeEach')

  // matchs 数组最后一个路由为当前页面的路由信息
  const currentPageRoute = matchs[matchs.length - 1].route
  console.log('current-meta', currentPageRoute.meta)

  if (currentPageRoute.meta.auth) {
    // 需要权限才能登录，不允许进入使用 Navigate 组件进行重定向跳转
    return <Navigate to='/login' />
  } else {
    return <div>{props.children}</div>
  }
}
```

### 默认路由、路由重定向和错误路由

 通过 `index` 属性进行设置：

```js
// router.js
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import Home from '../views/Home/Home'

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <div>这是错误内容</div>, // 错误路由
    children: [
      {
        index: true, // 设置为默认内容
        // element: <div>这里是 / 默认内容</div>
        element: <Navigate to='/home' /> // 重定向到/home页面
      },
      {
        path: 'home',
        element: <Home />
      }
    ]
  },
  {
    path: '*',
    element: <div>404</div> // 找不到指定路径跳转404
  }
]

export default createBrowserRouter(routes)
```

##

## Redux

### 一、初学

1. 安装 Redux

```bash
npm i redux
```

2. 创建 store

```js
// createStore 已被弃用，使用 legacy_createStore 进行替代
import { createStore as legacy_createStore } from 'redux'

// 1. 创建初始状态
const initState = {
  count: 0
}

// 2. 创建变更状态的方法
function counterReducer(state = initState, action) {
  switch (action.type) {
    case 'inc':
      return { coun: state.count + 1 }
    default:
      return state
  }
}

// 3. 创建 store
const store = createStore(counterReducer)

// 4. 统一导出 store
export default store
```

3. 使用 store

```jsx
import store from '../../ store'
import { useState } from 'react'
const Home = () => {
  const [count, setCount] = useState(store.getState().count)

  // 点击事件
  const handleClick = () => {
    // 通过 dispatch 方法触发 store的reducer 方法
    store.dispatch({ type: 'inc' })
  }

  // 通过 subscribe 方法获取 store 数据更新
  store.subscribe(() => {
    console.log('subscribe')
    // 重新设置 count 变量，触发页面更新
    setCount(store.getState().count)
  })

  // 渲染 store 中的内容
  return <div onClick={handleClick}>Home: {count}</div>
}

export default Home
```

### 二、使用 `react-redux ` 简化 Redux 的使用

 使用 `react-redux ` 第三方库来优化 `redux` 使用（无需手动更新状态）

1. 安装 `react-redux `

```bash
npm i react-redux
```

2. 全局注入 store

```jsx
// index.jsx
import React from 'react'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

const root = ReactDom.createRoot(document.getElementById('root'))

// 使用 Provider 来全局注入 store，可以在状态变化时自动进行视图更新
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
```

3. 创建 store

```js
import { createStore } from 'redux'

// 1. 创建初始状态
const initState = {
  count: 0
}

// 2. 创建变更状态的方法
function counterReducer(state = initState, action) {
  switch (action.type) {
    case 'inc':
      return { coun: state.count + state.payload }
    default:
      return state
  }
}

// 3. 创建 store
const store = createStore(counterReducer)

// 4. 统一导出 store
export default store
```

4. 使用 store

* 方法一：使用 ` useSelector ` 和 ` useDispatch ` 来获取 store 中的 state 和 dispatch 方法。

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default Home() {
  // 通过 useSelector 方法获取 state
  const count = useSelector((state) => state.count);

  // 获取 dispatch 方法来派发 action
  const dispatch = useDispatch();
  // 点击事件
  const handleClick = () => {
    // 通过 dispatch 方法触发 store的reducer 方法
    dispatch({type: 'inc', payload: 10 })
  }

  // 渲染 store 中的内容
  return <div onClick={handleClick}>
    Home: { count }
  </div>
}
```

* 方法二：使用 ` connect ` 函数来将redux store 和 react 组件进行连接。通过 props 来获取 state 和派发 action 的方法。

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default Home(props) {
  const { count, incDispatch } = props

  const handleClick = () => {
    // 直接调用 incDispatch 方法来派发 action 事件
    incDispatch()
  }
  
  // 渲染 store 中的内容
  return <div onClick={handleClick}>
    Home: { count }
  </div>
}

// 用于获取 state 数据，并将其注入组件的props中
const mapStateToProps = state => ({
  count: state.count
})
// 用于管理 action 方法的派发，并将其注入组件的props中
const mapDispatchToProps = dispatch => ({
  incDispatch() {
    // 派发 action 方法
    dispatch({type: 'inc', payload: 10 })
  }
})

// connect 为高阶函数，参数和返回结果都是函数
export default connect(mapStateToProps, mapDispatchToProps)(Home)
```



### 三、redux 模块化

1. 创建 reducer ，并抽离到单独文件

```js
// store -> modules -> counter.js

const initState = {
  count: 0
}
function counterReducer(state = initState, action) {
  switch (action.type) {
    case 'counter/inc':
      return { count: state.count + action.payload }
    default:
      return state
  }
}

export default counterReducer
```

```js
// store -> modules -> message.js

const initState = {
  msg: 'hello'
}
function messageReducer(state = initState, action) {
  switch (action.type) {
    case 'message/change': // 设置方法的命名空间
      return { msg: action.payload }
    default:
      return state
  }
}

export default messageReducer
```

2.  通过 `combineReducers` 将多个 reducer 进行结合

```js
// store -> index.js
import { createStore, combineReducers } from 'redux'
import counterReducer from './modules/counter.js'
import messageReducer from './modules/message.js'

const reducers = combineReducers({
  counter: counterReducer, // 通过对象形式设置命名空间
  message: messageReducer
})

const store = createStore(reducers)

export default store
```

3. 使用不同模块的 store

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default Home() {
  // 获取状态时需要加上命名空间
  const count = useSelector((state) => state.counter.count);

  const dispatch = useDispatch();
  const handleClick = () => {
    // 通过 dispatch 方法触发 reducer 方法需要加上命名空间
    dispatch({type: 'counter/inc', payload: 10 })
  }

  return <div onClick={handleClick}>
    Home: { count }
  </div>
}
```

### 四、Redux DevTools

​	在浏览器安装 Redux DevTools 工具插件后，还需要在项目中配置开启才会生效。配置可以使用选择通用方法或通过安装第三方库来处理 Redux DevTools 扩展的集成。

* 通用方法

```js
// store -> index.js
import { legacy_createStore as createStore, compose  } from 'redux'
import reducer from './reducer.js'


// 开启 redux-devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers());
export default store;
```

* 使用 ` redux-devtools-extension ` 库

```bash
# 安装 redux-devtools-extension 依赖库
npm i redux-devtools-extension
```

```js
// store -> index.js
import { legacy_createStore as createStore  } from 'redux'
// 引入 composeWithDevTools 来进行集成
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer.js'

// 注入依赖
const store = createStore(reducer, composeWithDevTools());
export default store;
```

### 五、 dispatch 异步操作

 由于 dispatch 默认只支持对象字面量，如果需要进行异步操作，可以使用 redux-thunk 中间件进行处理，这样 dispatch 就可以传入一个异步的回调函数。

1. 安装

```bash
npm i redux-thunk
```

2. 引入中间件，并使用

```js
// store -> index.js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import counterReducer from './modules/counter.js'
import messageReducer from './modules/message.js'

const reducers = combineReducers({
  counter: counterReducer, // 通过对象形式设置命名空间
  message: messageReducer
})

// 使用 applyMiddleware 方法让中间件生效
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
```

3. 在 dispatch 中进行异步操作

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const incCountAction = () => {
  // 返回异步函数
  return (dispatch) => {
      setTimeout(() => {
        // 通过 dispatch 方法触发 reducer 方法需要加上命名空间
        dispatch({type: 'counter/inc', payload: 10 })
      }, 2000)
    }
}

export default Home() {
  // 获取状态时需要加上命名空间
  const count = useSelector((state) => state.counter.count);

  const dispatch = useDispatch();
  const handleClick = () => {
  	// 派发异步 action
    dispatch(incCountAction)
  }

  return <div onClick={handleClick}>
    Home: { count }
  </div>
}
```

## Redux-Toolkit(RTK)

### 便捷

1. 可自动于 redux devtools 结合，不需要再下载模块进行生效；
2. 数据不需要再通过返回值进行修改；
3. 内置 redux-thunk 异步插件

### 使用方式

1. 安装

```bash
npm i @reduxjs/toolkit
```

2. 引入 RTK

```js
// store -> index.js
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore()

export default store
```

3. 创建各模块的 store

```js
// store -> modules -> counter.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter', // 触发 dispatch 命名空间
  // 初始化共享状态
  initialState: {
    count: 0
  },
  // 编写 reducer 方法
  reducers: {
    inc(state, action) {
      state.count += action.payload
    }
  }
})

export default counterSlice.reducer
```

```js
// store -> modules -> message.js
import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message', // 触发 dispatch 命名空间
  // 初始化共享状态
  initialState: {
    msg: 'hello'
  },
  // 编写 reducer 方法
  reducers: {
    change(state, action) {
      state.msg = action.payload
    }
  }
})

export default messageSlice.reducer
```

4. 合并各个模块的 reducer

```js
// store -> index.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter.js'
import messageReducer from './modules/message.js'

/*
	 此处的命名空间对应的是使用查询时的命名空间，例如
	 查询 state.msg.msg 、 state.counter.count
*/
const store = configureStore({
  reducer: {
    counter: counterReducer, // 命名空间对应reducer
    msg: messageReducer
  }
})

export default store
```

5. 使用共享状态

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default Home() {

  const count = useSelector((state) => state.counter.count);
  const msg = useSelector((state) => state.msg.msg);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({type: 'counter/inc', payload: 10 })
        dispatch({type: 'message/change', payload: '变化' })
      }, 2000)
    })
  }

  return <div onClick={handleClick}>
    Home: {count}
    { msg }
  </div>
}
```

### 异步操作

1. 使用 createAsyncThunk 方法创建异步的 action

```js
// store -> modules -> counter.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 异步 action
export const counterAction = createAsyncThunk('counter/testAction', async () => {
  const ret = await new Promise(resolve => {
    setTimeout(() => {
      resolve(20)
    }, 2000)
  })
  return ret
})

const counterSlice = createSlice({
  name: 'counter', // 触发 dispatch 命名空间
  // 初始化共享状态
  initialState: {
    count: 0
  },
  // 编写 reducer 方法
  reducers: {
    inc(state, action) {
      state.count += action.payload
    }
  }
})

export default counterSlice.reducer
```

2. 调用异步的 action

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { counterAction } from '@/views/store/modules/counter'
export default Home() {

  const count = useSelector((state) => state.counter.count);
  const msg = useSelector((state) => state.msg.msg);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(counterAction()).then(res => {
      console.log(res, res.payload)
      // 获取异步 action 结果后再同步更改状态
      dispatch({
        type: 'counter/inc',
        payload: res.payload
      })
    })
  }

  return <div onClick={handleClick}>
    Home: {count}
    { msg }
  </div>
}
```

​	如果需要在获取异步结果之后同步更新共享数据状态有两种办法：

* 在异步 action 获取结果后，再派发一个 action 来同步更新数据，例如上述的代码；
* 在 Slice 模块总，可以通过 extraReducers 属性来监听异步 action 状态。监听异步 action 的 fulfilled 状态，可以获取异步完成的结果，此时通过回调函数中的参数 state 和 action ，可以改变数据。具体如以下代码：

```js
// store -> modules -> counter.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 异步 action
export const counterAction = createAsyncThunk('counter/testAction', async () => {
  const ret = await new Promise(resolve => {
    setTimeout(() => {
      resolve(20)
    }, 2000)
  })
  return ret
})

const counterSlice = createSlice({
  name: 'counter', // 触发 dispatch 命名空间
  // 初始化共享状态
  initialState: {
    count: 0
  },
  // 编写 reducer 方法
  reducers: {
    inc(state, action) {
      state.count += action.payload
    }
  },
  extraReducers: {
    // 可在这监听异步 action 完成后的状态，进行后续同步操作
    [counterAction.fulfilled](state, action) {
      state.count += action.payload
    },
    // 同时还可以监听异步 action 派发的 pending、rejected 状态
    [counterAction.pending](state, action) {
       console.log('pengding 状态')
    },
    [counterAction.rejected](state, action) {
      console.log('rejected 状态')
    }
  }
})

export default counterSlice.reducer
```

> extraReducers 属性可以通过函数对象形式来进行配置，但是也可以使用链式调用写法。用法如下：
>
> ```js
> extraReducers: builder => {
>     builder
>     .addCase(counterAction.fulfilled, (state, { payload }) => {
>         // 处理 异步action 成功返回的结果，变更state
>         state.count += action.payload
>         console.log('fulfilled 状态')
>       })
>       .addCase(counterAction.pending, (state, { payload }) => {
>         console.log('pengding 状态')
>       })
>       .addCase(counterAction.rejected, (state, { payload }) => {
>         console.log('rejected 状态')
>       })
>   }
> ```

## redux 数据持久化

 使用 `redux-persist` 进行数据持久化，将数据存储在本地 storage 中，避免刷新时数据重置。

1. 安装

```bash
npm i redux-persist
```

2. 在 store 中引入相关依赖

```js
// store -> index.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter.js'
import messageReducer from './modules/message.js'

// 引入 redux-persist 相关依赖
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  PEGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// 配置
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whiteList: ['count'] // 可以指定持久化store下哪些数据可以被持久化
}

const store = configureStore({
  reducer: {
    // counter 进行持久化处理
    counter: persistReducer(persistConfig, counterReducer),
    message: messageReducer
  },
  middleware: getDefaultMiddleware => {
    // 使用中间件
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, PEGISTER]
      }
    })
  }
})
// store 结合持久化
persistStore(store)

export default store
```

## hooks

### useReducer

 在 `typescript` 中，useReducer 的类型参数为 `Reducer<共享数据的类型, action 的类型>` 。

- 使用方式 1：

```markdown
useReducer<Reducer<共享数据类型, action 类型>>(reducer, 初始数据)
```

 完整举例：

```tsx
import { Reducer, useReducer } from 'react'

// 定义 state 的数据类型
interface Data {
  result: number
}
// 定义 action 的数据类型
interface Action {
  type: 'add' | 'minus' // 只能有 add 和 minus 两个值
  num: number
}

// 创建 reducer
const reducer = (state: Data, action: Action) => {
  switch (action.type) {
    case 'add':
      return { result: state.result + action.num }
    case 'minus':
      return { result: state.result - action.num }
  }
}

const App = function () {
  const [res, dispatch] = useReducer<Reducer<Data, Action>>(reducer, { result: 0 })

  return (
    <div>
      <button onClick={() => dispatch({ type: 'add', num: 21 })}>加5</button>
      <button onClick={() => dispatch({ type: 'minus', num: 16 })}>减5</button>
      <div>result: {res.result}</div>
    </div>
  )
}

export default App
```

- 使用方法 2:

```markdown
useReducer<Reducer<共享数据类型, action 类型>, 函数参数数据类型>(reducer, 函数参数， 返回初始结果的函数)
```

完整举例：

```tsx
import { Reducer, useReducer } from 'react'

// 定义 state 的数据类型
interface Data {
  result: number
}
// 定义 action 的数据类型
interface Action {
  type: 'add' | 'minus' // 只能有 add 和 minus 两个值
  num: number
}

// 创建 reducer
const reducer = (state: Data, action: Action) => {
  switch (action.type) {
    case 'add':
      return { result: state.result + action.num }
    case 'minus':
      return { result: state.result - action.num }
  }
}

const App = function () {
  const [res, dispatch] = useReducer<Reducer<Data, Action>, boolean>(reducer, true, flag => {
    return { result: flag ? 100 : 0 }
  })

  return (
    <div>
      <button onClick={() => dispatch({ type: 'add', num: 21 })}>加5</button>
      <button onClick={() => dispatch({ type: 'minus', num: 16 })}>减5</button>
      <div>result: {res.result}</div>
    </div>
  )
}

export default App
```

### useReducer + immer

 在改变 state 的数据时， 每次都返回一个新的对象。如果 state 的数据结构比较复杂，则每次都创建一个新对象会比较麻烦，而且影响性能。例如

```tsx
import React, { useState, useCallback, Reducer, useReducer } from 'react@18'
import { createRoot } from 'react-dom@18/client'

interface Student {
  name: string
  sno: string
  age: number
}

interface Data {
  name: string
  teacherName: string
  teacherId: string
  students: Array<Student>
}

interface Action {
  type: 'add' | 'minus'
  student?: Student
}

const reducer = (state: Data, action: Action) => {
  switch (action.type) {
    case 'add':
      return { ...state, students: [...state.students, action.student] }
    case 'minus':
      const list =
        state.students.length >= 1 ? state.students.splice(0, state.students.length - 1) : []
      return { ...state, students: list }
  }
}

const App = function () {
  const [res, dispatch] = useReducer<Reducer<Data>, boolean>(reducer, {
    name: '一年级二班',
    teacherId: '2145345342',
    teacherName: '英语老师',
    students: [
      {
        name: '学生A',
        sno: '2346688',
        age: 6
      },
      {
        name: '尖子生',
        sno: '2346638',
        age: 6
      }
    ]
  })

  const [no, setNo] = useState(1)

  const addStudent = () => {
    dispatch({
      type: 'add',
      student: {
        name: `学生${no}`,
        sno: `${5352423 + no}`,
        age: 7
      }
    })
    setNo(no + 1)
  }

  const minusStudent = () => {
    dispatch({
      type: 'minus'
    })
  }

  return (
    <div>
      <button onClick={addStudent}>加学生</button>
      <button onClick={minusStudent}>减学生</button>
      <div>
        <h2>{res.name} 班</h2>
        <p>
          班主任： {res.teacherName} - {res.teacherId}
        </p>

        <div>
          {res.students.map((item: Student) => {
            return (
              <div>
                <h4>学生：{item.name}</h4>
                <p>
                  编号： {item.sno}
                  <br />
                  年龄： {item.age} 岁
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const app = document.getElementById('app')
const root = createRoot(app!)
root.render(<App />)
```

但是可以使用 immer 库来帮助优化数据操作。immer 会监听函数里对属性的修改，然后重新创建对象。而且 immer 是依赖 Proxy 实现的。因此可以通过 immer 库对以上代码进行修改

```
import React, { useState, useCallback, Reducer, useReducer } from 'react@18';
import { createRoot } from 'react-dom@18/client';
import { produce } from "immer"




interface Student {
  name: string,
  sno: string,
  age: number
}

interface Data {
  name: string,
  teacherName: string,
  teacherId: string,
  students: Array<Student>
}

interface Action {
  type: 'add' | 'minus';
  student: Student;
}

const reducer = (state: Data, action: Action) => {
  switch (action.type) {
    case 'add':
      return produce(state, (state: Data) => {
        state.students.push(action.student)
      })
    case 'minus':
      return produce(state, (state: Data) => {
        state.students.pop()
      })
  }
}



const App = function () {

  const [res, dispatch] = useReducer<Reducer<Data>, boolean>(reducer, {
    name: '一年级二班',
    teacherId: '2145345342',
    teacherName: '英语老师',
    students: [
      {
        name: '学生A',
        sno: '2346688',
        age: 6
      },
      {
        name: '尖子生',
        sno: '2346638',
        age: 6
      }
    ]
  })

  const [no, setNo] = useState(1)

  const addStudent = () => {
    dispatch({
      type: 'add',
      student: {
        name: `学生${no}`,
        sno: `${5352423 + no}`,
        age: 7
      }
    })
    setNo(no + 1)
  }

  const minusStudent = () => {
    dispatch({
      type: 'minus'
    })
  }

  return <div>
    <button onClick={addStudent}>加学生</button>
    <button onClick={minusStudent}>减学生</button>
    <div>
      <h2>{res.name} 班</h2>
      <p>班主任： {res.teacherName} - {res.teacherId}</p>

      <div>
        {
          res.students.map((item: Student) => {
            return <div>
              <h4>学生：{item.name}</h4>
              <p>
                编号： {item.sno}<br />
                年龄： {item.age} 岁
              </p>
            </div>
          })
        }
      </div>
    </div>

  </div>;
};


const app = document.getElementById('app');
const root = createRoot(app!)
root.render(<App />);

```

### useRef

​	特点： 重渲染时不会重新创建

 获取 dom 元素时，可以使用 useRef 方法

```tsx
const App = () => {
  // 创建 ref ，用来绑定需要记录的 dom 元素
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  // 处理输入变化的函数
  const handleChange = event => {
    setValue(event.target.value)
  }

  useEffect(() => {
    // 获取焦点
    inputRef.current?.focus()
  })

  return (
    <div>
      <input ref={inputRef} type='text' value={value} onChange={handleChange} />
      <p>输入的内容是: {value}</p>
    </div>
  )
}
```

​	但是 useRef 也可以用于存储别的数据

```tsx
const ref = useRef<String>("hello world!");
ref.current = "你好"
```

