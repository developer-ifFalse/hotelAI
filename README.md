## 目录说明
```
|-cloudfunctions-aliyun	云函数目录
|-cloudfunctions-dev	云函数开发目录
	|-src	云函数源码目录
		|-api	云函数目录，下面每个目录对应一个云函数
		|-utils	云函数公用目录，被多个云函数引用的js文件
```	

## 项目默认开启 easycom，无需单独引用组件

- [地址](https://uniapp.dcloud.io/collocation/pages?id=easycom)


## 先进入开发目录 npm install
 ## node build-api.js
 ## 进入 main.js  进行配置（自己的云空间）
 ## 进入 cloudfunctions-dev/src/utils/constants.js  进行配置（基础参数）

## 登录，注册，短信登录（阿里云短信服务），微信登录

###### 自助办理入住流程
###### 0、图形验证 1、当前用户手机号验证  2、身份验证  3、分配