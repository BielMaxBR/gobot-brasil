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
        
        const embed = new MessageEmbed()
        embed.setTitle(data.title)
        
        message.channel.send("coletado")
        message.channel.send(embed)
    }
}
export default Docs