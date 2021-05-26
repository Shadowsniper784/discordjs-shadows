module.exports = {
	name: 'nick',
	description: 'Nickname member',
	minArgs: 1,
	expectedArgs: '<user> [text]',
	permissions: 'MANAGE_NICKNAMES',
	//args: true,
	execute({ message, send, args }) {
	  const user = message.mentions.users.first() || message.author
	  const member = message.guild.members.cache.get(user.id)
	  args.shift()
	  member.setNickname(args.join(' ') || user.username)
	  send(message, 'done')
	}
}