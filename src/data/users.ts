export type User = {
    jid: string
    context: string
}

export class Users {
    repository: User[] = [
        {
            jid: "valid_jid",
            context: "001"
        }
    ]
    public getUsers(): User[] {
        return this.repository
    }

    public setUsers(users: User[]) {
        return this.repository = users;
    }
}