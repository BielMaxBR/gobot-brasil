import Command from '../../classes/Command.js';

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: ['pg'],
            description: "mostra o delay com o servidor do bot"
        })
    }

    async run(message, args) {
        const bot_message = await message.channel.send("Ping?");

        bot_message.edit(`Pong! A Latência é ${bot_message.createdTimestamp - message.createdTimestamp}ms.`);
    }
}

export default Ping