const { EventEmitter } = require('events')
class ShadowCommands extends EventEmitter {
  /**
     * Create a point.
     * @param {object} client - 'discord.js' Client
     * @param {object} options - The options for it
     */
	constructor(client, options) {
		super();
		this.client = client;
		this.options = options;
	}
	ign(message) {
	    	  message.delete()
		message.channel.send(`${message.author.tag} registered as ${message.content}`)
  	message.member.setNickname(message.content)
	}
	getPrefix() {
	  return '*'
	}
	slashCommands() {yy
    return this.options.slashCommands
  }
	fetch(val) {
		return this.options[val];
	}
}
module.exports = ShadowCommands