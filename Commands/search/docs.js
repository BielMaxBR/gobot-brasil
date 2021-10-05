import { MessageEmbed } from 'discord.js'
import Command from '../../classes/Command.js'
import fetch from 'node-fetch'


class Docs extends Command {
    constructor(client) {
        super(client, {
            name: "docs",
            aliases: ['dc'],
            description: 'pesquisa na documentação atual pt-br da godot',
            usage: "g!docs <argumento>",
            requireArgs: true,
            defaultMessage: "Documentação atual da godot engine:\n\nhttps://docs.godotengine.org/pt_BR/stable/index.html"
        })
    }

    async run(message, args) {
        const search = args.join("+")
        const url = "https://docs.godotengine.org/_/api/v2/search/?"
        const query = `q=${search}&project=godot-pt-br&version=stable&language=pt_BR`

        const request = await fetch(url + query)
        const json = await request.json()
        const data = json.results[0]

        if (data === undefined) {
            message.channel.send("nada encontrado. veja se a sua ortografia está correta")
            return
        }


        let fields = []

        for (const block of data.blocks) {
            if (block.content.length == 0) continue

            const field = {}

            field.name = block.title

            const contentArray = block.content.split(" ")
            field.value = contentArray.slice(0, 50).join(" ")
            field.value = field.value + (contentArray.length >= 50 ? "..." : "")

            fields.push(field)
        }

        const embedMsg = new MessageEmbed()
            .setTitle(data.title)
            .setColor("#2596be")
            .setThumbnail("https://docs.godotengine.org/en/stable/_static/docs_logo.png")
            .setURL(data.domain + data.path)
            .setFields(fields)
            .setFooter(`version: ${data.version} \n\Coletado direto da doc: https://docs.godotengine.org/`)

        message.channel.send({ embeds: [embedMsg] })
    }
}
export default Docs