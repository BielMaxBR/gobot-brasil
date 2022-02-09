import { createClient } from 'redis';
import dotenv from "dotenv"
dotenv.config()

const redisClient = createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

const simpleRedis = {}
redisClient.on('ready', () => {
    console.log('redis conectado')
    // client.del("Sessions")
})

simpleRedis.get = (dataName, key) => {
    return new Promise((resolve) => {
        redisClient.hget(dataName, key, (err, data) => {
            if (err) {
                resolve(undefined)
                return
            }
            resolve(data)
        })
    })
}
simpleRedis.set = (dataName, key, newData) => {
    return new Promise((resolve) => {
        redisClient.hset(dataName, key, newData, (err, data) => {
            if (err) {
                resolve(undefined)
                return
            }
            resolve(data)
        })
    })
}
simpleRedis.del = (dataName, key) => {
    return new Promise((resolve) => {
        redisClient.hdel(dataName, key, (err, reply) => {
            if (err) {
                resolve(undefined)
                return
            }
            resolve(reply)
        })
    })
}
export {simpleRedis as default, redisClient}