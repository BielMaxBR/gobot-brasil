import chalk from "chalk"
import redis from "../../db/db.js"
import Constants from "../Constants.js"

export default async function deleteSpam({ content, member }, guild) {
    console.log(chalk.red('spam encontrado'))
    member.timeout(1000 * 60 * 60 * 24, Constants.TIMEOUT_TEXT)
        .then(async _ => {
            member.send(Constants.TIMEOUT_WARNING)
            deleteMessages(content, guild)
        })
        .catch(error => {
            console.error(error)
            deleteMessages(content, guild)
        })

}

async function deleteMessages(content, guild) {
    const array = (await redis.json.get(Constants.MESSAGES))[content.hashCode()].messages
    for (const data of array) {
        const channel = guild.channels.cache.get(data.channelId)
        const message = channel.messages.cache.get(data.id)

        message.delete()
            .catch(console.error) 
    }
    redis.json.del(Constants.MESSAGES, `.${content.hashCode()}`)
    console.log(chalk.green("spam deletado"))
}