# Vapi Backend Server

A backend server for initializing Vapi AI voice services. This server provides a set of RESTful API endpoints to interact with Vapi's services, allowing for call creation, management, and more.

## Features

- Initialize new Vapi instances on demand
- Create and manage calls
- Retrieve call information
- List available phone numbers and assistants
- Secure your Vapi public key with environment variables

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/rirachii/vapi-backend-server.git
   cd vapi-backend-server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file to include your Vapi public key and other settings.

4. Start the server
   ```bash
   npm start
   ```
   For development with automatic restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Initialize Vapi
- **POST** `/api/initialize-vapi`
  - Body: `{ "assistantId": "...", "phoneNumberId": "...", "customer": { ... } }`

### Get Call Information
- **GET** `/api/call/:callId`

### List Calls
- **GET** `/api/calls?assistantId=...&limit=...`

### Get Phone Numbers
- **GET** `/api/phone-numbers`

### Get Assistants
- **GET** `/api/assistants`

### Delete Call
- **DELETE** `/api/call/:callId`

## Deployment

This server can be deployed to various cloud platforms including Render, Heroku, AWS, or Google Cloud. See the Deployment section in this README for more details.

## License

MIT