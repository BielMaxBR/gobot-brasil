import dotenv from 'dotenv'
import checkMessage from '../util/checkSpam/checkMessage.js'
import deleteSpam from '../util/checkSpam/deleteSpam.js'

dotenv.config()

class Message {
    constructor(client) {
        this.client = client
    }

    async run(message) {
        if (message.author.bot) return
        const isSpam = await checkMessage(message, message.guild.id, message.channel.id)
        if (isSpam) deleteSpam(message.content, isSpam, message.guild)
    }
}

export default Message