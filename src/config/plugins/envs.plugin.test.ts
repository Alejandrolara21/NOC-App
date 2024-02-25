import { envs } from "./envs.plugin";


describe('envs.plugin.ts', () => {
    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'alejandroguacanemelara@gmail.com',
            MAILER_EMAIL_KEY: 'lzayklavraftreoo',
            PROD: false,
            MONGO_URL: 'mongodb://alejandroguacanemelara:123456@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'alejandroguacanemelara',
            MONGO_PASS: '123456prueba'
        });
    });

    test('should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = "AVS";
        try {
            await import ("./envs.plugin");
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });
})