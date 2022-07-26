import { SlashCommandBuilder } from 'discord.js'
import Command from '../../classes/Command.js'

class FirstSteps extends Command {
    constructor(client) {
        super(client, new SlashCommandBuilder()
            .setName('primeirospassos')
            .setDescription("mostra por onde todo iniciante deve começar")
        )
    }

    run(interaction, client) {
        interaction.reply("é perigoso ir sozinho, pegue isso aqui \n \nhttps://docs.godotengine.org/pt_BR/stable/getting_started/step_by_step/index.html")
    }
}


export default FirstSteps
