<script>
export default {
	globalData: {},
	methods: {
		ajaxMock(type = '', data = {}, name = 'index', method = 'POST') {
			return new Promise((resolve, reject) => {
				uni.request({
					url: 'http://localhost:9000' + name + '/' + type,
					method: method,
					data: data,
					success: res => {
						if (res.statusCode == 200) {
							if (res.data.code == 0) {
								resolve(res.data.data);
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								});
								reject(res);
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data
							});
							reject();
						}
					},
					fail: error => {
						uni.showToast({
							icon: 'none',
							title: '接口请求报错！'
						});
						reject();
					}
				});
			});
		},
		ajax(type = '', data = {}, name = 'index') {
			return new Promise((resolve, reject) => {
				uniCloud
					.callFunction({
						name: name,
						data: {
							type: type,
							form: data
						}
					})
					.then(res => {
						if (res.success) {
							if (res.result.code == 0) {
								resolve(res.result.data);
							} else {
								uni.showToast({
									icon: 'none',
									title: res.result.msg
								});
								reject(res.result);
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '接口请求报错！'
							});
							reject();
						}
					})
					.catch(error => {
						uni.showToast({
							icon: 'none',
							title: error.errMsg
						});
						reject();
					});
			});
		}
	},
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
</style>
