import { Redis } from "ioredis";
import { Users } from "../data/users";
import { MessageRepository } from "../data/messages";

export type Context = {
    jid: string
    message: string
}

export type Response = {
    content: string
}

export class MessageHandler {
    constructor(
        private readonly redis: Redis,
        public readonly users: Users,
        private readonly messageRepository: MessageRepository
    ) {}

    public static getInstance(redis: Redis, users: Users, messages: MessageRepository) {
        return new MessageHandler(redis, users, messages)
    }

    public async main(context: Context): Promise<Response> {
        
        // get the user
        const user = this.users.getUsers().filter((element) => {
            if(element.jid == context.jid){
                return element
            }
        })
        
        // get the message
        const message = this.messageRepository.messages.filter((element) => {
            if(element.code == user[0].context) {
                return element
            }
        })

        // increment
        const newUsers = this.users.getUsers().filter((element) => {
            if(element.jid == context.jid){
                if(element.context == "001" || !element.context){
                    element.context = "003"
                    return element
                } else {
                    element.context = String(Number(element.context) + Number(element.context))
                    return element
                }
            } else {
                return element
            }
        })
        
        // set new users bash
        this.users.setUsers(newUsers)
        
        return new Promise<Response>(resolve => resolve({ content: message[0].content}))
    }
}


