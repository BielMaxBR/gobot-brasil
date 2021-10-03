import Command from '../../classes/Command.js'
import fetch from 'node-fetch'


class Docs extends Command {
    constructor(client) {
        super(client, {
            name: "docs",
            aliases: ['dc']
        })
    }

    run(message, args) {
        message.channel.send("a")
    }
}
export default Docs