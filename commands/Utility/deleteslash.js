const { getApp } = require('../../handlers/slashcommand.js');
async function deleteSlash(instance, commandId, guildId) {
    const app = instance.client.api.applications(instance.bot.id);
    if (guildId) {
      app.guilds(guildId);
    }

    return await app.commands(commandId).delete();
  }
module.exports = {
	name: 'deleteslash',
	description: 'Deletes a slash commands',
	ownerOnly: true,
	execute: async ({ message, args, client, instance }) => {
		const { Collection } = require('discord.js');
		const slashcmds = new Collection();
		const slash = await getApp(client, message.guild.id).commands()
		let slashcmd;
		if (isNaN(args[0])) {
			slash.forEach(pushcmds);
			function pushcmds(item) {
				const { id, name, description } = item;
				slashcmds.set(name, id);
			}
			slashcmd = slashcmds.find(
				slash => slash.name.toLowerCase() === args[0].toLowerCase()
			);
		} else {
			slashcmd = await getApp(client, message.guild.id).commands(slashcmd).delete()
		}
		if (!slashcmd) return message.reply('Thats not a slash command!');
		if (deleteSlash(client, slashcmd, instance)) {
			message.reply('Done');
		}
	}
};
