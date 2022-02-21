import redis from "../../db/db.js"
import Constants from "../Constants.js"

export default async function addMessage(message) {
   const haveMessage = await redis.json.get(Constants.MESSAGES)
   if (haveMessage[message.content] === undefined) {
      // salva la
      const data = { id: message.id, timestamp: message.createdTimestamp }
      redis.json.set(Constants.MESSAGES, `.${message.content}`, {messages: [data]})
      return
   }
   
   const data = { id: message.id, timestamp: message.createdTimestamp }
   redis.json.arrAppend(Constants.MESSAGES, `.${message.content}.messages`, data)

   return (await redis.json.get(Constants.MESSAGES))[message.content].messages
}
