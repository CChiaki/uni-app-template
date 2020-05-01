const proxy = {
	'GET /index/getUserList': {
		"code": "0",
		"message": null,
		"data": []
	},
	'GET /index/getUserById/:id': {
		"code": "0",
		"message": null,
		"data": {}
	},
	'POST /index/addUserOne': (req, res) => {
		const data = req.body
		return {
			"code": "0",
			"message": null,
			"data": {}
		}
	}
}
module.exports = proxy
