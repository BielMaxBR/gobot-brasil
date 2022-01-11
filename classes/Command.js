class Command {
    constructor(client, builder) {
        this.client = client;

        this.help = {
            name: builder.name || 'null',
            description: builder.description || 'ainda não temos uma descrição para esta função'
        }

        this.builder = builder
    }
}

export default Command