module.exports = {
  name: 'message',
  execute(message, client, instance ) {
    if(instance.logMessages.status) {
      var log = instance.logMessages.message
      log = log.replace(/{MESSAGE}/gi, message.content)
      log = log.replace(/{CHANNEL}/gi, message.channel.name)
      log = log.replace(/{GUILD}/gi, message.guild.name)
      log = log.replace(/{AUTHOR}/gi, message.author.username)
      console.log(log)
    }
  }
}