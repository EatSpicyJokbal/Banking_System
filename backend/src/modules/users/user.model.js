// User Model Definition
// This file defines the structure and schema for the User entity

export const UserModel = {
    tableName: 'sample',
    columns: {
        id: 'serial PRIMARY KEY',
        username: 'VARCHAR(50) UNIQUE NOT NULL',
        email: 'VARCHAR(100) UNIQUE NOT NULL',
        password: 'VARCHAR(255) NOT NULL',
        first_name: 'VARCHAR(50) NOT NULL',
        last_name: 'VARCHAR(50) NOT NULL',
        middle_name: 'VARCHAR(50) NOT NULL',
        date_of_birth: 'DATE NOT NULL',
        phone_number: 'VARCHAR(20) UNIQUE NOT NULL',
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    }
};

// SQL to create users table
export const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS sample (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        middle_name VARCHAR(50),
        date_of_birth DATE,
        phone_number VARCHAR(20) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;
