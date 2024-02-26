import fs from "fs";
import path from "path";
import { FileSystemDataSource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('file-system.datasource.ts', () => {
    const logPath = path.join(__dirname,  '../../../logs');


    beforeEach(() => {
        fs.rmSync(logPath, {recursive:true, force:true})
    })

    test('should create log files if they do not exists ', () => {
        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual([
            "logs-high.log",
            "logs-low.log",
            "logs-medium.log"
        ]);
    });

    test('should save a log in logs-low.log', () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts',
            message: 'testing'
        })
        logDataSource.saveLog(log);

        const lowLogs = fs.readFileSync(`${logPath}/logs-low.log`,'utf-8');

        expect(lowLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in logs-medium.log', () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts',
            message: 'testing'
        })
        logDataSource.saveLog(log);

        const lowLogs = fs.readFileSync(`${logPath}/logs-medium.log`,'utf-8');

        expect(lowLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in logs-high.log', () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts',
            message: 'testing'
        })
        logDataSource.saveLog(log);

        const lowLogs = fs.readFileSync(`${logPath}/logs-high.log`,'utf-8');

        expect(lowLogs).toContain(JSON.stringify(log));
    });

    // test('should return all logs', async() => {

    //     const logDatasource = new FileSystemDataSource();
    //     const logLow = new LogEntity({
    //       message: 'log-low',
    //       level: LogSeverityLevel.low,
    //       origin: 'low'
    //     });
    //     const logMedium = new LogEntity({
    //       message: 'log-medium',
    //       level: LogSeverityLevel.medium,
    //       origin: 'medium'
    //     });
    
    //     const logHigh = new LogEntity({
    //       message: 'log-high',
    //       level: LogSeverityLevel.high,
    //       origin: 'high'
    //     });
    
    //     await logDatasource.saveLog(logLow);
    //     await logDatasource.saveLog(logMedium);
    //     await logDatasource.saveLog(logHigh);
    
    //     const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
    //     const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
    //     const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);
    
    //     expect( logsLow ).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]) )
    //     expect( logsMedium ).toEqual( expect.arrayContaining([ logMedium ]) )
    //     expect( logsHigh ).toEqual( expect.arrayContaining([ logHigh ]) )
    
    
    //   });
    
    
      test('should not throw an error if path exists', () => {
    
        new FileSystemDataSource();
        new FileSystemDataSource();
    
        expect(true).toBeTruthy();
    
      })
    
    
      test('should throw an error if severity level is not defined', async() => {
    
        const logDatasource = new FileSystemDataSource();
        const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;
    
        try {
          await logDatasource.getLogs(customSeverityLevel);
          expect(true).toBeFalsy();
        } catch (error) {
          const errorString = `${ error }`;
          
          expect(errorString).toContain(`${ customSeverityLevel } not implemented`);
        }
    
      })
    
});