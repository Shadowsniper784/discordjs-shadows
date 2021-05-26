module.exports = {
	name: 'test',
	description: 'Runs test',
	ownerOnly: true,
	callback: ({ message, args, client, text, instance }) => {
	  console.log(instance)
	  message.reply('testing... check console"')
	}
}