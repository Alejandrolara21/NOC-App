import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDataSource implements LogDataSource{
    async saveLog(log: LogEntity): Promise<void> {
        const {level, message, origin} = log;
        const newLog = await prisma.logModel.create({
            data:{
                level: severityEnum[level],
                message,
                origin
            }
        });
        console.log("Postgres log created !!", newLog.id);
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prisma.logModel.findMany({
            where:{
                level: severityEnum[severityLevel]
            }
        });
        return logs.map(log => LogEntity.fromObject(log));
    }
}