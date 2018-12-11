import config from "../appconfig.json"
import path from "path";

const environment = process.env.NODE_ENV || "development";
// @ts-ignore
const envConfig = config[environment]

if (environment === "development") {
    checkENV()
    setDBSecrets(envConfig);
    setMailerSecrets(envConfig);
    setAppRoot(envConfig);
}

global.envConfig = envConfig;

console.log(
    `global.envConfig: ${JSON.stringify(global.envConfig, undefined, 2)}`
);

function setDBSecrets(configuration: any) {
    configuration.db.user = process.env.DB_USER;
    configuration.db.name = process.env.DB_NAME;
    configuration.db.password = process.env.DB_PASSWORD;
}

function setMailerSecrets(configuration: any) {
    configuration.mailer.password = process.env.MAILER_PASSWORD;
    configuration.mailer.username = process.env.MAILER_USERNAME;
}

function setAppRoot(configuration: any) {
    configuration.app_root = path.resolve(__dirname);
}

function checkENV () {
    if (!process.env.DB_USER) {
        console.error("Missing environment variable DB_USER");
        process.exit(1);
    } else if (!process.env.DB_NAME) {
        console.error("Missing environment variable DB_NAME");
        process.exit(1);
    } else if (!process.env.DB_PASSWORD) {
        console.error("Missing environment variable DB_PASSWORD");
        process.exit(1);
    } else if (!process.env.MAILER_PASSWORD) {
        console.error("Missing environment variable MAILER_PASSWORD");
        process.exit(1);
    } else if (!process.env.MAILER_USERNAME) {
        console.error("Missing environment variable MAILER_USERNAME");
        process.exit(1);
    }
}