class Command {
    constructor(client, options) {
        this.client = client;

        this.help = {
            name: options.name || 'null',
            description: options.description || 'ainda não temos uma descrição para esta função',
            usage: `\`${options.usage}\`` || "\`¯\\_(ツ)_/¯\`"
        }

        this.config = {
            permLevel: options.permLevel || 0,
            permission: options.permission || "SEND_MESSAGES",
            aliases: options.aliases || [],
            allowDMs: options.allowDMs || false,
            requireArgs: options.requireArgs || false,
            defaultMessage: options.defaultMessage || ""
        };
    }
}

export default Command