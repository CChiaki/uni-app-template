import {
	ajaxReturn
} from "../utils/index.js"

const db = uniCloud.database()

async function getUserList(event) {
	const userData = await db.collection('t_user').get();
	return ajaxReturn(userData.data)
}

async function getUserById(event) {
	const userData = await db.collection('t_user').doc(event.form.id).get();
	return ajaxReturn(userData.data)
}


export default {
	getUserList,
	getUserById
}
