module.exports = (client, instance) => {
	client.on('message', message => {
		if (instance.logMessages.status === true) {
			var log = instance.logMessages.message;
			log = log.replace(/{MESSAGE}/gi, message.content);
			log = log.replace(/{CHANNEL}/gi, message.channel.name);
			log = log.replace(/{GUILD}/gi, message.guild.name);
			log = log.replace(/{AUTHOR}/gi, message.author.username);
			console.log(log);
		}
		const now = new Date();
		if(message.content.startsWith('!d bump') && instance.timer.isEndTime(now)) {
		  instance.ShadowCommand.emit('bump', message)
		} else if(instance.timer.isEndTime(now)) {
//		  message.channel.send('BUMP IS READY!')
		}
		if (message.channel.name === 'ign' && !message.author.bot)
			instance.ShadowCommand.emit('ign', message);
		if (!message.content.startsWith(instance.prefix)) return;
		if (instance.ignoreBots && message.author.bot) return;
		instance.ShadowCommand.emit('commandRun', message);
	});
};