import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class ServerApp {
    public static start() {
        console.log("Server Started...");
        CronService.createJob(
            '*/4 * * * * *',
            () => {
                const url = 'http://localhost:3000/posts'; 
                // new CheckService().execute('https://google.com');
                new CheckService(
                    () => console.log(`SUCCESS: url ${url} is ok`),
                    (error) => console.log(`ERROR: ${error}`)
                ).execute('http://localhost:3000/posts');
            }
        );
    }
}