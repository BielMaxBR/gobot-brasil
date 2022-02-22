import { MessageEmbed } from 'discord.js';
import dotenv from 'dotenv'
import checkMessage from '../util/checkSpam/checkMessage.js'

dotenv.config()

class Message {
    constructor(client) {
        this.client = client
    }

    async run(message) {
        if (message.author.bot) return
        const isSpam = await checkMessage(message)
    }
}

export default Message