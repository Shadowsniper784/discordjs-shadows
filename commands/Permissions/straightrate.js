const options = [
  {
  name: 'user',
  description: 'A user',
  type: 6,
  required: false
}
]

module.exports = {
  name: 'straightrate',
  slash: 'both',
  testOnly: true,
  description: 'Straight rate of a user',
  expectedArgs: '[user]',
  options: options,
  callback: ({ message, args, interaction }) => {
    console.log(instance)
    function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
    let rate = getRandomNumberBetween(1, 100)
    if(message) {
       const user = message.mentions.users.first() || message.author
    if(user.username.toLowerCase().includes('ghostblast')) rate = 99.99999
    message.channel.send(`<@${user.id}> is ${rate}% straight!`)
} else {
    const [user] = args
  const userId = user || interaction.member.user.id
  if(userId === '519938123115921420') rate = 99.99999

  return `<@${userId}> is ${rate}% straight!`
}
  }
}