import chalk from "chalk"
import { Routes } from "discord-api-types/v10"
import { REST } from "@discordjs/rest"

import { config } from "dotenv"
config()

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

export default async client => {
    console.log(chalk.yellowBright('enviando comandos pro discord...'))
    let commands = []
    client.commands.forEach((value) => {
        commands.push(value.builder.toJSON())
        console.log(chalk.yellowBright('carregando comando:', value.builder.name))
    })

    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENTID, process.env.SERVERID),
            { body: commands },
        )
    
        console.log(chalk.greenBright('comandos enviados pro discord com sucesso'))
    } catch(err) {
        console.log(chalk.redBright("ReloadCommands.js: \n", err))
    }
}
