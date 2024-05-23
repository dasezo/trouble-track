# TroubleTrack

TroubleTrack is a bug tracking and error reporting platform designed to assist developers in tracking, managing, and resolving frontend errors efficiently. This repository contains both the backend (API) and frontend (client) components of the TroubleTrack platform.

## Getting Started

Follow the instructions below to set up and run the TroubleTrack platform on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js
- pnpm (Package manager)
- MongoDB (for the backend)

### Clone the Repository

```bash
git clone https://github.com/dasezo/trouble-track.git
cd troubletrack
```

### Setting Up the API

- Navigate to the api directory:

```bash
    cd api
```

Install dependencies

```bash
  pnpm install
```

Copy the sample environment file

```bash
    cp .env.sample .env
```

Edit the .env file and set the necessary environment variables (e.g., database connection string, port, etc.).

#### Start the API server:

```bash
    pnpm start:dev
```

The API server should now be running on the configured port.

### Setting Up the Client

Navigate to the client directory:

```bash
    cd ../client
```

Install the dependencies:

```bash
    pnpm install
```

Copy the sample environment file

```bash
    cp .env.sample .env
```

Edit the .env file and set the necessary environment variables (e.g., API base URL).
Start the Vite development server:

```bash
    pnpm dev
```

The client application should now be running on the configured port.
