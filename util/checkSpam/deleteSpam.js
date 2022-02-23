import redis from "../../db/db.js"
import Constants from "../Constants.js"

export default async function deleteSpam({ content, member }, array, guild) {
    console.log('spam encontrado')
    member.timeout(1000 * 60 * 60 * 24, Constants.TIMEOUT_TEXT)
        .then(_ => {
            member.send(Constants.TIMEOUT_WARNING)
        })
        .catch(console.error)


    for (const data of array) {

        const channel = guild.channels.cache.get(data.channelId)
        const message = channel.messages.cache.get(data.id)

        try {
            message.delete()
        } catch (err) { console.log(err) }
    }

    redis.json.del(Constants.MESSAGES, `.${content.hashCode()}`)
}