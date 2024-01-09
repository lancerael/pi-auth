# pi-auth

A simple ROPC (Resource Owner Password Credentials) Oauth 2.0 service to handle user accounts on your website without login redirects. It provides basic authentication and authorisation, with access and refresh tokens. This solution is not recommended for protecting sensitive information, but is useful for a quick and easy flow for simple accounts.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Quick start](#quick-start)
  - [Installation](#installation)
  - [Usage](#usage)
- [Docker](#docker)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Prerequisites

- Node.js
- npm (or pnpm/yarn)
- Docker
- Postman (optional, to test endpoints)

## Getting Started

Clone the repository:

```
git clone https://github.com/lancerael/pi-auth.git
cd your-repository
```

Rename `.env.example` to `.env`. These default values will let you test and develop.

### Quick start

The quickest way to try the app locally, is to make sure Docker is running, then start the application with:

```
npm run serve
```

You can then access the demo app at http://localhost:4173 to experiment with the endpoints.

### Installation

Install dependencies:

```
npm install
```

Needed if you want to run the service directly from Node, rather than Docker.

### Usage

The auth service has a PostgreSQL database with the database tables:

#### pi_users

This table stores user information.

- `user_id`: Unique identifier for each user (serial, primary key).
- `username`: User's username (VARCHAR, unique, not null).
- `email`: User's email address (VARCHAR, unique, not null).
- `password_hash`: Hashed password for user authentication (VARCHAR, not null).

#### pi_token_whitelist

This table maintains a whitelist of tokens for user sessions.

- `user_session_id`: Unique identifier for each session (serial, primary key).
- `username`: User's username associated with the session (VARCHAR, unique, not null).
- `access_token`: Access token for the session (VARCHAR, unique, not null).
- `refresh_token`: Refresh token for the session (VARCHAR, unique, not null).

These tables are designed to store user information securely and manage authentication tokens for user sessions.

The login flow is managed using the following endpoints:

#### Signup

- **Endpoint**: `POST /auth/signup`
- **Description**: Creates a new user account.
- **Request Body**:
  - `username` (string): User's username.
  - `email` (string): User's email address.
  - `password` (string): User's password.

#### Login

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a user and returns access and refresh tokens.
- **Request Body**:
  - `username` (string): User's username.
  - `password` (string): User's password.

#### Validate

- **Endpoint**: `GET /auth/validate`
- **Description**: Validates the user's access token.
- **Headers**:
  - `Authorization` (string): Bearer token containing the access token.

#### Refresh

- **Endpoint**: `GET /auth/refresh`
- **Description**: Refreshes the user's access token using the refresh token (only if the user has consented to cookies).
- **Cookies**:
  - `refreshToken` (string): HTTP-only cookie containing the refresh token.

#### Logout

- **Endpoint**: `DELETE /auth/logout`
- **Description**: Logs out the user and invalidates the refresh token.
- **Headers**:
  - `Authorization` (string): Bearer token containing the access token.

## Docker

The image is tagged docker at `lancerael/pi-lib-auth-fe:latest`

https://hub.docker.com/repository/docker/lancerael/pi-lib-auth-fe

## Development

To use Docker Compose, make sure Docker is running, then start the application with:

```
npm run serve
```

This will initialise a PostgreSQL database container with the database tables needed, and mount the auth service in another container, as well as Swagger in another. Finally it will launch the demo FE.

- Demo FE is at http://localhost:4173
- Swagger is at http://localhost:8080
- Use `./http-debug/pi_auth.postman_collection.json` file to test with Postman.
- To use you local FE instead of these, make sure to update the `DEV_URL` environment variable to enable CORS.

If you want to run the app locally, you can stop the pi_auth service on Docker and run it from your terminal using nodemon with:

```
npm run dev
```

If you're doing this, remember to update the POSTGRES_HOST to be localhost.

If you want some inspiration for implementation, check out the code for the demo app over at the Pi Lib Monorepo: https://github.com/lancerael/pi/tree/main/src/apps/spas/pi-auth

## Testing

Run the local unit tests using:

```
npm run test
```

## Deployment

Set up a PostgreSQL database using the `./src/queries/initialise.sql` query.

Set these environment variables before deploying the app:

```
JWT_SECRET=123
REFRESH_SECRET=456
POSTGRES_DB=pi_auth_db
POSTGRES_USER=pi_auth_user
POSTGRES_PASSWORD=pi_auth_password
POSTGRES_HOST=users
DEV_URL=http://localhost:8080
PROD_URL=http://prod-url.com
```

You can then deploy the app to your server and use the endpoints for authorisation and authentication.

## License

This project is licensed under the MIT license - see the LICENSE file for details.
