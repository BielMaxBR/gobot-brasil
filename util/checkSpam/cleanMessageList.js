import redis from "../../db/db.js"
import Constants from "../Constants.js"

export default async function cleanMessageList(content) {
    const array = (await redis.json.get(Constants.MESSAGES))[content].messages

    for (var i = array.length - 1; i >= 0; i--) {
        const data = array[i]
        console.log(i, data)

        redis.json.arrPop(Constants.MESSAGES, `.${content}.messages`, i)
    }
}