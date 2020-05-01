var crypto = require('crypto');

const db = uniCloud.database()
const dbCmd = db.command

const md5 = (str, encoding = 'utf8') => crypto.createHash('md5').update(str, encoding).digest('hex');
const sha256 = (str, key, encoding = 'utf8') => crypto.createHmac('sha256', key).update(str, encoding).digest('hex');

const getFullDate = () => {
	const str = new Date();
	let YYYY = str.getFullYear();
	let MM = ('00' + (str.getMonth() + 1)).substr(-2);
	let DD = ('00' + str.getDate()).substr(-2);
	return YYYY + MM + DD;
};

const toQueryString = (obj) => Object.keys(obj)
	.filter(key => key !== 'sign' && obj[key] !== void 0 && obj[key] !== '')
	.sort()
	.map(key => key + '=' + obj[key])
	.join('&');

const generate = (length = 16) => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let noceStr = '',
		maxPos = chars.length;
	while (length--) noceStr += chars[Math.random() * maxPos | 0];
	return noceStr;
};

// 简易版Object转XML，不支持嵌套
const buildXML = (obj, rootName = 'xml') => {
	let content = Object.keys(obj).map((item) => {
		return `<${item}>${obj[item]}</${item}>`
	})
	return `<${rootName}>${content.join('')}</${rootName}>`
};

// 简易版XML转Object，不支持嵌套
const parseXML = (xml) => {
	let xmlReg = /<xml.*?>([\s|\S]*)<\/xml>/
	let str = xmlReg.exec(xml)[1]
	let obj = {}
	const nodeReg = /<(.*?)>(?:\<\!\[CDATA\[){0,1}(.*?)(\]\]\>){0,1}<\/.*?>/g
	let matches = null
	while (matches = nodeReg.exec(str)) {
		obj[matches[1]] = matches[2]
	}
	return obj
};

/*
ajaxReturn 构造器，
构造统一的ajax返回格式。
{code:0,msg:'',data:""},配个项目的callFunction 返回，在app.vue 连有统一的ajax调用封装。
*/
const ajaxReturn = function(data,
	status = 0,
	msg = "接口请求成功") {
	let obj = {
		code: 0,
		msg: '',
		data: null
	};
	
	if (status === 0) {
		return Object.assign(obj, {
			code: status,
			msg: msg,
			data: data
		})
	} else {
		return Object.assign(obj, {
			code: -1,
			msg: msg,
			data: data
		})
	}
}
const ailyunDBMock=function(){
	
}

module.exports = {
	md5,
	sha256,
	getFullDate,
	toQueryString,
	generate,
	buildXML,
	parseXML,
	ajaxReturn
}
