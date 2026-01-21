import { Client } from 'pg';
import { env } from './env.js';
import { createUsersTableQuery } from '../modules/users/user.model.js';

const connectDB = async () => {
    try {
        const conn = new Client({
            host: env.db.host,
            user: env.db.user,
            port: env.db.port,
            password: env.db.password,
            database: env.db.database
        });
        
        await conn.connect();
        console.log(`Database Connected Successfully : ${conn.host}`);
        
        // Create users table if it doesn't exist
        await conn.query(createUsersTableQuery);
        console.log('Users table created or already exists');
        
        return conn;
    } catch (error) {
        console.log("Error:", error);
        process.exit(1);
    }
}

export default connectDB;

