const send = (content, message) => {
	message.channel.send(content);
};

module.exports = class Command {
	constructor(client, dir, commandFolder, instance, messagesConstructor, registerCommand) {
		this.client = client;
		this.dir = dir;
		this.instance = instance;
		this.messages = messagesConstructor
		const fs = require('fs');
		const commandFolders = fs.readdirSync(`/${dir}/${commandFolder}`);
		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`/${dir}/${commandFolder}/${folder}`)
				.filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(`/${dir}/${commandFolder}/${folder}/${file}`);
				registerCommand(command, file, instance);
			}
		}
	}
	runCommand(message) {
		const { prefix, client, testServers, botOwners } = this.instance;
		const instance = this.instance
		const args = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				cmd => cmd.aliases && cmd.aliases.includes(commandName)
			);

		if (!command) return;
		const {
			disabled,
			ownerOnly,
			testOnly,
			guildOnly,
			permissions,
			minArgs,
			maxArgs, nsfw
		} = command;
		const messages = (value, command, message, variable) => {
		  this.messages.getMessages(value, command, message, variable)
		  }
		//Cooldowns
		const cooldowns = (command, message, client) => {
			let canuse = true;
			const { cooldowns } = client;
			const { Collection } = require('discord.js');
			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Collection());
			}

			const now = Date.now();
			const timestamps = cooldowns.get(command.name);
			const cooldownAmount = (command.cooldown || 3) * 1000;

			if (timestamps.has(message.author.id)) {
				const expirationTime =
					timestamps.get(message.author.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					canuse = false;
					return messages(
						'COMMAND_COOLDOWN',
						command,
						message,
						timeLeft.toFixed(1)
					);
				}
			}

			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
			return canuse;
		};
		if (disabled) return messages('COMMAND_DISABLED', command, message);
		if (ownerOnly && botOwners.includes(message.author.id) === false)
			return messages('COMMAND_OWNER_ONLY', command, message);
		if ((testOnly) && (message.channel.type === 'dm' ||	testServers.includes(message.guild.id) === false)) return messages('COMMAND_TEST_ONLY', command, message);
		if (guildOnly && message.channel.type === 'dm') return messages('COMMAND_GUILD_ONLY', command, message);
if (permissions) {
  const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(permissions)) {
				return messages('COMMAND_PERMISSIONS', command, message);
			}
		}
		if (
			(minArgs !== undefined && args.length < minArgs) ||
			(maxArgs !== undefined && maxArgs !== -1 && args.length > maxArgs) ||
			(command.args && !args.length)
		)	return messages('COMMAND_ARGS', command, message);
		if(nsfw && !message.channel.nsfw) return messages('COMMAND_NSFW', command, message)
		try {
			const text = args.join(' ');
			instance.ShadowCommand.emit('commandRunning', message, command)
			const names = command.callback || command.execute;
			names({ message, args, text, send, client, instance });
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	}
};
