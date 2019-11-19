# client

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report

# 注意

1. 小程序里所有的 BOM／DOM 都不能用，也就是说 v-html 指令不能用
2. {{}}无法支持复杂的 JavaScript 表达式
3. wxml 不支持过滤器
4. 不支持在组件上使用 Class 与 Style 绑定
5. 不支持在组件引用时，在组件上定义 click 等原生事件、v-show（可用 v-if 代替）和 class style 等样式属性
6.


