import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImplementation } from "./log.repository.implementation"

describe('log.repository.implementation.ts', () => {

    const mockLogDataSource: LogDataSource = {
        saveLog: jest.fn((log: LogEntity) => Promise.resolve()),
        getLogs: jest.fn(() => Promise.resolve([])),
    };

    const logRepository = new LogRepositoryImplementation(
        mockLogDataSource
    );

    beforeAll(() => {
        jest.clearAllMocks();
    })

    test('should saveLog call the datasource', async () => {
        const log = { level: LogSeverityLevel.low, message: "hola", origin: "log.repository.implementation.ts" } as LogEntity;

        await logRepository.saveLog(log);

        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
    })

    test('should saveLog call the datasource', async () => {
        await logRepository.getLogs(LogSeverityLevel.low);
        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
    })
})