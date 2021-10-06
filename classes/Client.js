import { Client, Collection } from "discord.js";
import { readdir, lstatSync } from "fs";import { pathToFileURL } from 'url'

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

    getCommand(value) {
        return this.commands.get(value) || this.commands.get(this.aliases.get(value));
    }

    async loadCommands(dir, root) {
        readdir(root+'/'+dir, async (err, files) => {
            if (err) {
                console.error(err)
                return
            }

            for (const file of files) {
                const filePath = `${dir}/${file}`
                const fileStatus = lstatSync(filePath)

                if (fileStatus.isDirectory()) {
                    this.loadCommands(filePath, root)
                    continue
                }

                if (file.endsWith('.js')) {
                    const imported = await import('../'+filePath)
                    const command = new imported.default(this)
                    this.commands.set(command.help.name, command)
                    command.config.aliases.forEach(a => this.aliases.set(a, command.help.name));
                }
            }
        })
    }
    loadEvents(dir, root) {
        readdir(root+'/'+dir, async (err, files) => {
            if (err) {
                console.error(err)
                return
            }

            for (const file of files) {
                const filePath = `${dir}/${file}`
                const fileStatus = lstatSync(filePath)

                if (fileStatus.isDirectory()) {
                    this.loadCommands(filePath, root)
                    continue
                }

                if (file.endsWith('.js')) {
                    const imported = await import('../'+filePath)
                    const event = new imported.default(this)
                    super.on(file.split(".")[0], (...args) => event.run(...args));
                }
            }
        })
    }
}

export default GoClient