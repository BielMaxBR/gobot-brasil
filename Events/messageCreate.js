import { MessageEmbed } from 'discord.js';
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

        if (args.length == 0) {
            console.log(cmd.config.defaultMessage == "" || cmd.config.requireArgs)
            if (cmd.config.defaultMessage == "" || cmd.config.requireArgs) {
                const embedMsg = new MessageEmbed()
                    .setTitle("Modo de usar")
                    .setColor("#2596be")
                    .setDescription(`${cmd.help.usage}`)

                message.channel.send({ embeds: [embedMsg] })
                return
                
            } else if(cmd.config.defaultMessage.length > 0){
                message.channel.send(cmd.config.defaultMessage)
                return
            }
        }

        try {
            cmd.run(message, args);
        } catch (err) {
            console.error(err)
        }
    }
}

export default Message