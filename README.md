# DeviantArt API Frontend

This is a Next.js application that uses the DeviantArt API to fetch and display user galleries.

## Features

* Authentication with DeviantArt API using OAuth 2.0
* Fetch and display user galleries with pagination
* Error handling for API requests
* Token management with refresh token logic

## Requirements

* Node.js 14+
* Next.js 12+
* DeviantArt API credentials (client ID and client secret)

## Setup

1. Clone the repository and install dependencies with `npm install`
2. Create a `.env` file with your DeviantArt API credentials (client ID and client secret)
3. Run the application with `npm run dev`
4. Open your browser and navigate to `http://localhost:3000`

## API Routes

* `/api/auth`: Authentication route for DeviantArt API
* `/api/gallery`: Fetch user gallery route

## Notes

* This application uses the `utils/auth.js` file to handle authentication and token management.
* The `pages/api/auth.js` file handles the authentication route and redirects to the gallery route after successful authentication.