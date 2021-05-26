module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	expectedArgs: '[command name]',
	cooldown: 5,
	execute({ message, args, instance }) {
		const { prefix } = instance;
		const data = [];
		var commandList = instance.botOwners.includes(message.author.id) ? instance.commands : instance.help.commands
		const commands = commandList
		if (!args.length) {
			data.push("Here's a list of all my commands:");
			data.push(instance.categories)
			data.push(commandList.map(command => command.name).join(', '));
			data.push(
				`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
			);

			return message.channel
				.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
				})
				.catch(error => {
					console.error(
						`Could not send help DM to ${message.author.tag}.\n`,
						error
					);
					message.reply('it seems like a error occurre!');
				});
		}

		const name = args[0].toLowerCase();
		const command =
			commands.get(name) ||
			commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply("that's not a valid command!");
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases)
			data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description)
			data.push(`**Description:** ${command.description}`);
		if (command.expectedArgs)
			data.push(`**Usage:** ${prefix}${command.name} ${command.expectedArgs}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	}
};
