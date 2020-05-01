import dome from "./dome/index.js"
import {
	ajaxReturn
} from "./utils/index.js"

async function main(event) {
	//环境变量的使用
	//可以用来吧一些三方调用 额外的配置项目，用法等用于vue的环境变量配置
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
