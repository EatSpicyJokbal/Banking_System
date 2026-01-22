import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { env } from '../../config/env.js';

// Initialize PostgresSQL client
const pool = new Pool({
    host: env.db.host,
    user: env.db.user,
    port: env.db.port,
    password: env.db.password,
    database: env.db.database
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:',.<>?/\\|`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:',.<>?/\\|`~]{8,}$/;

// Function to create a new user
const createUser = async ({ 
    email, 
    username, 
    password,
    first_name,
    last_name,
    middle_name,
    date_of_birth,
    phone_number
}) => {
    const client = await pool.connect();

    try{
        console.log('createUser called with:', { first_name, last_name, middle_name, date_of_birth, phone_number });
        
        // Check if email already exist
        const existingEmail = await client.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
        if (existingEmail.rows.length > 0) {
            throw new Error('Email already exists');
        };

        // Check if username already exist
        const existingUsername = await client.query('SELECT * FROM users WHERE username = $1 LIMIT 1', [username]);
        if (existingUsername.rows.length > 0) {
            throw new Error('Username already exists')
        }

        // Check if phonenumber already used
        const existingPhoneNumber = await client.query('SELECT * FROM users WHERE phone_number = $1 LIMIT 1',[phone_number]);
        if (existingPhoneNumber.rows.length > 0) {
            throw new Error('Phone Number was already used')
        };

        // Check if user has already an account
        const existingUser = await client.query(
            'SELECT 1 FROM users WHERE first_name = $1 AND last_name = $2 AND date_of_birth = $3 LIMIT 1',
            [first_name, last_name, date_of_birth]
        );
        if(existingUser.rows.length > 0) {
            throw new Error('Account already exists');
        };

        //Check if the inputted password meets the security criteria
        if(!passwordRegex.test(password)) {
            throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUser = await client.query(
            'INSERT INTO users (username, email, phone_number, first_name, middle_name, last_name, date_of_birth, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [username, email, phone_number, first_name, middle_name, last_name, date_of_birth, hashedPassword]
        )

        return insertUser.rows[0];
    } catch (error) {
        console.error('Database Error', error)
        throw error;
    }
}

export default createUser;

