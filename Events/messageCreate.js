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
        if (message.content.toLowerCase() == "vasco") message.reply("DEVOLVA")
        if (message.content.toLowerCase() == "diz pra ele bot") message.reply("PELO AMOR DE DEUS, LEIA A DOCUMENTAÇÃO!!!")
        const isSpam = await checkMessage(message, message.guild.id, message.channel.id)
        if (isSpam) deleteSpam(message, message.guild)
    }
}

export default Message
