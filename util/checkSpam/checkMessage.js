import chalk from "chalk"
import addMessage from "./addMessage.js"


export default async function checkMessage({ content, id, createdTimestamp }, guildId, channelId) {
	const array = await addMessage(content, id, guildId, channelId, createdTimestamp)
	if (!array) return false
	console.log(chalk.yellow("contagem: ", array.length))
	if (array.length >= 3) {
		return array
	}
}