module.exports = {
  name: 'suggest',
  cooldown: '60',
  expectedArgs: 'command',
  description: 'Suggest a command',
  callback: ({ message, args, text, instance, client }) => {
    if(text.length <= 1) return message.reply('Please supply a longer command!')
    const owner = client.users.cache.get('659742263399940147')
    owner.send(`${message.author.tag} has suggested you add the command ${text}!`)
    mesage.reply('Your command was suggested!')
  }
}