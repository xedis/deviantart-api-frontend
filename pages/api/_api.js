// src/api.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const BASE_URL = 'https://www.deviantart.com/api/v1/oauth2';

const DeviantArt = () => {
  const [token, setToken] = useState('');
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authorizationCode = queryParams.get('code');

    if (authorizationCode) {
      exchangeCodeForToken(authorizationCode);
    }
  }, []);

  const initiateAuthentication = () => {
    const authorizationEndpoint = `https://www.deviantart.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authorizationEndpoint;
  };

  const exchangeCodeForToken = async (authorizationCode) => {
    try {
      const response = await axios.post(`${BASE_URL}/token`, null, {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: authorizationCode,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URI,
        },
      });
      setToken(response.data.access_token);
      fetchArtworks();
    } catch (error) {
      console.error("Failed to exchange code for token:", error);
    }
  };

  const fetchArtworks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/browse`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { limit: 10 },
      });
      setArtworks(response.data.results);
    } catch (error) {
      console.error("Failed to fetch artworks:", error);
    }
  };

  return (
    <div>
      {!token ? (
        <button onClick={initiateAuthentication}>Authenticate</button>
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

