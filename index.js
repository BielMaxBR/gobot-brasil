import Client from "./classes/Client.js"
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
})

client.login(process.env.TOKEN)

client.loadCommands('Commands', true)
client.loadEvents('Events', true)

client.on('ready', _ => {
    console.log("bot iniciado")
    client.user.setActivity(`meu prefixo é ${process.env.PREFIX}` , { type: "WATCHING" })
})
