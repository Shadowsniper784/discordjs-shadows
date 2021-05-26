module.exports = {
	name: 'thigh', //the command name like s/name
	description: 'Thigh command',
	guildOnly: true,
	nsfw: true,
	execute: async ({ message, args, text, send, client, instance }) => {
		const Discord = require("discord.js");
const NSFW = require('../../handlers/nsfw');
const nsfw = new NSFW();

const nsfwimage = await nsfw.thigh();
		message.channel.send(nsfwimage);
	}
};