String.prototype.hashCode = function () {
    var hash = 0, i, chr 
    if (this.length === 0) return hash 
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i) 
        hash = ((hash << 5) - hash) + chr 
        hash |= 0  // Convert to 32bit integer
    }
    return hash 
} 

import { GatewayIntentBits } from "discord.js"
import Client from "./classes/Client.js"
import dotenv from 'dotenv'
import chalk from "chalk" 
import reloadCommands from './util/reloadCommands.js'
dotenv.config()

import { dirname } from "dirname-filename-esm"
const __dirname = dirname(import.meta)

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.login(process.env.TOKEN)

const loadedCommands = client.loadCommands('Commands', __dirname)
const loadedEvents = client.loadEvents('Events', __dirname)

Promise.all([loadedCommands, loadedEvents]).then(_ => {
    reloadCommands(client)

    client.on('ready', _ => {
        console.log(chalk.greenBright("bot iniciado"))
        client.user.setActivity(`comandos no /`, { type: "STREAMING" })
    })
})

export default client
