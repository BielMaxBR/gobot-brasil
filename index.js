import Client from "./classes/Client.js"
import dotenv from 'dotenv'
dotenv.config()

import { dirname } from 'dirname-filename-esm';
const __dirname = dirname(import.meta);

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

client.login(process.env.TOKEN)

client.loadCommands(__dirname + '/Commands')
client.loadEvents(__dirname + '/Events')

console.log("bot iniciado")