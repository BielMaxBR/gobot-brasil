import addMessage from "./addMessage.js"


export default async function checkMessage({ content, id, createdTimestamp }, guildId, channelId) {
	const array = await addMessage(content, id, guildId, channelId, createdTimestamp)
	if (!array) return false
	console.log("contagem: ", array.length)
	if (array.length >= 3) {
		return array
	}
}