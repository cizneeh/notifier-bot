const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
})

client.on('ready', () => {
  console.log(`Succesfully logged in as ${client.user.tag}`)
})

client.on('messageCreate', msg => {
  if (msg.content === 'hi') {
    msg.reply('Hello!')
  }
})

client.login(process.env.TOKEN)
