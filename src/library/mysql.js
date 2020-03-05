import dotenv from 'dotenv';
import path from 'path';

const mysql = require('promise-mysql');

dotenv.config({
    path : path.join(__dirname, '..', '..', '.env')
});

let mysqlPool;

async function getMysqlPool() {
    if (!mysqlPool) {
        mysqlPool = await mysql.createPool({
            host : process.env.DB_HOST,
            post : process.env.DB_PORT,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        return mysqlPool;
    }
    return mysqlPool;
}

async function query(...args) {
    const queryText = args[0];
    const data = args[1];

    await getMysqlPool();

    const connection = await mysqlPool.getConnection();
    const result = await connection.query(queryText, data) || null;

    connection.release();

    return result;
}

module.exports = {
    query
};