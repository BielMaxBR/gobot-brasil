import chalk from 'chalk'
import { exec } from 'child_process'
import { get } from "https"
import { EmbedBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, CommandInteraction, GuildChannel, ChatInputCommandInteraction, TextChannel } from 'discord.js'
import { readFile, writeFile } from 'fs/promises'
import { createWriteStream } from "fs"
import Command from '../../classes/Command.js'

class Compile extends Command {
    constructor(client) {
        super(client, new SlashCommandBuilder()
            .setName('compilar')
            .setDescription("roda o script inserido")
            .addSubcommand(subcommand => subcommand
                .setName('arquivo')
                .setDescription("compila um script em arquivo")
                .addAttachmentOption(option => option
                    .setName('file')
                    .setRequired(true)
                    .setDescription("adiciona um arquivo .gd")))
            .addSubcommand(subcommand => subcommand
                .setName('texto')
                .setDescription('compila um script em texto'))
        )
    }

    run(interaction, client) {
        if (interaction.options.data.length == 0) {
            interaction.reply({ embeds: help() })
            return
        }
        switch (interaction.options.getSubcommand()) {
            case "texto":
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
                    const data = _interaction.fields.getTextInputValue("eita")
                    runGDScript(_interaction, true, data)
                })

                interaction.showModal(modal)
                break
            case "arquivo":
                const attach = interaction.options.getAttachment("file")
                if (!attach.name.endsWith(".gd")) {
                    interaction.reply("só aceito arquivos que terminem com ,gd")
                    return
                }

                const file = createWriteStream("temp-script.gd")
                // requisição http
                get(attach.url, response => {
                    response.pipe(file);
                    file.on("finish", () => {
                        file.close()
                        runGDScript(interaction, true)
                    })
                })
        }
        // script = script.split("```swift")[1].replace("```","")
        // exec(`./godot.64 -s ${}`)

    }

    async runForMessage(message, client, args = []) {
        if (args?.[0]?.startsWith("script")) {
            args[0] = args[0].replace("script", "")

            let script = args
                .join(" ")
                .replaceAll("```", "")
                .replace("swift", "")
                .trim()
            runGDScript(message.channel, false, script)
            return
        }

        message.channel.send({ embeds: [help()] })
    }

}

async function runGDScript(channel, isInteraction = false, script = "") {
    if (script != "") {
        let newFile = "segredo gigatônico"
        let file = script
        if (!(script.includes("extends") || script.includes("func _init():"))) {
            file = await readFile("default-script.gd", "utf8")
            file = file.replace(":INSERIR:", script)
        }

        newFile = await writeFile('temp-script.gd', file)
    }

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

            if (isInteraction) channel.reply({ embeds: [embed] })
            else channel.send({ embeds: [embed] })
            return
        }

        console.log(chalk.cyan(`stdout: ${stdout}`))

        embed.setTitle("Saída do script")
            .setDescription("```\n" + stdout + "```")

        if (isInteraction) channel.reply({ embeds: [embed] })
        else channel.send({ embeds: [embed] })

    })
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
