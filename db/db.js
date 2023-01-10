import { createClient } from 'redis'
import dotenv from "dotenv"
import Constants from '../util/Constants.js'
import chalk from 'chalk'
dotenv.config()

const redisClient = createClient({
    url: process.env.REDIS_HOST
})

redisClient.on('ready', async () => {
    console.log(chalk.greenBright('redis conectado'))
    if (process.env.TEST == true) {
        console.log(chalk.yellow("***MODO TESTE***"))
    }
    await redisClient.json.set(Constants.MESSAGES, "$", {})
})

redisClient.connect()
export default redisClient