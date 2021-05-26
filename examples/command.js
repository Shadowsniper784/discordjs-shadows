module.exports = {
  name: '', //the command name like s/name 
  aliases: [],
  nsfw: false,
  ownerOnly: false,
  guildOnly: false, //if true it wont work in dms
  permissions: '', //permissions required
  disabled: false, //if command is disabled
  testOnly: false,
  slash: false,
  minArgs: 0,
  maxArgs: -1,
  args: false, //if true it requires the user to have arguments for command
  expectedArgs: '<required> [optional]', //can have as many as u like doesnt have to have both
  cooldown: ''
  execute({ message, args, text, send, client, instance }) {
    
  }
}