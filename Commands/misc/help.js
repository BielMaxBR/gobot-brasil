import Command from '../../classes/Command.js'
import { MessageEmbed } from 'discord.js'
import { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } from '@discordjs/builders'

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
                field.description = command.help.description
                field.value = command.help.name
                fields.push(field)
            }

            const embedMsg = new MessageEmbed()
                .setTitle("Comandos")
                .setColor("#2596be")

            const row = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions(fields),
                );

            interaction.reply({ embeds: [embedMsg], addComponents: [row] })
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
