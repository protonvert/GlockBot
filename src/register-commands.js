require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType, ApplicationCommand } = require('discord.js')

const commands = [
  {
    name: 'play',
    description: 'plays a song from a youtube link',
    options: [
      {
        name: 'link',
        description: 'enter a youtube link',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  {
    name: 'leave',
    description: 'you really want me to leave bro??? i thought we was chillin doe 😎'
  }
]

const rest = new REST({ Version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('registering commands')

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    )
    console.log('slash commands were registered successfully')
  } catch (error) {
    console.log(error)
  }
})()
