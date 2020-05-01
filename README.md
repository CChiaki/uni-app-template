# uni-app-templated

[项目地址](https://github.com/CChiaki/uni-app-template)

当时做这个的目的是为了解决如下问题：

- 1.云函数分散过后冷启动和热启动效率上的巨大差别
- 2.云函数环境变量的支持，大多数项目都会用到环境变量的配置
- - 由于web的启动是xhbuilder控制的，导致我无法把环境变量植入，需要xhbuilder团队支持。
- 3.云函数的打包压缩上传
- 4.本地云函数开发依赖关系，代码检测，如果又需要自己可以集成eslint做代码规范
- - 这块在webpack.config.js中自己可以去配置
- 4.web开发的时候本地数据mock的支持
- - 这一块写的比较搓，web端由于没有环境变量，我这边数据mock切换需要手动，在App.vue把ajaxMock/ajax 2个方法之间手动切换
- 5.统一封装的ajax方法，做到格式统一。
- 6.在web端App.vue直接封装ajax请求，做到页面只要调用处理正确的分之，异常等都统一捕获。

## 我也不知道接口这块设计的对不对，下面是我的思路。
- 由于入口函数只有一个函数，所有在函数里面要根据传入的变量去执行不通的方法。
- 拆解了原来它云公共函数的功能，我觉得打包云公共函数优点xx，而且你云函数打包的时候还是依赖于你本地的云共函数，只不过云公共函数发布可以同步已经依赖的云函数，我觉得有点没用。
- 我目前构造的是如下
``` 
uniCloud
	.callFunction({
		name: name,
		data: {
			type: type,
			form: data
		}
	})
	
	将原来传入的data放置到data的内容，form字段中，然后type 表示实际调用的方法，具体可以查阅App.vue，然后把返回结果统一的封装处理了下

	// 这块我还没想好要怎么去实现，目前就简易贴下这个。
	async function main(event) {
		let env = process.env.NODE_ENV
		if (!event.type) {
			return ajaxReturn('', -1, '参数传入不正确');
		}

		if (!dome[event.type]) {
			return ajaxReturn('', -1, '未找到云方法');
		}
		return await dome[event.type](event)
	}

	// 固定返回的main，这边无需修改，云函数入口只有唯一的一个。
	export {
		main
	}
```



## 具体功能开发参考文档地址

[uniapp官网](https://uniapp.dcloud.io/)

## 项目目录说明
>cloudfunctions-dev
> > main.js入口函数

> config
> > conf.dev.js  开发环境变量配置

> > conf.prod.js  打包环境变量配置

>mock
> > index.js 数据mock配置文件 具体实现可以参考[mocker-api](https://npm.im/mocker-api)
> 
>pages 常规开发页面

>static 常规静态资源目录

>.babelrc babel7 废弃。

>main.js ,manifest.json，uni.scss，pages.json 常规开发页面

>package.json 依赖配置

>template.h5.html 打包h5的时候用到的页面模版

>template.unicloud.html 调试开发模式云函数报错页面，需要在控制台查看（这块到时候完善在页面直接可以查看）

## 项目功能说明（使用命令）
### npm run dev
- 项目启动云函数本地调试模式，因为无法连接DB，所以这块一般用来做代码调试，依赖关系检测，配合eslint可以做到代码规范检测，变量使用情况，等。
- 运行命令后，web端同时开启数据mock模式， web里面开发直接可以请求到mock接口，如果不需要mock，App.vue对调下ajax/ajaxMock


### npm run build
- 云函数打包，目前在config.js就配置了1个index，如果需要支持多文件的话，手动配置
```
entry: {
		index: ['./cloudfunctions-dev/main.js']
		xxxx: ['./cloudfunctions-dev/xxxx.js']
	},
```
- 打包是product模式，代码回进行压缩，这块遵循webpack打包策略

## 项目版本管理

### v1.0.1
- 搭建初始化版本
- 待做内容
- - 1.云函数DB的数据模拟,把数据mock这块跟db的数据返回关联起来，模拟db后可以本地调用接口
- - 2.公共方法的拓展，吧一些token的调用，加解密等公共方法封装起来。

| 待做内容 | 预计版本 | 预计完成版本/时间 |
| :-----| ----: | :----: |
| 云函数DB的数据模拟 | v1.0.2| v1.0.3 |
| 云函数的本地调用 | v1.0.2 | v1.0.4 |
| 小程序服务端api封装 | v1.0.2 | v1.0.2 |