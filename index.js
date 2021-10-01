const Client = require("./classes/Client.js")
require('dotenv').config()

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

client.login(process.env.TOKEN)

client.loadCommands(__dirname + '/Commands')
client.loadEvents(__dirname + '/Events')

console.log("bot iniciado")