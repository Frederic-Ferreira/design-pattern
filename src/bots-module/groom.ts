import { IBot } from "./Ibot-interface"

export class Groom implements IBot {
    constructor(){}

    public hello(): Promise<string>{
        return Promise.resolve([
            "Welcome!",
            "Hello!",
            "Yo!",
            "Bon retour parmi nous!"
        ][Math.floor(Math.random()*4)])
    }

    public react(message: string): string{
        if(message.includes('salut')) return 'Bonjour, comment vas tu ?'
        return ''
    }

}
