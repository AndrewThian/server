import { Request, Router, Response, NextFunction } from "express";
import { UserManager } from "@modules/user/UserManager";
import keys from "../../google-keys.json"
import { OAuth2Client } from "google-auth-library";
import { AppError, commonErrors } from "@utils/errors";

export class AuthenticationRouter {
    public keys: object
    public router: Router
    public manager: typeof UserManager
    public authClient: OAuth2Client
    public GOOGLE_USER_API: string

    constructor() {
        this.router = Router();
        this.manager = UserManager;
        this.keys = keys;
        this.GOOGLE_USER_API = "https://www.googleapis.com/oauth2/v1"
        this.authClient = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        )

        this.routes()
    }

    routes () {
        this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
            const authorizationUrl = this.authClient.generateAuthUrl({
                access_type: "offline",
                prompt: "consent",
                scope: [
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://mail.google.com",
                    "https://www.googleapis.com/auth/gmail.send"
                ]
            })
            return res.redirect(authorizationUrl)
        })
        this.router.get("/callback", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { code } = req.query
                const { tokens } = await this.authClient.getToken(code)
                this.authClient.setCredentials(tokens);
                const url = `${this.GOOGLE_USER_API}/userinfo?access_token=${tokens.access_token}`
                const { data } = await this.authRequest(url);
                await this.manager.updateTokens(data.email, tokens.access_token, tokens.refresh_token);
                res.status(201).json({
                    message: "OK"
                })
            } catch (e) {
                next(e)
            }
        })
    }

    private async authRequest (url: string) {
        try {
            return this.authClient.request<{email: string}>({ url })
        } catch (e) {
            throw new AppError(commonErrors.RouterError, "google auth client request error", true, e)
        }
    }
}