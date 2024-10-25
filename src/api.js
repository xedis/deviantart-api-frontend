import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Your DeviantArt client credentials from environment variables
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI; // Your redirect URI

const BASE_URL = 'https://www.deviantart.com/api/v1/oauth2';

const DeviantArt = () => {
  const [accessToken, setAccessToken] = useState('');
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      exchangeCodeForToken(code).then((token) => {
        setAccessToken(token);
        fetchArtworks({limit: 10}).then((artworks) => setArtworks(artworks));
      });
    }
  }, []);

  const authenticate = () => {
    const authUrl = `https://www.deviantart.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl; // Redirect user to authorize
  };

  const exchangeCodeForToken = async (code) => {
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
      setAccessToken(response.data.access_token); // Store access token
      return response.data.access_token;
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      throw error;
    }
  };

  const fetchArtworks = async (params) => {
    try {
      const response = await axios.get(`${BASE_URL}/browse`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });
      setArtworks(response.data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      throw error;
    }
  };

  const submitArt = async (artData) => {
    try {
      const response = await axios.post(`${BASE_URL}/submit`, artData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting art:", error);
      throw error;
    }
  };

  return (
    <div>
      {!accessToken ? (
        <button onClick={authenticate}>Authenticate</button>
      ) : (
        <div>
          <h1>Artworks</h1>
          <ul>
            {artworks.map((artwork) => (
              <li key={artwork.deviationid}>
                <img src={artwork.preview.src} alt={artwork.title} />
                <p>{artwork.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeviantArt;
