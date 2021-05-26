//Define all handlers 
const { Collection } = require('discord.js');
require('pretty-error').start();
const fs = require('fs');
const Discord = require('discord.js');
const commandArray = [];
const MongoDb = require('./handlers/mongo.js');
const timer = require('./handlers/timer.js')
const FeatureHandler = require('./handlers/event.js');
const Command = require('./handlers/command.js');
const messagesFile = require('./handlers/messages');
const ShadowCommands = require('./handlers/ShadowCommands.js');
const { SlashCommands } = require('./handlers/slashcommand.js');
class SHADOW {
  constructor(client, settings) {
    this.settings = settings
    this._client = client
    let { status, bot, botOwners, testServers, prefix, mongoSettings } = settings
    client.commands = new Collection();
client.cooldowns = new Discord.Collection();
let { commands } = client;
    let instance = {
  tokenVariable: 'TOKEN',
	status: status,
	bot: bot,
	botOwners: botOwners,
	testServers: testServers,
	prefix: prefix,
	commands: client.commands,
	help: {
		ownerOnlyCmds: new Collection(),
		commands: new Collection()
	},
	showWarns: settings.showWarns,
	ignoreBots: settings.ignoreBots,
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
	ShadowCommand: null,
	messages: null,
	timer: {
	  isEndTime: null,
	  start: null
	},
	dir: '/home/runner/discordjs-shadows-1'
};
    //Shadow Command Handler
var ShadowCommand = new ShadowCommands(client, instance);
instance.ShadowCommand = ShadowCommand;

//Messages handler
const messagesConstructor = new messagesFile(client, instance);
instance.messages = messagesConstructor;

//Command handler
this._Command = new Command(
	client,
	instance.dir,
	'commands',
	instance,
	messagesConstructor,
	registerCommand
);
instance.Commands = function get() {
	return this._Command;
};

//Slash commands handler
this._slashCommand = new SlashCommands(instance, client);
instance.slashCommands = function get() {
	return this._slashCommand;
};

//Functions
async function registerCommand(command, file, Instance) {
	if(Instance.showWarns && !command.name)
		console.log(`The command ${file} does not have a name`);
	const { expectedArgs, testOnly, description, minArgs } = command;
	const name = command.name || file.slice(0, -3);
	let options = [];
	command.name = name;
	client.commands.set(name, command);
	commandArray.push(name);
	if (command.slash && Instance.slash) instance.slashCommand.registerCommand(command);
	if (Instance.showWarns && !command.description)
		console.log(`${name} does not have a description!`);
	if (command.ownerOnly) {
		instance.help.ownerOnlyCmds.set(name, command);
	} else {
		instance.help.commands.set(name, command);
	}
};
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

//Mongo Db handler
const MongoDB = new MongoDb(process.env.MONGO, instance, mongoSettings);

//Timer handler
this._timerConstructor = new timer(instance)
instance.timer.isEndTime = (now) => {
  return this._timerConstructor.isEndTime(now)
}

//Event handling
const eventAmount = new FeatureHandler(
	client,
	instance,
	instance['featureDir']
);

client.once('ready', () => {
  let statusText = instance.status.statusText;
statusText = statusText.replace(/{COMMANDS}/gi, commandArray.length);
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
}); //Emmited when client is ready
client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'say') {
		await interaction.defer(true);
		await wait(4000);
		await interaction.editReply('test!');
	}
});


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



ShadowCommand.emit('start');
module.exports.instance = instance;
client.login(process.env[instance.tokenVariable]);
const app = require('./handlers/web.js')()
return instance
  }
}
module.exports = SHADOW