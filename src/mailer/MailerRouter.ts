import { Request, Router, Response, NextFunction } from "express";
import keys from "../../google-keys.json";
import nodemailer from "nodemailer";
import { AppError, commonErrors } from "@utils/errors";
import { UserManager } from "@modules/user/UserManager";
import { User } from "@entity/User";
import { OAuth2Client } from "google-auth-library";
import { timingSafeEqual } from "crypto";

interface MailConfig {
    host: string,
    port: number
    secure: boolean
    auth: {
        type: string
        user: string
        clientId: string
        clientSecret: string
        refreshToken: string
        accessToken: string
    }
}

export class MailerRouter {
    private config: MailConfig
    public manager: typeof UserManager
    public authClient: OAuth2Client
    public router: Router

    constructor () {
        this.router = Router({ mergeParams: true });
        this.manager = UserManager;
        this.config = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: "",
                clientId: keys.web.client_id,
                clientSecret: keys.web.client_secret,
                refreshToken: "",
                accessToken: "",
            }
        }
        this.authClient = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        )
        this.routes();
    }

    routes () {
        this.router.post("/share", async(req: Request, res: Response, next: NextFunction) => {
            try {
                const { id, collectionId } = req.params;
                const { emails } = req.body;
                if (!id || !collectionId) {
                    throw new AppError(commonErrors.MissingDataError, "missing id in params", true);
                }
                if (!emails) {
                    throw new AppError(commonErrors.MissingDataError, "missing emails in body", true)
                }
                const user = await this.manager.one(id)
                if (!user) {
                    throw new AppError(commonErrors.DataNotFound, "user not found", true)
                }
                const tokenInfo = await this.authClient.getTokenInfo(user.accessToken)
                if (tokenInfo.expiry_date <= new Date().getTime()) {
                    // update tokens and refresh tokens in db
                    this.authClient.setCredentials({
                        access_token: user.accessToken,
                        refresh_token: user.refreshToken
                    })
                    const tokens = await this.authClient.refreshAccessToken()
                    await this.manager.updateTokens(
                        user.email, 
                        tokens.credentials.access_token, 
                        tokens.credentials.refresh_token
                    )
                }
                // set mailer config data
                this.setConfigData(user)
                if (!this.checkConfigData()) {
                    throw new AppError(commonErrors.RouterError, "user configuration error", true)
                }
                const transporter = nodemailer.createTransport(this.config as any)
                await transporter.sendMail({
                    from: user.email,
                    to: emails,
                    subject: "Someone has share a restfulrant list with you",
                    html: "<p>placeholder link to client page<p>"
                })
                res.status(200).json({
                    message: "OK"
                })
            } catch (e) {
                next(e)
            }
        })
    }

    private setConfigData(user: User) {
        this.config.auth.user = user.email;
        this.config.auth.refreshToken = user.refreshToken;
        this.config.auth.accessToken = user.accessToken;
    }

    private checkConfigData () {
        return this.config.auth.user.length !== 0 ||
        this.config.auth.refreshToken.length !== 0 ||
        this.config.auth.accessToken.length !== 0
    }
}