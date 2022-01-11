import Command from '../../classes/Command.js';
import { MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders';

class Help extends Command {
    constructor(client) {
        super(client, new SlashCommandBuilder()
        .setName("help")
        .setDescription("mostra como funcionam os comandos")
        .addStringOption(option => option.setName('comando').setDescription("fale um comando específico"))
        )
    }
    run(interaction, client) {
        const { options } = interaction
        const searchParam = options.getString('comando')
        if (!searchParam) {
            const commands = this.client.commands.toJSON()
            const fields = []

            for (const command of commands) {
                if (commands.indexOf(command) >= 10) break
                const field = {}

                field.name = command.help.name
                field.value = command.help.description
                fields.push(field)
            }

            const embedMsg = new MessageEmbed()
                .setTitle("Comandos")
                .setColor("#2596be")
                .addFields(fields)


            interaction.reply({ embeds: [embedMsg] })
            return
        }
        const command = client.getCommand(searchParam)

        if (command === null) {
            message.channel.send("comando não encontrado")
            return
        }

        const embedMsg = new MessageEmbed()
            .setTitle(command.help.name)
            .setColor("#2596be")
            .setDescription(command.help.description)

        interaction.reply({ embeds: [embedMsg] })
    }
}

export default Help