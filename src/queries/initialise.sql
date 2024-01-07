CREATE SCHEMA pi_auth;

CREATE TABLE pi_auth.pi_users (
  user_id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  email VARCHAR (254) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE pi_auth.pi_token_whitelist (
  user_session_id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  access_token VARCHAR (250) UNIQUE NOT NULL,
  refresh_token VARCHAR (250) UNIQUE NOT NULL
);