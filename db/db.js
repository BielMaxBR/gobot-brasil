import { createClient } from 'redis';
import dotenv from "dotenv"
import Constants from '../util/Constants.js'
dotenv.config()

const redisClient = createClient({
    url: process.env.REDIS_HOST
});

redisClient.on('ready', async () => {
    console.log('redis conectado')
    if (process.env.TEST) {
        console.log('\x1b[33m%s\x1b[0m', "***MODO TESTE***", await redisClient.json.set(Constants.MESSAGES, "$", {}))
    }
})

redisClient.connect()
export default redisClient