import { Client, Message } from "discord.js"
import redis from "../../db/db.js"
import Constants from "../Constants.js"

export default async function checkMessage(message, client) {
   const haveMessage = await redis.json.get(Constants.MESSAGES)
   console.log("recebido: ", haveMessage[message.content])
   if (haveMessage[message.content] === undefined) {
      // salva la
      const data = { id: message.id, timestamp: message.createdTimestamp }
      console.log("criando: ", data)
      redis.json.set(Constants.MESSAGES, `.${message.content}`, {messages: [data]})
      return
   }
   
   const data = { id: message.id, timestamp: message.createdTimestamp }
   redis.json.arrAppend(Constants.MESSAGES, `.${message.content}.messages`, data)
}
