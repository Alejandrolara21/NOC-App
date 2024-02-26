import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresLogDataSource } from "./postgres-log.datasource";

describe('postgres-log.datasource.ts', () => {

    const logDataSource = new PostgresLogDataSource();

    const log = new LogEntity({
        level: LogSeverityLevel.low,
        origin: 'mongo-log-datasource.test.ts',
        message: 'testing'
    })

    test('should create a log', async () =>{
        
        const logSpy = jest.spyOn(console,'log');

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Postgres log created !!", expect.any(String));
    });

    test('should get logs', async () => {

        await logDataSource.saveLog(log);
        const logs = await logDataSource.getLogs(LogSeverityLevel.low);
        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.low)
    });
})