import Command from '../../classes/Command.js';
import { MessageEmbed } from 'discord.js'

class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ['hp'],
            description: "mostra como funcionam os comandos",
            usage: "g!help <comando> || g!help",
            requireArgs: false
        })
    }

    run(message, args) {
        if (args.length == 0) {
            const commands = this.client.commands.values()
            const fields = []

            for (const command of commands) {
                const field = {}

                field.name = command.help.name
                field.value = `aliases: ${command.config.aliases.join(", ")}\n\Modo de usar : ${command.help.usage}\n${command.help.description}`
                fields.push(field)
            }

            const embedMsg = new MessageEmbed()
                .setTitle("Comandos")
                .setColor("#2596be")
                .addFields(fields)


            message.channel.send({ embeds: [embedMsg] })
            return
        }
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
            .addField("Aliases", command.config.aliases.join(", "))
            .addField("Modo de usar", `${command.help.usage}`)

        message.channel.send({ embeds: [embedMsg] })
    }
}

export default Help