class messages {
  constructor(client, prefix, instance) {
    this.client = client
    this.prefix = prefix
  }
	getMessages(value, command, message, variable) {

		if (value === 'COMMAND_COOLDOWN') {
			return message.reply(
				`please wait ${variable} more second(s) before reusing the \`${
					command.name
				}\` command.`
			);
		}
		if (value === 'COMMAND_DISABLED') {
			return message.reply(`the command: ${command.name} is disabled!`);
		}
		if (value === 'COMMAND_OWNER_ONLY') {
			return message.reply(
				`the command: ${command.name} is only available to the owner(s)!`
			);
		}
		if (value === 'COMMAND_TEST_ONLY') {
			return message.reply(
				`the command: ${command.name} is only available in the test servers!`
			);
		}
		if (value === 'COMMAND_GUILD_ONLY') {
			return message.reply(
				`the command: ${command.name} is only available in a server, not a DM!`
			);
		}
		if (value === 'COMMAND_PERMISSIONS') {
			return message.reply(
				`you can not do ${command.name}! You must have ${command.permissions}!`
			);
		}
		if (value === 'COMMAND_ARGS') {
			var reply = `you didn't provide the correct arguments!`;
			if (command.expectedArgs)
				reply += `\nThe proper usage would be: \`${this.prefix}${
					command.name
				} ${command.expectedArgs}\``;
			return message.reply(reply);
		}
		if (value === 'COMMAND_NSFW') {
			return message.reply(
				`the command: ${command.name} can only be run in a NSFW channel!`
			);
		}
	}
}
module.exports = messages;
