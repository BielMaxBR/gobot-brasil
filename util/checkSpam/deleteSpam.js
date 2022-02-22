import redis from "../../db/db.js"
import Constants from "../Constants.js"

export default async function deleteSpam({ content, member }, array, guild) {
    console.log('spam encontrado')
    try { 
        member.timeout(1000 * 60 * 60 * 24, `suspeita de spam`)
        member.send("você foi mutado na Godot Brasil por suspeita de spam. \n\ncaso tenha sido um engano, contate a administração")
    } catch (err) { console.log(err) }

    for (const data of array) {

        const channel = guild.channels.cache.get(data.channelId)
        const message = channel.messages.cache.get(data.id)

        try {
            message.delete()
        } catch (err) { console.log(err) }
    }

    redis.json.del(Constants.MESSAGES, `.${content.hashCode()}`)
}