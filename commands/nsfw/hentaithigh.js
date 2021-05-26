module.exports = {
	name: 'hentaithigh', //the command name like s/name
	aliases: ['ht'],
	description: 'Hentai thigh command',
	guildOnly: true,
	nsfw: true,
	execute: async ({ message, args, text, send, client, instance }) => {
		const Discord = require("discord.js");
const NSFW = require('../../handlers/nsfw');
const nsfw = new NSFW();

const nsfwimage = await nsfw.hentaithigh();
		message.channel.send(nsfwimage);
	}
};