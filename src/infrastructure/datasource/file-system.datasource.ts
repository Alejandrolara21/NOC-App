import fs from "fs";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDataSource } from "../../domain/repository/log.repository";

export class FileSystemDataSource implements LogDataSource{

    private readonly logPath = 'logs/';
    private readonly lowLogsPaths = 'logs/logs-low.log';
    private readonly mediumLogsPaths = 'logs/logs-medium.log';
    private readonly highLogsPaths = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath);

        [
            this.lowLogsPaths,
            this.mediumLogsPaths,
            this.highLogsPaths
        ].forEach( path => {
            if( fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        });
    }


    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.lowLogsPaths, logAsJson);
        if( newLog.level === LogSeverityLevel.low) return;
            

        if( newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPaths, logAsJson);
        }else{
            fs.appendFileSync(this.highLogsPaths, logAsJson);
        }
    }


    private getLogsFromFile = (path:string):LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logsList = content.split('\n').map(log => LogEntity.fromJson(log));
        return logsList;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.lowLogsPaths);
        
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPaths);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPaths);
            
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

}