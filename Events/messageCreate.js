import dotenv from 'dotenv'
import checkMessage from '../util/checkSpam/checkMessage.js'
import deleteSpam from '../util/checkSpam/deleteSpam.js'
import Constants from "../util/Constants.js"
dotenv.config()

class MessageCreate {
    constructor(client) {
        this.client = client
    }

    async run(message) {
        if (message.author.bot) return
        // só brincadeiras
        if (message.content.toLowerCase() == "vasco") message.reply("DEVOLVA")
        if (message.content.toLowerCase() == "diz pra ele bot") message.reply("PELO AMOR DE DEUS, LEIA A DOCUMENTAÇÃO!!!")

        // ASS - anti spam system
        const isSpam = await checkMessage(message, message.guild.id, message.channel.id)
        if (isSpam) {
            deleteSpam(message, message.guild)
            return
        }

        // coletar comando por texto
        if (!message.content.startsWith(Constants.PREFIX)) return

        const args = message.content.slice(Constants.PREFIX.length).trim().split(' ')
        const commandName = args.shift().toLowerCase()
        const command = this.client.commands.get(commandName)
        if (!command) return

        command.runForMessage(message, this.client, args)
    }
}

export default MessageCreate
