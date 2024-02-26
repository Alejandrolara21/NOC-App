import { LogSeverityLevel, LogEntity } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe('log.datasource.ts', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'testing',
        level: LogSeverityLevel.low
    })

    class MockLogDataSource implements LogDataSource{
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
    }

    test('should test the abstract class', async () => {
        const mockLogDatasource = new MockLogDataSource();
        expect(mockLogDatasource).toBeInstanceOf(MockLogDataSource);
        expect(mockLogDatasource).toHaveProperty('saveLog');
        expect(mockLogDatasource).toHaveProperty('getLogs');
        expect(typeof mockLogDatasource.saveLog).toBe('function');
        expect(typeof mockLogDatasource.getLogs).toBe('function');

        await mockLogDatasource.saveLog(newLog);

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);


    })
});