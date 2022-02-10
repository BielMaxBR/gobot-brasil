import redis from "../../db/db.js"
import Constants from "../Constants.js"

export default async function checkMessage(message, client) {
   console.log(await redis.hGet(Constants.MESSAGES, message.id))
}