import Constants from "../util/Constants.js"

class MessageUpdate {
    constructor(client) {
        this.client = client
    }

    async run(oldMessage, newMessage) {
        if (oldMessage.author.bot) return
        // coletar comando por texto
        if (!newMessage.content.startsWith(Constants.PREFIX)) return

        const args = newMessage.content.slice(Constants.PREFIX.length).trim().split(' ')
        const commandName = args.shift().toLowerCase()
        const command = this.client.commands.get(commandName)
        if (!command) return

        command.runForMessage(newMessage, this.client, args)
    }
}

export default MessageUpdate