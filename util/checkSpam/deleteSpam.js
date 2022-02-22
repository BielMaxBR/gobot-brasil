import redis from "../../db/db.js"
import Constants from "../Constants.js"

export default async function deleteSpam(content, array, guild) {
    console.log('spam encontrado')

    for (const data of array) {
        const channel = guild.channels.cache.get(data.channelId)
        const message = channel.messages.cache.get(data.id)
        message.delete()
    }

    redis.json.del(Constants.MESSAGES, `.${content}`)
}