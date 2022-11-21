import { exec } from 'child_process'
import { EmbedBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } from 'discord.js'
import Command from '../../classes/Command.js'

class Compile extends Command {
    constructor(client) {
        super(client, new SlashCommandBuilder()
            .setName('compilar')
            .setDescription("roda o script inserido")
            .addStringOption(option => option.setName('script').setDescription('adiciona um script em texto'))
            .addAttachmentOption(option => option.setName('arquivo').setDescription("adiciona um arquivo .gd"))
        )
    }

    run(interaction, client) {
        if (interaction.options.data.length == 0) {
            help(interaction)
            return
        }
        let script = interaction.options.getString("script")
        if (script) {
            // script = script.split("```swift")[1].replace("```","")
            const modal = new ModalBuilder()
                .setCustomId("aa")
                .setTitle("dentro do gobot")
            const input = new TextInputBuilder()
                .setCustomId("eita")
                .setLabel("me digam")
                .setStyle(TextInputStyle.Paragraph);

            const row = new ActionRowBuilder().addComponents(input);
            modal.setComponents(row)
            client.modals.set(modal.data.custom_id, _interaction => {
                console.log(_interaction.fields.getTextInputValue("eita"))
                _interaction.reply({ content: "certo" })
            })

            interaction.showModal(modal)
            // exec(`./godot.64 -s ${}`)
        }
    }

    help(interaction) {
        const scriptExample = "```swift\nextends SceneTree\n\nfunc _init():\n    print(\"godot é brabo\")\n    quit()```"
        const useExample = "\\```swift\nprint(algo)\n\\```\n"
        const embed = new EmbedBuilder()
            .setTitle("forma correta de uso")
            .setColor("#2596be")
            .setFields([
                {
                    name: "Via texto",
                    value: `escreva no campo assim:\n${useExample}`
                },
                {
                    name: "Via arquivo",
                    value: `Crie um script com a seguinte estrutura:\n${scriptExample}\nDepois, salve-o como .gd e envie pelo comando */compilar \`arquivo:\`*`
                }
            ])

        interaction.reply({ embeds: [embed] })
    }
}


export default Compile
