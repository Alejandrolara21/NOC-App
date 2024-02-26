import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('check-service-multiple.ts', () => {

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn((log: LogEntity) => Promise.resolve()),
        getLogs: jest.fn(() => Promise.resolve([])),
    };
    const mockLogRepository2: LogRepository = {
        saveLog: jest.fn((log: LogEntity) => Promise.resolve()),
        getLogs: jest.fn(() => Promise.resolve([])),
    };
    const mockLogRepository3: LogRepository = {
        saveLog: jest.fn((log: LogEntity) => Promise.resolve()),
        getLogs: jest.fn(() => Promise.resolve([])),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
        [mockLogRepository, mockLogRepository2, mockLogRepository3],
        successCallback,
        errorCallback

    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call successCallback when fetch returns true', async () => {

        const wasOk = await checkService.execute('https://www.google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
    })


    test('should call errorCallback when fetch returns false', async () => {

        const wasError = await checkService.execute('https://www.googasdasdale.com');

        expect(wasError).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
    })
});