# cga
通用脚手架，可自己配置项目template,也可以设置本地模板库.<br />
支持vue2/3,react,react native,nextjs等<br />
后续预计支持uniapp,微信小程序<br />

## Usage
#### 安装

```
npm i @arsize/cga -g #全局安装
cga create
```
```
npm i @arsize/cga --save-dev #项目安装
npx cga create
```

#### 方式一
```
cga create
? 请选择需要的项目模板 (Use arrow keys)
> vue
  react
  angular
  flutter
  react native
  nextjs
```
```
? 请选择需要的项目模板 vue 
? 选择版本 vue2
? 是否需要自定义功能？ custom
? 选择模块 (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) Babel
 ( ) Router
 ( ) TypeScript
```
#### 方式二
```
cga init http://xxxxxxx/file.zip #通过远程zip包初始化项目
```
#### 方式三(本地管理)
```
PS C:\Users\testproj> cga ls                        
Template List(Local):
(1) [vue2_default]: http://arsizes.com/template/zip/vue2_default.zip
    Describe：vue2+vue-cli4;default项目
```
```
PS C:\Users\code\testproj> cga add
? 请输入模板名字 vue
? 请输入模板地址 D:\cache\vue.zip
? 请输入模板描述 this is a vue project
```
```
cga use vue
```
#### 其他
```
cga rm vue // remove vue template
cga clean //remove all local template
```