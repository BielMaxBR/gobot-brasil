import redis from "../../db/db.js"
import Constants from "../Constants.js"


export default async function addMessage(content, id, guildId, channelId, createdTimestamp) {
	const haveMessage = (await redis.json.get(Constants.MESSAGES))[content]
	const data = { id: id, guildId: guildId, channelId: channelId, timestamp: createdTimestamp }

	if (haveMessage === undefined) {
		// salva la
		redis.json.set(Constants.MESSAGES, `.${content}`, { messages: [data] })
		setTimeout(async () => {
			const postCheck = (await redis.json.get(Constants.MESSAGES))[content]
			if (postCheck) {
				console.log('sem spam nessa mensagem', content)
				redis.json.del(Constants.MESSAGES, `.${content}`)
			}
		}, 5000)
		return [data]
	}

	redis.json.arrAppend(Constants.MESSAGES, `.${content}.messages`, data)

	const returnArray = (await redis.json.get(Constants.MESSAGES))[content].messages

	return returnArray ? returnArray : [data]
}
