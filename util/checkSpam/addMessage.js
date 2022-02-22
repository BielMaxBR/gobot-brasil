import redis from "../../db/db.js"
import Constants from "../Constants.js"


export default async function addMessage(content, id, guildId, channelId, createdTimestamp) {
	const haveMessage = (await redis.json.get(Constants.MESSAGES))[content.hashCode()]
	const data = { id: id, guildId: guildId, channelId: channelId, timestamp: createdTimestamp }

	if (haveMessage === undefined) {
		// salva la
		redis.json.set(Constants.MESSAGES, `.${content.hashCode()}`, { messages: [data] })
		const timer = setTimeout(async () => {
			const postCheck = (await redis.json.get(Constants.MESSAGES))[content.hashCode()]
			if (postCheck) {
				console.log('sem spam nessa mensagem', content)
				redis.json.del(Constants.MESSAGES, `.${content.hashCode()}`)
			}
		}, 5000)
		return [data]
	}

	redis.json.arrAppend(Constants.MESSAGES, `.${content.hashCode()}.messages`, data)

	const returnArray = (await redis.json.get(Constants.MESSAGES))[content.hashCode()].messages

	return returnArray ? returnArray : [data]
}
