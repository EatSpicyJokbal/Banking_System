// User.model.js
// Purpose: Defines the USERS table structure for the banking system

const UserModel = {
  tableName: 'users',

  columns: {
    id: 'UUID PRIMARY KEY DEFAULT gen_random_uuid()',

    // Identity
    email: 'VARCHAR(255) UNIQUE NOT NULL',
    username: 'VARCHAR(50) UNIQUE NOT NULL',

    // Security
    password_hash: 'TEXT NOT NULL',

    // Personal Information
    first_name: 'VARCHAR(100) NOT NULL',
    last_name: 'VARCHAR(100) NOT NULL',
    middle_name: 'VARCHAR(100)',
    date_of_birth: 'DATE NOT NULL',

    // Contact
    phone_number: 'VARCHAR(20) UNIQUE',

    // Status & Auditing
    is_active: 'BOOLEAN DEFAULT true',
    created_at: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
  }
};

const createUsersTableQuery = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,

  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100),
  date_of_birth DATE NOT NULL,

  phone_number VARCHAR(20) UNIQUE,

  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

export {
  UserModel,
  createUsersTableQuery
};
