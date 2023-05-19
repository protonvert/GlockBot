require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
})

client.on('ready', (c) => {
  console.log(`${c.user.username} is vooted up`)
})

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return

  if (interaction.commandName === 'play') {
    try {
      // join voice channel / form connection
      const link = interaction.options.get('link').value
      interaction.reply('playing')
    } catch (error) {
      interaction.reply('could not play')
    }
  }
})

client.login(process.env.BOT_TOKEN)
