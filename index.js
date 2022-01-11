import Client from "./classes/Client.js"
import dotenv from 'dotenv'
import reloadCommands from './util/reloadCommands.js'
dotenv.config()

import { dirname } from "dirname-filename-esm"
const __dirname = dirname(import.meta)

const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
})

client.login(process.env.TOKEN)

const loadedCommands = client.loadCommands('Commands', __dirname)
const loadedEvents = client.loadEvents('Events', __dirname)

Promise.all([loadedCommands, loadedEvents]).then(_ => {
    reloadCommands(client)
    
    client.on('ready', _ => {
        console.log("bot iniciado")
        client.user.setActivity(`comandos no /` , { type: "STREAMING" })
    })
})
