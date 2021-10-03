class Command {
    constructor(client, options) {
        this.client = client;

        this.name = options.name || 'null'

        this.config = {
            permLevel: options.permLevel || 0,
            permission: options.permission || "SEND_MESSAGES",
            aliases: options.aliases || [],
            allowDMs: options.allowDMs || false
        };
    }
}

export default Command