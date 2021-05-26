const { Collection } = require('discord.js');
require('pretty-error').start();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Collection();
client.cooldowns = new Discord.Collection();
let { commands } = client;
const commandArray = [];
let instance = {
	status: {
		statusText: '*help || {COMMANDS} commands!',
		statusType: 'WATCHING',
		status: ''
	},
	bot: {
		id: '768081423801647164'
	},
	botOwners: ['659742263399940147', '519938123115921420'],
	testServers: ['843120300248793088', '834524481233879071'],
	prefix: '*' || 's/',
	commands: client.commands,
	help: {
		ownerOnlyCmds: new Collection(),
		commands: new Collection()
	},
	showWarns: true,
	ignoreBots: true,
	logMessages: {
		status: false,
		message: '{GUILD}:{CHANNEL}\n{AUTHOR}:{MESSAGE}',
		consoleMessages: true
	},
	slash: true,
	client: client,
	slashCommands: 'slash',
	Commands: 'ShadowCommands',
	featuresDir: 'features',
	ShadowCommand: 'j',
	messages: null,
	timer: {
	  isEndTime: null,
	  start: null
	},
	dir: '/home/runner/discordjs-shadows'
};
const registerCommand = async (command, file, Instance) => {
	if(Instance.showWarns && !command.name)
		console.log(`The command ${file} does not have a name`);
	const { expectedArgs, testOnly, description, minArgs } = command;
	const name = command.name || file.slice(0, -3);
	let options = [];
	command.name = name;
	client.commands.set(name, command);
	commandArray.push(name);
	if (command.slash && Instance.slash) this._slashCommand.registerCommand(command);
	if (Instance.showWarns && !command.description)
		console.log(`${name} does not have a description!`);
	if (command.ownerOnly) {
		instance.help.ownerOnlyCmds.set(name, command);
	} else {
		instance.help.commands.set(name, command);
	}
};
client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'say') {
		await interaction.defer(true);
		await wait(4000);
		await interaction.editReply('test!');
	}
});
const ShadowCommands = require('./handlers/ShadowCommands.js');
const Command = require('./handlers/command.js');
const messagesFile = require('./handlers/messages');
const { SlashCommands } = require('./handlers/slashcommand.js');
this._slashCommand = new SlashCommands(instance, client);
instance.slashCommands = function get() {
	return this._slashCommand;
};
const messagesConstructor = new messagesFile(client, instance);
instance.messages = messagesConstructor;
this._Command = new Command(
	client,
	'home/runner/discordjs-shadows',
	'commands',
	instance,
	messagesConstructor,
	registerCommand
);
var ShadowCommand = new ShadowCommands(client, instance);
instance.ShadowCommand = ShadowCommand;
const MongoDb = require('./handlers/mongo.js');
instance.Commands = function get() {
	return this._Command;
};
const timer = require('./handlers/timer.js')
this._timerConstructor = new timer(instance)
const dbOptions = {
	// These 4 are the default options
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};
const MongoDB = new MongoDb(process.env.MONGO, instance, dbOptions);
const FeatureHandler = require('./handlers/event.js');
const eventAmount = new FeatureHandler(
	client,
	instance,
	instance['featureDir']
);

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
instance.timer.isEndTime = (now) => {
  return this._timerConstructor.isEndTime(now)
}
ShadowCommand.on('start', () => {
	console.log('Starting...');
}); //Emitted on start
ShadowCommand.on('databaseConnected', (connection, state) => {
	console.log(connection, state);
}); //Emitted when database connects
ShadowCommand.on('ign', message => {
	ShadowCommand.ign(message);
});


async function create(client, name, description, options, guildId) {
	const app = client.api.applications(instance.bot.id);
	if (guildId) {
		app.guilds(guildId);
	}

	return await app.commands.post({
		data: {
			name,
			description,
			options
		}
	});
}
//Console messages
if (instance.logMessages.consoleMessages) {
	var readline = require('readline');

	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on('line', input => {
		ShadowCommand.emit('console', input);
	});
}
ShadowCommand.on('console', input => {
	console.log(`${input} was send through console!`);
	client.channels.cache
		.find(channel => channel.name.includes('📜general📜'))
		.send(`Message from Console: ${input}`);
}); //Emitted when user types into console


//Status Changing Message
let statusText = instance.status.statusText;
statusText = statusText.replace(/{COMMANDS}/gi, commandArray.length);

client.once('ready', () => {
	ShadowCommand.emit(
		'ready',
		instance,
		statusText,
		commandArray.length,
		eventAmount
	);
	//set status
	client.user
		.setPresence({
			activity: {
				name: `${statusText}`,
				type: `${instance.status.statusType}`
			},
			status: 'idle'
		})
		.then(status => console.log())
		.catch(console.error);
});
const app = require('express')();
const server = require('http').Server(app);
app.get('/', (req, res) => {
	res.send('Hello World!');
});
//let port = 3000;

app.listen();
//() => {
//console.log(
//		`24/7 app listening at https://discordjs-shadow.shadowsniper784.repl.co/`
//	);
//})
ShadowCommand.emit('start');
module.exports.instance = instance;
client.login(process.env.token);
