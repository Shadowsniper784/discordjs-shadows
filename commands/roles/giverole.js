module.exports = {
  name: 'giverole',
  description: 'Give a user a role',
  minArgs: 2,
  expectedArgs: "<Target user's @> <The role name>",
  permissions: 'MANAGE_ROLES',
  guildOnly: true,
  execute({ message, args }) {
    const targetUser = message.mentions.users.first()
    if (!targetUser) {
      message.reply('Please specify someone to give a role to.')
      return
    }

    args.shift()

    const roleName = args.join(' ')
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })
    if (!role) {
      message.reply(`There is no role with the name "${roleName}"`)
      return
    }
    if(message.member.roles.highest.comparePositionTo(role)){
      if(message.guild.me.roles.highest.comparePositionTo(role)){
    //member has higher role then first mentioned member
    const member = guild.members.cache.get(targetUser.id)
    member.roles.add(role)
    message.reply(`that user now has the "${roleName}" role`)
      } else {
       return message.reply(' I don\'t have a high enough role to give that role!')
      }
  } else {
    message.reply('Your unable to give that role')
  } 
  }
}