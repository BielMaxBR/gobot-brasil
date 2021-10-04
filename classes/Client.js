import { Client, Collection } from "discord.js";
import { readdir, lstatSync } from "fs";

class GoClient extends Client {
    constructor(options) {
        super(options || {})

        this.commands = new Collection() 
        this.aliases = new Collection()
        this.events = new Collection()
    }

    login(token) {
        super.login(token)
    }

    loadCommands(dir) {
        readdir(dir, async (err, files) => {
            if (err) {
                console.error(err)
                return
            }

            for (const file of files) {
                const filePath = `${dir}/${file}`
                const fileStatus = lstatSync(filePath)
                
                if (fileStatus.isDirectory()) {
                    this.loadCommands(filePath)
                    continue
                }

                if (file.endsWith('.js')) {
                    const imported = await import(filePath)
                    const command = new imported.default(this)
                    this.commands.set(command.name, command)
                    command.config.aliases.forEach(a => this.aliases.set(a, command.name));
                }
            }
        })
    }
    loadEvents(dir) {
        readdir(dir, async (err, files) => {
            if (err) {
                console.error(err)
                return
            }

            for (const file of files) {
                const filePath = `${dir}/${file}`
                const fileStatus = lstatSync(filePath)
                
                if (fileStatus.isDirectory()) {
                    this.loadCommands(filePath)
                    continue
                }

                if (file.endsWith('.js')) {
                    const imported = await import(filePath)
                    const event = new imported.default(this)

                    super.on(file.split(".")[0], (...args) => event.run(...args));
                }
            }
        })
    }
}

export default GoClient