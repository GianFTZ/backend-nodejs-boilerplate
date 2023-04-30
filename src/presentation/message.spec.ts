import { describe, test, expect, vi } from 'vitest'
import { Redis } from 'ioredis';
import { MessageHandler } from './message';
import { Users } from '../data/users';
import { MessageRepository } from '../data/messages';

describe('message with redis', () => {
    const client = new Redis("redis://default:b6c5ec079adb47dfaf6d4be54197391f@us1-emerging-lemming-38954.upstash.io:38954");
    const users = new Users()
    const messages = new MessageRepository()

    test('redis stability', async () => {
        expect(await client.ping()).toBe("PONG")
    })

    test('given new message context system must returns welcome message', async () => {
        const fakeData = {
            context: {
                jid: "valid_jid",
                message: "valid_message"
            }
        }
        const sut = MessageHandler.getInstance(client, users, messages)
        const response = await sut.main(fakeData.context)
        expect(response.content).toBe("welcome")
    })

    test('given second context system must returns second message', async () => {
        const fakeData = {
            context: {
                jid: "valid_jid",
                message: "valid_message"
            }
        }
        vi.spyOn(users, "getUsers").mockReturnValue([ { jid: 'valid_jid', context: '001' } ])
        const sut = MessageHandler.getInstance(client, users, messages)
        const response = await sut.main(fakeData.context)
        expect(response.content).toBe("welcome")
    })

    test('given new message context system must returns welcome message and increment users context', async () => {
        const fakeData = {
            context: {
                jid: "valid_jid",
                message: "valid_message"
            }
        }
        vi.spyOn(users, "getUsers").mockReturnValue([ { jid: 'valid_jid', context: '003' } ])
        const sut = MessageHandler.getInstance(client, users, messages)
        const response = await sut.main(fakeData.context)
        expect(response.content).toBe("second")
        expect(sut.users.repository[0].context).toBe("6")
    })

    test('ensure increment system is working', async () => {
        const fakeData = {
            context: {
                jid: "valid_jid",
                message: "valid_message"
            }
        }
        vi.spyOn(users, "getUsers").mockReturnValue([ { jid: 'valid_jid', context: '6' } ])
        const sut = MessageHandler.getInstance(client, users, messages)
        const response = await sut.main(fakeData.context)
        expect(response.content).toBe("third")
        expect(sut.users.repository[0].context).toBe("12")
    })

})