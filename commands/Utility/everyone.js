module.exports = {
	name: 'everyone',
	description: 'Pings everyone',
	expectedArgs: '[text]',
	permissions: 'MENTION_EVERYONE',
	execute({ message, send, args }) {
	  send(message, `@everyone ${args.join(' ')}`)
	}
}