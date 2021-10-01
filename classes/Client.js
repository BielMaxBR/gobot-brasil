const { Client, Collection } = require("discord.js")
const { readdir, lstatSync } = require("fs");

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
        readdir(dir, (err, files) => {
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
                    const command = new (require(filePath))(this)
                    this.commands.set(command.name, command)
                    command.config.aliases.forEach(a => this.aliases.set(a, command.name));
                }
            }
        })
    }
    loadEvents(dir) {
        readdir(dir, (err, files) => {
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
                    const event = new (require(filePath))(this)

                    super.on(file.split(".")[0], (...args) => event.run(...args));
                }
            }
        })
    }
}

module.exports = GoClient