module.exports = {
//	name: 'invite',
	description: 'Generates a invite link',
	expectedArgs: '[text]',
	permissions: 'CREATE_INVITE',
	execute({ message, send, args }) {
	  const channel = message.mentions.channels.first() || message.channel
	  channel.createInvite({
	    maxAge: 0})
  .then(invite => message.channel.send(`Created an invite with a link of https://discord.gg/${invite.code}`))
  .catch(console.error);
	}
}