import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImplementation(
    new FileSystemDataSource()
);

export class ServerApp {
    public static start() {
        console.log("Server Started...");
        CronService.createJob(
            '*/4 * * * * *',
            () => {
                // const url = 'http://localhost:3000/posts'; 
                const url = 'https://google.com'; 
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`SUCCESS: url ${url} is ok`),
                    (error) => console.log(`ERROR: ${error} in url ${url}`)
                ).execute(url);
            }
        );
    }
}