import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

export const env = {
    port: parseInt(process.env.PORT),
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: parseInt(process.env.DB_PORT),
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
}