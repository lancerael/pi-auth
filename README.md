# pi-auth

An Node Express app to handle basic authentication and authorisation, with access and refresh tokens.
This is a simple ROPC (Resource Owner Password Credentials) Oauth 2.0 service for where you want to handle user accounts on your website without login redirects. ROPC is not the most secure flow, so this solution is not recommended for protecting sensitive information.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
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

## Getting Started

### Installation

Clone the repository:

```
git clone https://github.com/lancerael/pi-auth.git
cd your-repository
```

Install dependencies:

```
npm install
```

### Usage

The auth service has a PostgreSQL database with the database tables:

- **pi_users** - stores the user info
- **pi_token_whitelist** - a whitelist for the valid tokens

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
- **Description**: Refreshes the user's access token using the refresh token.
- **Cookies**:
  - `refreshToken` (string): HTTP-only cookie containing the refresh token.

#### Logout

- **Endpoint**: `DELETE /auth/logout`
- **Description**: Logs out the user and invalidates the refresh token.
- **Headers**:
  - `Authorization` (string): Bearer token containing the access token.

## Docker

### Building the Docker Image

Build the Docker image:

```
docker build -t pi-auth .
```

### Running the Docker Container

Run the Docker container:

```
docker run -p 3000:3000 -d pi-auth
```

The service is available via http://localhost:3000

## Development

To try the app locally, make sure Docker is running, then start the application with:

```
npm serve
```

This will initialise a PostgreSQL database container with the database tables needed, and mount the app in another container.

It will also mount swagger at http://localhost:8080 so you can experiment with the endpoints. If you prefer postman, import the `./http-debug/pi_auth.postman_collection.json` file into Postman to test the endpoints.

If you want to run the app locally, you can stop the pi_auth service on Docker and run it from your terminal using nodemon with:

```
npm dev
```

## Testing

Run the local unit tests using:

```
npm test
```

## Deployment

...coming soon

## License

This project is licensed under the MIT license - see the LICENSE file for details.
