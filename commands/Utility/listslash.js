const { getApp } = require('../../handlers/slashcommand.js');
module.exports = {
	name: 'listslash',
	description: 'Lists the slash commands',
	ownerOnly: true,
	guildOnly: true,
	execute: async ({ message, args, client }) => {
	  const guildId = message.guild.id
	  	const slashCmds = await getApp(client).commands.get()
	  	let list = []
	  	let { MessageEmbed } = require('discord.js')
	  	const embed = new MessageEmbed()
	  	embed.setColor('00ff00')
	  	embed.setTitle('Slash commands in this server')
	  	slashCmds.forEach(pushcmds)
	  	function pushcmds(item) {
	  	  const { id, name, description } = item
	  	  embed.addField(name, description + '\n' + id)
	  	}
	  	message.channel.send(embed)
	}
}