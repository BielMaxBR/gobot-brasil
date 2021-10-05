import Command from '../../classes/Command.js';

class FirstSteps extends Command {
    constructor(client) {
        super(client, {
            name: "primeirospassos",
            aliases: ['fs', 'inicio', 'pp', 'comeco'],
            description: "mostra por onde todo iniciante deve começar",
            usage: "g!inicio",
            defaultMessage: "é perigoso ir sozinho, pegue isso aqui \n \nhttps://docs.godotengine.org/pt_BR/stable/getting_started/step_by_step/index.html"
        })
    }
}

export default FirstSteps