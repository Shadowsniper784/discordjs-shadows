const {
	APIMessage,
	APIMessageContentResolvable,
	Channel,
	Client,
	Guild,
	GuildMember,
	MessageEmbed
} = require('discord.js');
module.exports.SlashCommands = class SlashCommands {
	constructor(instance, client) {
		this._instance = instance;
		this.client = client;
			this.client.ws.on('INTERACTION_CREATE', async interaction => {
				console.log(interaction);
				const { member, data, guild_id, channel_id } = interaction;
				const { name, options } = data;

				const command = name.toLowerCase();
				const guild = this.client.guilds.cache.get(guild_id);
				const args = getArrayFromOptions(guild, options);
				const channel = guild.channels.cache.get(channel_id);
				invokeCommand(
					interaction,
					command,
					args,
					member,
					guild,
					channel,
					instance
				);
			});
		}
	async registerCommand(command) {
		const { expectedArgs, minArgs, testOnly, name, description } = command;
		const instance = this._instance
		const client = this.client
		let options = [];
		if (expectedArgs) {
			const split = expectedArgs
				.substring(1, expectedArgs.length - 1)
				.split(/[>\]] [<\[]/);

			for (let a = 0; a < split.length; ++a) {
				const item = split[a];
				console.log(item);
				options.push({
					name: item.replace(/ /g, '-'),
					description: item,
					type: 3,
					required: a < minArgs
				});
			}
		}
		if (command.options) options = command.options;
		if (testOnly) {
			const id = instance.testServers[1];
			await create(client, name, description, options, id);
		} else {
			await create(client, name, description, options);
		}
	}
};
const botId = '768081423801647164';

async function createAPIMessage(interaction, content, client) {
	const { data, files } = await APIMessage.create(
		client.channels.resolve(interaction.channel_id),
		content
	)
		.resolveData()
		.resolveFiles();

	return { ...data, files };
}
async function getApp(client, guildId) {
	const app = await client.api.applications(instance.bot.id);
	if (guildId) {
		app.guilds(guildId);
	}
	return app;
}
async function list(client, guildId) {
	let app = get(client, guildId);
	return await app.commands.get();
}
const deleteSlash = async (commandId, guildId, client) => {
	let app = getApp(client, guildId);

	return await app.commands(commandId).delete();
};
async function create(client, name, description, options, guildId) {
const app = client.api.applications('768081423801647164')
    if (guildId) {
      app.guilds(guildId)
    }

    return await app.commands.post({
      data: {
        name,
        description,
        options,
      },
    })
  }
function getMemberIfExists(value, guild) {
	if (
		value &&
		typeof value === 'string' &&
		value.startsWith('<@!') &&
		value.endsWith('>')
	) {
		value = value.substring(3, value.length - 1);

		if (guild) value = guild.members.cache.get(value);
	}

	return value;
}
function getObjectFromOptions(guild, options) {
	const args = {};
	if (!options) {
		return args;
	}

	for (const { name, value } of options) {
		args[name] = getMemberIfExists(value, guild);
	}

	return args;
}
function getArrayFromOptions(guild, options) {
	const args = [];
	if (!options) {
		return args;
	}

	for (const { value } of options) {
		args.push(getMemberIfExists(value, guild));
	}

	return args;
}
async function invokeCommand(
	interaction,
	commandName,
	options,
	member,
	guild,
	channel,
	instance
) {
	const client = instance.client;
	const command = client.commands.get(commandName);
	const names = command.callback || command.execute;
	if (!command || !names) {
		return false;
	}
	let result = await names({
		member,
		guild,
		channel,
		args: options,
		text: options.join ? options.join(' ') : '',
		client,
		instance,
		interaction
	});

	if (!result) {
		console.error(
			`Shadow Commands > Command "${commandName}" did not return any content from it's callback function. This is required as it is a slash command.`
		);
		return false;
	}

	let data = {
		content: result
	};

	// Handle embeds
	if (typeof result === 'object') {
		const embed = new MessageEmbed(result);
		data = await createAPIMessage(interaction, embed, client);
	}

	client.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: 4,
			data
		}
	});

	return true;
}

module.exports.getApp = async (client, guildId) => {
	const app = await client.api.applications(botId);
	if (guildId) {
		app.guilds(guildId);
	}
	return app;
};
module.exports.run = (client, interaction, instance) => {
	const { member, data, guild_id, channel_id } = interaction;
	const { name, options } = data;

	const command = name.toLowerCase();
	const guild = client.guilds.cache.get(guild_id);
	const args = getArrayFromOptions(guild, options);
	const channel = guild.channels.cache.get(channel_id);
	invokeCommand(interaction, command, args, member, guild, channel, instance);
};

module.exports.create = async (client, name, description, guildId) => {
	create(name, description, guildId, client);
};
