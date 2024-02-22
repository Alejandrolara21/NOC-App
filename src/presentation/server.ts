import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasource/mongo-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImplementation(
    // new FileSystemDataSource()
    new MongoLogDataSource()
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
        //         const url = 'http://localhost:3000/posts'; 
        //         // const url = 'https://google.com'; 
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`SUCCESS: url ${url} is ok`),
        //             (error) => console.log(`ERROR: ${error} in url ${url}`)
        //         ).execute(url);
        //     }
        // );

        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);
    }
}