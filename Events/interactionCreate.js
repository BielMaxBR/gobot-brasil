import { ChatInputCommandInteraction, ModalSubmitInteraction, SelectMenuInteraction } from "discord.js"

export default class InteractionCreate {
    constructor(client) {
        this.client = client
    }

    async run(interaction) {
        // console.log(interaction.constructor, ChatInputCommandInteraction, interaction.constructor == ChatInputCommandInteraction)
        switch (interaction.constructor) {
            case ChatInputCommandInteraction:
                try {
                    const name = interaction.commandName
                    const client = interaction.client
                    const command = client.commands.get(name)
                    command.run(interaction, client)
                } catch (err) {
                    console.log(err)
                }

                break
            case SelectMenuInteraction:
                try {
                    const id = interaction.customId
                    const client = interaction.client
                    const func = client.selectMenus.get(id)

                    func(interaction)
                    
                    client.selectMenus.delete(id)
                } catch (err) {
                    console.log(err)
                }
                break
            case ModalSubmitInteraction:
                try {
                    const id = interaction.customId
                    const client = interaction.client
                    const func = client.modals.get(id)
                    func(interaction)
                    
                    client.modals.delete(id)
                } catch (err) {
                    console.log(err)
                }
                break

        }
    }

}
