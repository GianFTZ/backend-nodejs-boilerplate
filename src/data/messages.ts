export type Message = {
    code: string
    content: string
}

export class MessageRepository {
    messages: Message[] = [
        {
            code: "001",
            content: "welcome"
        },
        {
            code: "003",
            content: "second"
        },
        {
            code: "6",
            content: "third"
        }
    ]
}