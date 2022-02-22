import redis from "../../db/db.js"
import Constants from "../Constants.js"

export default async function addMessage(content, id, createdTimestamp) {
   const haveMessage = (await redis.json.get(Constants.MESSAGES))[content]
   const data = { id: id, timestamp: createdTimestamp }

   if (haveMessage === undefined) {
      // salva la
      redis.json.set(Constants.MESSAGES, `.${content}`, { messages: [data] })
      return [data]
   }

   redis.json.arrAppend(Constants.MESSAGES, `.${content}.messages`, data)

   const returnArray = (await redis.json.get(Constants.MESSAGES))[content].messages
   
   return returnArray ? returnArray : [data]
}
