import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();


const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === "test" ? 'mds_social_test' : process.env.DB_NAME,
});

export default db;
