module.exports = {
  name: 'message',
  execute(message, client, instance) {
    if(message.channel.name !== 'ign' || message.author.bot) return//here it checks if the channel name is not ign or if the message author is a bot but if one of those is true it stops the rest of the script firing
    message.channel.send(`Registered as **${message.content}**`)
    message.delete()
    message.member.setNickname(message.content)
  }
}