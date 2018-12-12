import nodemailer, { Transporter } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export class Emailer {
    private user: string
    private password: string
    private transport: Transporter

    constructor() {
        const { mailer } = global.envConfig;
        this.user = mailer.username
        this.password = mailer.password
        this.transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: this.user,
                password: this.password
            }
        })
    }

    async sendMail (mailOptions: MailOptions) {
        await this.transport.sendMail(mailOptions)
    }
}