import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[];
}

interface Attachement{
    filename: string;
    path: string;
}

export class EmailService{
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_EMAIL_KEY
        }
    });

    constructor(){}

    async sendEmail(options : SendMailOptions):Promise<boolean>{
        const {to, subject, htmlBody, attachments = []} = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });
            console.log(sentInformation);
            return true;
        } catch (error) {
            return false;            
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs del servidor con files'
        const htmlBody = `
            <h3>Logs Sistema con files - NOC</h3>
            <p>Loremasdasdasdasdasdasdasd</p>
            <p>Ver Logs Adjuntos</p>
        `;

        const attachments : Attachement[]= [
            {
                filename: 'logs-low.log',
                path: './logs/logs-low.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            },
        ]

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        });
    }
}