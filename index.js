import Client from "./classes/Client.js"
import dotenv from 'dotenv'
dotenv.config()

import { dirname } from "dirname-filename-esm"
const __dirname = dirname(import.meta)

const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
})

client.login(process.env.TOKEN)

client.loadCommands('Commands', __dirname)
client.loadEvents('Events', __dirname)

client.on('ready', _ => {
    console.log("bot iniciado")
    client.user.setActivity(`meu prefixo é ${process.env.PREFIX}` , { type: "WATCHING" })
})
