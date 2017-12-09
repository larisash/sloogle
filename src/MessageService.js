let messages = []

for(let i = 0; i < 100; i++){
	messages.push({
		subject: `Subject ${i}`,
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti fugiat hic impedit incidunt sapiente soluta totam voluptatibus. Ex iste molestiae quam! Aspernatur deleniti dolorem exercitationem, incidunt ipsam natus sed vitae?',
		picture: '/statics/boy-avatar.png',
		read: i < 90 ? true : false,
		from: `user${i}@sloggle.com`
	})
}


let getMessages = () => {
	return Promise.resolve(messages)
}

let sendMessage = (to, subject, content) => {

}

export default {
	getMessages
}