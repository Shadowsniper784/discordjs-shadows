module.exports = {
	name: 'hentai', //the command name like s/name
	description: 'Hentai',
	guildOnly: true,
	nsfw: true,
	execute: async ({ message, args, text, send, client, instance }) => {
		const Discord = require('discord.js');
		const NSFW = require('../../handlers/nsfw');
		const nsfw = new NSFW();

		const hentai = await nsfw.hentai();
		message.channel.send(hentai);
	}
};
