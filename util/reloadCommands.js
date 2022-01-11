import { Routes } from "discord-api-types/v9"
import { REST } from "@discordjs/rest"

import { config } from "dotenv"
config()

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

export default async client => {
    console.log('enviando comandos pro discord...');
    let commands = []
    client.commands.forEach((value) => {
        commands.push(value.builder.toJSON())
        console.log('carregando comando:', value.builder.name)
    });

    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENTID, process.env.SERVERID),
            { body: commands },
        )
    
        console.log('comandos enviados pro discord com sucesso');
    } catch(err) {
        console.log(err)
    }
}