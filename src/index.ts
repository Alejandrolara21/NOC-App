import { ServerApp } from "./presentation/server"
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";

(async() => {
    main();
})();

async function main () {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // CREATE ROWS in posgresql
    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data:{
    //         level:'HIGH',
    //         message: 'Test message in PostgreSQL',
    //         origin: 'index.ts'
    //     }
    // });
    // console.log({newLog});

    // List logs in PostgreSQL
    // const prisma = new PrismaClient();
    // const logs = await prisma.logModel.findMany({
        
    // });
    // console.log(logs);

    
    
    // Create collection in MongoDB
    // const newLog = await LogModel.create({
    //     message: 'Test message in Mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // });
    // await newLog.save();
    // console.log(newLog);


    // List logs collections in MongoDB
    // const logs = await LogModel.find();
    // console.log(logs);
    
    ServerApp.start();
    // console.log(envs);
}