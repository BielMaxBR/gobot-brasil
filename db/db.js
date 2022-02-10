import { createClient } from 'redis';
import dotenv from "dotenv"
import Constants from '../util/Constants.js'
dotenv.config()

const redisClient = createClient({
    url: process.env.REDIS_HOST
});

redisClient.on('ready', () => {
    console.log('redis conectado')
    redisClient.hDel(Constants.MESSAGES)
})

redisClient.connect()
export default redisClient