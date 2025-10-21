import { createPool } from "mysql2";
import { DBQueryClass } from "./DBQuery.js";
import { config } from "dotenv";

const createConnection = () => {
    config();
    const pool = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }).promise();
    return new DBQueryClass(pool);
}
export const DBQuery = createConnection();