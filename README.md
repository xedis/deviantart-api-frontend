### TASK/GOAL/WHAT THE FUCK WE ARE DOING!
Web app that leverages deviantart's api to authenticate for the purposes of retrieving all of a users images they have posted, responses will be parsed into mongodb and then displayed to the user.
Once retrieved the user should be able to see a thumbnail of each and modifiable fields for the data retrieved that is populated into mongodb. 
At any time during modifying the user should be able to push the modified data back into deviantart. 

### !!!!IMPORTANT!!!!
If providing code changes, provide only the full modified file.
### !!!!IMPORTANT!!!!

### HTML Files

#### `public/index.html`
- **Core Structure:**
  - Basic HTML5 template for the React app (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`).
  - Includes meta tags for charset, viewport, theme color, and description.
  - Links to favicon, apple-touch-icon, and manifest.json.
  - An empty `<div id="root"></div>` where the React app is rendered.

### JSON Files

#### `public/manifest.json`
- **PWA Configuration:**
  - `short_name`: "React App".
  - `name`: "Create React App Sample".
  - Icons for the application with their sizes and types.
  - Entry points for the app: 
    - `start_url`: The root URL when launched.
    - `display`: Standalone for a full app experience.
  - Theme and background colors defined.

#### `public/robots.txt`
- **Robots Exclusion Standard:**
  - `User-agent: *` allows all.
  - `Disallow:` allows all crawlers.

### CSS Files

#### `src/App.css`
- **Styles Application:**
  - Centers content and sets text styles for the app.
  - Defines animation and styles for the app logo and header.

#### `src/index.css`
- **Global Styles:**
  - Resets margin and sets a common font family for the body content.

#### `src/styles.css`
- **Component Styles:**
  - Styles for form elements, buttons, and positioning of the app container.
  
### JavaScript Files

#### `src/App.js`
- **Main Functionality:**
  - Integrates with DeviantArt API for authentication and fetching galleries.
  - State management for `token`, `loading`, and `error`.
  - `useEffect` to handle OAuth flow and store access token.
  - `handleFetchGalleries` to fetch galleries and their metadata.

#### `src/App.test.js`
- **Testing Reference:**
  - Verifies that a specific text is rendered in the app.

#### `src/api.js`
- **API Interaction Functions:**
  - `authorize`: Redirects user to DeviantArt for authorization.
  - `exchangeCodeForToken`: Exchanges the authorization code for an access token.
  - `fetchArtworks`: Fetches artwork data using the access token.
  - `fetchGalleries`: Retrieves user galleries.
  - `fetchMetadata`: Gets metadata for a specific deviation.

#### `src/index.js`
- **Application Entry Point:**
  - Renders the `App` component and initializes performance measuring via `reportWebVitals`.

#### `src/reportWebVitals.js`
- **Performance Monitoring:**
  - Handles reporting of web vital metrics.

#### `src/setupTests.js`
- **Testing Setup:**
  - Adds custom matchers for testing DOM elements.

### Server Files

#### `deviantart-auth-server/server.js`
- **Express Server Setup:**
  - Sets up CORS for frontend requests.
  - Handles the OAuth callback to exchange authorization code for an access token.
  - Connects to MongoDB using Mongoose.
  - Defines the `Deviation` schema for storing DeviantArt data.

#### `deviantart-auth-server/package.json`
- **Server Configuration:**
  - Lists dependencies (axios, cors, dotenv, express, mongoose).
  - Defines scripts for the server.

#### `deviantart-auth-server/.env`
- **Environment Variables:**
  - `MONGO_URI`: Connection string for MongoDB.
  - OAuth credentials (`CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI`).

### Additional Notes
- **OAuth Flow:**
  - The application uses OAuth 2.0 for authentication, redirecting users to log in and granting access to their galleries.
- **Error Handling:** 
  - Errors are logged and returned in API functions to aid debugging.

This cheatsheet compiles essential information for each file, which can serve as a quick reference for your project. Feel free to save it as needed!