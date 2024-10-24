import axios from 'axios';

// Your DeviantArt client credentials from environment variables
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI; // Your redirect URI

let ACCESS_TOKEN = ''; // Access token to be set after authentication
const BASE_URL = 'https://www.deviantart.com/api/v1/oauth2';

// Function to initiate the OAuth flow. Redirects the user to DeviantArt's authorization page
export const authorize = () => {
  const authUrl = `https://www.deviantart.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  window.location.href = authUrl; // Redirect user to authorize
};

// Function to exchange the authorization code for an access token
export const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post('https://www.deviantart.com/oauth2/token', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      },
    });
    ACCESS_TOKEN = response.data.access_token; // Store access token
    return ACCESS_TOKEN;
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    throw error;
  }
};

export const fetchArtworks = async (params) => {
  try {
    const response = await axios.get(`${BASE_URL}/browse`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error;
  }
};

export const submitArt = async (artData) => {
  try {
    const response = await axios.post(`${BASE_URL}/submit`, artData, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting art:", error);
    throw error;
  }
};

// Fetch the user's galleries
export const fetchGalleries = async (token) => {
    const response = await axios.get('https://www.deviantart.com/api/v1/oauth2/gallery/all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.results;  // Adjust based on the actual response structure
  };
  
  // Fetch metadata for a specific deviation
  export const fetchMetadata = async (token, deviationId) => {
    const response = await axios.get('https://www.deviantart.com/api/v1/oauth2/deviation/metadata', {
      params: { deviationids: deviationId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.metadata;  // Adjust based on the actual response structure
  };