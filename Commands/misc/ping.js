import { SlashCommandBuilder } from '@discordjs/builders'
import Command from '../../classes/Command.js'

class Ping extends Command {
    constructor(client) {
        super(client, new SlashCommandBuilder()
            .setName("ping")
            .setDescription("mostra o delay com o servidor do bot")
        )
    }
    async run(interaction, client) {
        const bot_message = await interaction.reply({ content: 'Ping?', fetchReply: true })
            
        interaction.editReply(`Pong! A Latência é ${bot_message.createdTimestamp - interaction.createdTimestamp}ms.`)
    }
}

export default Ping