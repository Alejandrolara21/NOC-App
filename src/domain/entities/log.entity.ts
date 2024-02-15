export enum LogSeverityLevel{
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    message:string, 
    level:LogSeverityLevel, 
    origin:string,
    createdAt?: Date
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor({message, level, origin, createdAt = new Date()} : LogEntityOptions){
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string):LogEntity => {
        const { level, message, createdAt, origin } = JSON.parse(json);
        if(!message) throw new Error('Message is required');

        const log = new LogEntity({
            message, 
            level,
            createdAt,
            origin
        });
        log.createdAt = new Date(createdAt);

        return log;

    }
}