import dotenv from 'dotenv'
dotenv.config()

class Message {
    constructor(client) {
        this.client = client
    }

    run(message) {
        if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return;

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(process.env.PREFIX.length);
        const cmd = this.client.getCommand(command)
        if (!cmd) return;

        if(cmd.config.requireArgs && args.length == 0) {
            message.channel.send("Esse comando requer argumentos")
            return
        }

        try {
            cmd.run(message, args);
        } catch (err) {
            console.error(err)
        }
    }
}

export default Message