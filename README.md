# pi-auth

An Node Express app to handle basic authentication and authorisation, with access and refresh tokens.

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
- pnpm (or npm/yarn)
- Docker
- Postman (for local testing)

## Getting Started

### Installation

Clone the repository:

```
git clone https://github.com/lancerael/pi-auth.git
cd your-repository
```

Install dependencies:

```
pnpm install
```

### Usage

To try the app locally, make sure Docker is running, then start the application with:

```
npm serve
```

This will initialise a PostgreSQL database container with the database tables needed:

- **pi_users** - stores the user info
- **pi_token_whitelist** - a whitelist for the valid tokens

It will then mount the app in another container.

Import the `pi_auth.postman_collection.json` into Postman to test the endpoints:

- signup - adds a new user
- login - logs the user in to get access/refresh tokens
- validate - checks the access token
- refresh - uses the refresh token to refresh the access/refresh tokens
- logout - invalidate the tokens

## Docker

### Building the Docker Image

Build the Docker image:

docker build -t pi-auth .

### Running the Docker Container

Run the Docker container:

docker run -p 3000:3000 -d pi-auth

Visit http://localhost:3000 in your web browser.

## Development

## Testing

Run the local unit tests using:

```
pnpm test
```

## Deployment

## License

This project is licensed under the MIT license - see the LICENSE file for details.
