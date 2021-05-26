module.exports = {
	name: 'porn', //the command name like s/name
	description: 'Porn command',
	guildOnly: true,
	nsfw: true,
	execute: async ({ message, args, text, send, client, instance }) => {
		const Discord = require("discord.js");
const NSFW = require('../../handlers/nsfw');
const nsfw = new NSFW();

const hentai = await nsfw.pgif();
		message.channel.send(hentai);
	}
};