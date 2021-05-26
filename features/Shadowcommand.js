module.exports = (client, instance) => {
  const ShadowCommand = instance.ShadowCommand

//Events
ShadowCommand.on('ready', (ins, statusText, commandAmount, eventAmount) => {
	console.log(
		`Shadow Commands > Client is ready with a status of ${ins.status.statusType.toLowerCase()} ${statusText}, with ${commandAmount} command${
			commandAmount === 1 ? '' : 's'
		} and ${eventAmount._instance.amount} event${eventAmount._instance.amount === 1 ? '' : 's'}!`
	)
})

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

}
