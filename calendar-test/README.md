# 搭建日历组件（mini版）
这个版本的日历组件需要通过 ` JavaScript ` 内置的 ` Date ` 对象来处理一下日期相关的信息，因此需要了解相关用法，具体可见[前置操作](##前置操作)。

## 前置操作

### 初始化创建 Date 对象

可以使用四种方式来==创建== ` Date ` 对象值：

* 获取当前时间

```js
// 当参数为空时，默认以当前日期时间创建 Date 对象
const date = new Date();
```

* 通过时间戳（整数形）创建 ` Date ` 对象

```js
// milliseconds 参数是一个 Unix 时间戳。以毫秒为单位，从 1970.01.01 开始计算
const milliseconds = 1720599553218; // 表示时间为 2024.07.10 16:19:13.218
const date = new Date(milliseconds);
```

* 通过制定日期（字符串形式）创建 ` Date ` 对象

```js
// 传入的 dateString 参数字符串必须符合日期格式，例如以下的格式均符合条件
let dateString = "2024.07.10 16:22:10.245"
dateString = "2024.07.10 16:22"
dateString = "2024.07.10"
dateString = "2024.07"
dateString = "2024"
dateString = "2024-07-10 16:22:10"
dateString = "2024/07/10 16:22:10"
dateString = "2024/07"
// dateString = "2024/07/10 16" 不符合日期格式，报错
const date = new Date(dateString);
```

* 通过制定日期（多参数）创建 ` Date ` 对象

```js
// 初始化创建 Date 对象时，可以一次性传入 7 个参数。当然也可以按顺序传入部分类型参数即可。
const year = 2024; // 年
const month = 07; // 月
const day = 10; // 日
const hours = 16; // 时
const minutes = 37; // 分
const seconds = 8; // 秒
const milliseconds = 12; // 毫秒  
const date1 = new Date(year, month, day, hours, minutes, seconds, milliseconds);
const date2 = new Date(year, month, day, hours, minutes, seconds);
const date3 = new Date(year, month, day, hours, minutes);
const date4 = new Date(year, month, day, hours);
const date5 = new Date(year, month);
```

> 以上方法中，通过字符串日期形式和多参数形式创建的 ` Date ` 对象可以不是完整的日期时间，在这种情况下 ` Date ` 对象会自动补足默认值：
>
> * 月份：默认为 0，即 1 月；
> * 日期：默认为 1，即每月第一天；
> * 小时：默认为 0，即午夜；
> * 分钟：默认为 0；
> * 秒数：默认为 0；
> * 毫秒数：默认为 0。

### 通过 Date 对象获取基础日期时间

* 通过  ` Date ` 对象获取==年份==
```js
// 使用 getFullYear 方法
const date = new Date();
date.getFullYear(); // 2024
```

* 通过  ` Date ` 对象获取==月份==（0 ～ 11）
```js
// 使用 getMonth 方法，0 表示 1月，以此类推到 11 表示 12 月
const date = new Date();
date.getMonth(); // 6
```

* 通过  ` Date ` 对象获取==一个月中的某一天==（1 ～ 31）

```js
// 使用 getDate 方法
const date = new Date('2024.07.10');
date.getDate(); // 31
```

* 通过  ` Date ` 对象获取==小时==（0 ～ 23）
```js
// 使用 getHours 方法
const date = new Date();
date.getHours(); // 17
```

* 通过  ` Date ` 对象获取==分钟==（0 ～ 59）
```js
// 使用 getMinutes 方法
const date = new Date();
date.getMinutes(); // 3
```

* 通过  ` Date ` 对象获取==秒数==（0 ～ 59）
```js
// 使用 getSeconds 方法
const date = new Date();
date.getSeconds(); // 36
```

* 通过  ` Date ` 对象获取==毫秒数==（0 ～ 999）
```js
// 使用 getMilliseconds 方法
const date = new Date();
date.getMilliseconds(); // 427
```

* 通过  ` Date ` 对象获取==一周中的某一天==（0 ～ 6）
```js
// 使用 getDay 方法，从 星期天 开始 到星期六计算
const date = new Date();
date.getDay(); // 3
```

* 通过  ` Date ` 对象获取==时间戳==（自 1970.01.01 至今的毫秒数）
```js
// 使用 getTime 方法
const date = new Date();
date.getTime(); // 1720602216427
```

### 修改 Date 对象的日期时间

* 修改==年份==
```js
// 使用 setFullYear 方法修改年份
const date = new Date('2016.02.26 9:40:20.453');
date.setFullYear(2025); // 将时间修改为 2025.02.26 9:40:20.453
```

* 修改==月份==（0 ～ 11）
```js
// 使用 setMonth 方法修改月份
const date = new Date('2016.02.26 9:40:20.453');
date.setMonth(8); // 将时间修改为 2016.09.26 9:40:20.453
```

* 修改==日期==（0 ～ 31）
```js
// 使用 setDate 方法修改日期
const date = new Date('2016.02.26 9:40:20.453');
date.setDate(8); // 将时间修改为 2016.02.8 9:40:20.453
```

* 修改==小时==（0 ～ 23）
```js
// 使用 setHour 方法修改小时
const date = new Date('2016.02.26 9:40:20.453');
date.setHour(8); // 将时间修改为 2016.02.26 8:40:20.453
```

* 修改==分钟==（0 ～ 59）
```js
// 使用 setMinutes 方法修改分钟
const date = new Date('2016.02.26 9:40:20.453');
date.setMinutes(8); // 将时间修改为 2016.02.26 9:8:20.453
```

* 修改==秒数==（0 ～ 59）
```js
// 使用 setSeconds 方法修改秒数
const date = new Date('2016.02.26 9:40:20.453');
date.setSeconds(8); // 将时间修改为 2016.02.26 9:40:8.453
```

* 修改==毫秒数==（0 ～ 59）
```js
// 使用 setMilliseconds 方法修改毫秒数
const date = new Date('2016.02.26 9:40:20.453');
date.setMilliseconds(8); // 将时间修改为 2016.02.26 9:40:20.8
```

### 通过 Date 对象处理时间

时间格式有很多种，不同地区使用的时间格式不一样，例如：GMT（格林尼治标准时间）、UTC（协调世界时）、CST（中国的标准时间）等。而我们一般使用通过 ` new Date ` 创建的时间格式一般是 CST（中国的标准时间）。

```js
const date = new Date('2016.02.26 9:40:20.453');
// Fri Feb 26 2016 09:40:20 GMT+0800 (中国标准时间)
console.log(date);
// 等同于 console.log(date.toString())

// 输出时间部分
// 09:40:20 GMT+0800 (中国标准时间)
console.log(date.toTimeString())
```

而 ` Date ` 对象也提供了一些方法帮助我们根据不同时间格式进行处理。

* 根据本地时间格式，获取日期
```js
// 使用 toLocaleDateString 方法获取日期
const date = new Date(2017, 10, 23);
date.toLocaleDateString(); // 2017/11/23
```

* 根据本地时间格式，获取时间
```js
// 使用 toLocaleTimeString 方法获取时间
const date = new Date(2017, 10, 23);
date.toLocaleTimeString(); // 00:00:00
```

* 根据本地时间格式，获取完整日期时间
```js
// 使用 toLocaleString 方法获取完整日期时间
const date = new Date(2017, 10, 23);
date.toLocaleString(); // 2017/11/23 00:00:00
```

* 根据 UTC（协调世界时），获取完整时间日期
```js
// 使用 toUTCString 方法获取 UTC（协调世界时）格式的完整日期时间
const date = new Date(2017, 10, 23);
date.toUTCString(); // Wed, 22 Nov 2017 16:00:00 GMT
```

* 根据 ISOS 格式的日期时间
```js
// 使用 toISOString 方法获取 ISOS 标准的完整日期时间
const date = new Date(2017, 10, 23);
date.toISOString(); // 2017-11-22T16:00:00.000Z
```

## 一、 演示（了解日历组件要求）

本组件主要以实现日历功能为主，所以界面会比较简略，有需要可以自行优化样式。下图为组件演示图：

![日历组件功能演示](https://gitee.com/roada/drawingBed/raw/main/blog/calendar-view.gif)

首先作为一个日历组件，我们需要展示当前月份的所有日期，并按照 星期天 到 星期六 进行以此进行排列。由于月初和月末的日期并不一定是当周的开始和结束（星期天开始，星期六结束），因此需要填充上/下个月日期或空白格来进行布局。而本组件使用上/下月日期进行填充，因此当月和非当月的日期要进行区别显示。

![image-20240712105948681](https://gitee.com/roada/drawingBed/raw/main/blog/image-20240712105948681.png)

其次，日历组件还需要能搞显示出当前的年月日信息。日期可以用选中状态进行显示，年份、月份则显示在日历头部。

![image-20240712110037207](https://gitee.com/roada/drawingBed/raw/main/blog/image-20240712110037207.png)

除此之外，日历头部需要按钮，可用于切换年份和月份

![image-20240712110327395](https://gitee.com/roada/drawingBed/raw/main/blog/image-20240712110327395.png)

最后最主要的是日历组件还需要能够设置日期和获取日期信息。设置日期有三种方式：

1. 通过选中日历显示的日期，进行设置；
2. 通过日历头部切换年份和月份的按钮设置日期为指定年、月份的第一天；
3. 提供组件 api，允许在外部通过使用传参方式进行设置。

每次设置日期时，都会返回对应日期信息。并且也可以通过组件 api 形式，主动获取当前日期信息。

## 二、 搭建基础界面框架

日历的主体主要分为两大部分，一部分是日历头部，另一部分则是日历信息了。日历头部只需要通过 ` flex ` 布局就能轻松解决，那日历信息部分
