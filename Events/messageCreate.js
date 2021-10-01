require('dotenv').config()

class Message {
    constructor(client) {
        this.client = client
    }

    run(message) {
        if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return;

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(process.env.PREFIX.length);
        const cmd = this.client.commands.get(command)

        if (!cmd) return;
        cmd.run(message, args);
    }
}

module.exports = Message