export default class InteractionCreate {
    constructor(client) {
        this.client = client
    }
    
    async run(interaction) {
        if (!interaction.isCommand()) return;

        try {
            const name = interaction.commandName
            const client = interaction.client
            const command = client.commands.get(name)
            command.run(interaction, client)
        } catch (err) {
            console.log(err)
        }
    }
}