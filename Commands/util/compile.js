import chalk from 'chalk'
import { exec } from 'child_process'
import { EmbedBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, CommandInteraction, GuildChannel } from 'discord.js'
import { readFile, writeFile } from 'fs/promises'
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
            interaction.reply({ embeds: help() })
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
                .setStyle(TextInputStyle.Paragraph) 

            const row = new ActionRowBuilder().addComponents(input) 
            modal.setComponents(row)
            client.modals.set(modal.data.custom_id, _interaction => {
                console.log(_interaction.fields.getTextInputValue("eita"))
                _interaction.reply({ content: "certo" })
            })

            interaction.showModal(modal)
            // exec(`./godot.64 -s ${}`)
        }
    }

    async runForMessage(message, client, args=[]) {
        if (args?.[0]?.startsWith("script")) {
            args[0] = args[0].replace("script", "")

            let script = args
                .join(" ")
                .replaceAll("```", "")
                .replace("swift", "")
                .trim()

            let newFile = "segredo gigatônico"
            if (!(script.includes("extends") || script.includes("func _init():"))) {
                let file = await readFile("default-script.gd", "utf8")

                file = file.replace(":INSERIR:", script)

                newFile = await writeFile('temp-script.gd', file)

            } else {
                newFile = await writeFile('temp-script.gd', script)

            }

            if (newFile === "segredo gigatônico") return

            exec("chmod +x godot.64 && ./godot.64 -s temp-script.gd", (error, stdout, stderr) => {
                if (error) {
                    console.log(chalk.cyan(`error: ${error.message}`))
                    return 
                }
                const embed = new EmbedBuilder()
                    .setColor("#2596be")

                if (stderr) {
                    console.log(chalk.cyan(`stderr: ${stderr}`))

                    embed.setTitle("Erro no script")
                        .setDescription("```\n" + stderr + "```")
                        .setColor("#ff4444")

                    message.channel.send({ embeds: [embed] })
                    return 
                }

                console.log(chalk.cyan(`stdout: ${stdout}`))

                embed.setTitle("Saída do script")
                    .setDescription("```\n" + stdout + "```")

                message.channel.send({ embeds: [embed] })

            })
            return
        }

        message.channel.send({ embeds: [help()] })
    }

}
function help() {
    const scriptExample = "```swift\nextends SceneTree\n\nfunc _init():\n    print(\"godot é brabo\")\n    quit()```"
    const useExample = "\\```swift\nprint(algo)\n\\```\n"
    const embed = new EmbedBuilder()
        .setTitle("forma correta de uso")
        .setColor("#2596be")
        .setFields([
            {
                name: "Via texto",
                value: `escreva no campo assim:\n${useExample}\n depois envie-o pelo comando **g:compilar script <texto>**`
            },
            {
                name: "Via arquivo",
                value: `Crie um script com a seguinte estrutura:\n${scriptExample}\nDepois, salve-o como .gd e envie pelo comando */compilar \`arquivo:\`*`
            }
        ])

    return embed
}


export default Compile
