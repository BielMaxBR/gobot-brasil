import { MessageEmbed } from 'discord.js'
import Command from '../../classes/Command.js'
import fetch from 'node-fetch'


class Docs extends Command {
    constructor(client) {
        super(client, {
            name: "docs",
            aliases: ['dc']
        })
    }

    async run(message, args) {
        const search = args.join("+")
        const url = "https://docs.godotengine.org/_/api/v2/search/?"
        const query = `q=${search}&project=godot-pt-br&version=stable&language=pt_BR`

        const request = await fetch(url + query)
        const json = await request.json()
        const data = json.results[0]
        console.log(data)

        if (data === undefined) {
            message.channel.send("nada encontrado. veja se a sua ortografia está correta")
            return
        }


        let fields = []

        for (const blocks of data.blocks) {
            const field = {}

            field.name = blocks.title

            const contentArray = blocks.content.split(" ")
            field.value = contentArray.slice(0, 50).join(" ")
            field.value = field.value + (contentArray.length >= 50 ? "..." : "")

            fields.push(field)
        }

        const embedMsg = new MessageEmbed()
            .setTitle(data.title)
            .setColor("BLUE")
            .setThumbnail("https://docs.godotengine.org/en/stable/_static/docs_logo.png")
            .setURL(data.domain + data.path)
            .setFields(fields)
            .setFooter(`version: ${data.version} \n\Coletado direto da doc: https://docs.godotengine.org/`)

        message.channel.send({ embeds: [embedMsg] })
    }
}
export default Docs