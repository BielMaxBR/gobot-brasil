import { Client, Collection } from "discord.js" 
import { readdir, lstatSync } from "fs"

class GoClient extends Client {
    constructor(options) {
        super(options || {})

        this.commands = new Collection()
        this.selectMenus = new Collection()
        this.modals = new Collection()
        this.events = new Collection()
    }

    login(token) {
        super.login(token)
    }

    getCommand(value) {
        return this.commands.get(value) || null 
    }

    async loadCommands(dir, root) {

        const loadAgain = (_dir, _root) => {
            return new Promise((res, rej) => {
                readdir(_root + '/' + _dir, async (err, files) => {
                    if (err) {
                        console.error(err)
                        return rej()
                    }

                    for (const file of files) {
                        const filePath = `${_dir}/${file}`
                        const fileStatus = lstatSync(filePath)

                        if (fileStatus.isDirectory()) {
                            const loaded = await loadAgain(filePath, _root)
                            if (loaded) continue
                        }

                        if (file.endsWith('.js')) {
                            const imported = await import('../' + filePath)
                            const command = new imported.default(this)
                            this.commands.set(command.help.name, command)
                        }
                    }
                    res()
                })
            })
        }
        return await loadAgain(dir, root)
    }
    async loadEvents(dir, root) {

        const loadAgain = (_dir, _root) => {
            return new Promise((res, rej) => {
                readdir(_root + '/' + _dir, async (err, files) => {
                    if (err) {
                        console.error(err)
                        return rej()
                    }

                    for (const file of files) {
                        const filePath = `${_dir}/${file}`
                        const fileStatus = lstatSync(filePath)

                        if (fileStatus.isDirectory()) {
                            const loaded = await loadAgain(filePath, _root)
                            if (loaded) continue
                        }

                        if (file.endsWith('.js')) {
                            const imported = await import('../' + filePath)
                            const event = new imported.default(this)
                            super.on(file.split(".")[0], (...args) => event.run(...args)) 
                        }
                    }
                    res()
                })
            })
        }
        return await loadAgain(dir, root)
    }
}

export default GoClient
