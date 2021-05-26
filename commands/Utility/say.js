module.exports = {
	name: 'say',
	description: 'Make the bot say something',
	args: true,
	expectedArgs: '<text>',
	execute ({ message, args, send }) {
	  send(message, args.join(' '))
	}
}