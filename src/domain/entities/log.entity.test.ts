import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('log.entity.ts', () => {
    const objTest = {
        origin: 'log.entity.test.ts',
        message: 'testing',
        level: LogSeverityLevel.low
    }


    test('should create a LogEntity instance', () => {

        const log = new LogEntity({
            origin: 'log.entity.test.ts',
            message: 'testing',
            level: LogSeverityLevel.low
        })

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(objTest.message);
        expect(log.origin).toBe(objTest.origin);
        expect(log.level).toBe(objTest.level);
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test('should create json with method fromJson', () => {
        const logJson = `{"level":"low","message":"SUCCESS: url https://google.com is ok","createdAt":"2024-02-25T02:55:00.391Z","origin":"check-service.ts"}`;
        const log = LogEntity.fromJson(logJson);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("SUCCESS: url https://google.com is ok");
        expect(log.origin).toBe("check-service.ts");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from Object', () => {

        const log = LogEntity.fromObject(objTest);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(objTest.message);
        expect(log.origin).toBe(objTest.origin);
        expect(log.level).toBe(objTest.level);
        expect(log.createdAt).toBeInstanceOf(Date);
    })
})