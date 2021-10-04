import Command from '../../classes/Command.js';
import { MessageEmbed } from 'discord.js'

class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ['hp'],
            description: "mostra como funcionam os comandos",
            requireArgs: true
        })
    }

    run(message, args) {
        const searchParam = args.join(" ").toLowerCase()

        const command = this.client.getCommand(searchParam)
        
        if (command === undefined) {
            message.channel.send("comando não encontrado")
            return
        }

        const embedMsg = new MessageEmbed()
            .setTitle(command.help.name)
            .setColor("#2596be")
            .setDescription(command.help.description)
            .addField("aliases",command.config.aliases.join(", "))
            

        message.channel.send({ embeds: [embedMsg] })
    }
}

export default Help