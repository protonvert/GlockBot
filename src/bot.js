require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js')
const { joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice')
const { NoSubscriberBehavior } = require('@discordjs/voice')

let connection

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates
  ]
})

client.on('ready', (c) => {
  console.log(`${c.user.username} is vooted up`)
})

const player = createAudioPlayer(
  // {
  //   behaviors: {
  //     noSubscriber: NoSubscriberBehavior.Stop
  //   }
  // }
)

function joinVC () {
  client.channels.fetch(process.env.VOICE_CHANNEL_ID)
    .then((channel) => {
      // eslint-disable-next-line no-var
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
      })
    })
}

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return

  if (interaction.commandName === 'play') {
    try {
      joinVC()
      const link = interaction.options.get('link').value
      interaction.reply('playing')
    } catch (error) {
      interaction.reply('could not play')
      console.log(error)
    }
  }
  if (interaction.commandName === 'leave') {
    interaction.reply('im out dis hoe ✌🏿')
    connection.destroy()
  }
})

client.login(process.env.BOT_TOKEN)
