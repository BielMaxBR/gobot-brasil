import Command from '../../classes/Command.js'
import { SelectMenuBuilder, SelectMenuOptionBuilder, EmbedBuilder, ActionRowBuilder } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

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
                const field = new SelectMenuOptionBuilder()
                    .setLabel(command.help.name)
                    .setDescription(command.help.description)
                    .setValue(command.help.name)
                   
                fields.push(field)
            }

            const embedMsg = new EmbedBuilder()
                .setTitle("Comandos")
                .setColor("#2596be")

            const time = new Date().getTime()

            const row = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                    .setCustomId(time)
                    .setPlaceholder('Escolha um comando')
                    .addOptions(fields),
                );
            
            client.selectMenus.set(time, (_interaction) => {
                const command = client.getCommand(_interaction.values[0])
                
                const embedMsg = new EmbedBuilder()
                    .setTitle(command.help.name)
                    .setColor("#2596be")
                    .setDescription(command.help.description)
                
                _interaction.reply({ embeds: [embedMsg] })
            })
            
            interaction.reply({ embeds: [embedMsg], components: [row] })
            return
        }
        const command = client.getCommand(searchParam)

        if (command === null) {
            message.channel.send("comando não encontrado")
            return
        }

        const embedMsg = new EmbedBuilder()
            .setTitle(command.help.name)
            .setColor("#2596be")
            .setDescription(command.help.description)

        interaction.reply({ embeds: [embedMsg] })
    }
}

export default Help
