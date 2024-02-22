import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasource/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasource/postgres-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImplementation(
    new FileSystemDataSource()
);

const mongoLogRepository = new LogRepositoryImplementation(
    new MongoLogDataSource()
);

const postgresLogRepository = new LogRepositoryImplementation(
    new PostgresLogDataSource()
);
const emailService = new EmailService();

export class ServerApp {
    public static async start() {
        console.log("Server Started...");
        
        // todo: sent email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['alejandroguacanemelara@gmail.com', 'alejandroguaca-2012@hotmail.com']
        // )


        // CronService.createJob(
        //     '*/4 * * * * *',
        //     () => {
        //         // const url = 'http://localhost:3000/posts';
        //         const url = 'https://google.com'; 
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log(`SUCCESS: url ${url} is ok`),
        //             (error) => console.log(`ERROR: ${error} in url ${url}`)
        //         ).execute(url);
        //     }
        // );

        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);
    }
}