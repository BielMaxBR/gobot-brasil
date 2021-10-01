const Command = require('../../classes/Command.js')

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping"
        })
    }

    async run(message, args) {
        const bot_message = await message.channel.send("Ping?");

        bot_message.edit(`Pong! A Latência é ${bot_message.createdTimestamp - message.createdTimestamp}ms.`);
    } 
}

module.exports = Ping