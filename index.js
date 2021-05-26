const config = require('./config.js')
const { Client } = require('discord.js')
const client = new Client()
const inst = require('./run')
const instance = new inst(client, {
  status: config.status,
  bot: config.bot,
  botOwners: config.botOwners,
  testServers: config.testServers, 
  prefix: config.prefix,
  mongoSettings: config.mongoSettings,
  showWarns: config.showWarns,
  ignoreBots: config.ignoreBots
})

const ShadowCommand = instance.ShadowCommand

//Events
ShadowCommand.on('ready', (ins, statusText, commandAmount, eventAmount) => {
	console.log(
		`Shadow Commands > Client is ready with a status of ${ins.status.statusType.toLowerCase()} ${statusText}, with ${commandAmount} command${
			commandAmount === 1 ? '' : 's'
		} and ${eventAmount} event${eventAmount === 1 ? '' : 's'}!`
	);
});
ShadowCommand.on('commandRun', message => {
	this._Command.runCommand(message);
}); //Emitted whenever a message starts with prefix
ShadowCommand.on('commandRunning', (message, command) => {
	console.log(`${message.author.tag} just executed ${command.name}`);
}); //Emmited when all the checks have been passed on a command, aka testOnly, etc
ShadowCommand.on('bump', (message) => {
  message.reply('Bump done! In two hours I will remind you!')
  const time = new Date()
  instance.timer.start = this._timerConstructor.start(time)
})
ShadowCommand.on('start', () => {
	console.log('Starting...');
}); //Emitted on start
ShadowCommand.on('databaseConnected', (connection, state) => {
	console.log(connection, state);
}); //Emitted when database connects
ShadowCommand.on('ign', message => {
	ShadowCommand.ign(message);
});
ShadowCommand.on('console', input => {
	console.log(`${input} was send through console!`);
	client.channels.cache
		.find(channel => channel.name.includes('📜general📜'))
		.send(`Message from Console: ${input}`);
}); //Emitted when user types into console
module.exports = instance