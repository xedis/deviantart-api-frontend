// src/api.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const BASE_URL = 'https://www.deviantart.com/api/v1/oauth2';

const DeviantArt = () => {
  const [token, setToken] = useState('');
  const [artList, setArtList] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authCode = queryParams.get('code');

    if (authCode) {
      requestToken(authCode);
    }
  }, []);

  const initiateAuth = () => {
    const authEndpoint = `https://www.deviantart.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authEndpoint;
  };

  const requestToken = async (authCode) => {
    try {
      const response = await axios.post(`${BASE_URL}/token`, null, {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: authCode,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URI,
        },
      });
      setToken(response.data.access_token);
      retrieveArtworks();
    } catch (error) {
      console.error("Failed to exchange code for token:", error);
    }
  };

  const retrieveArtworks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/browse`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { limit: 10 },
      });
      setArtList(response.data.results);
    } catch (error) {
      console.error("Failed to fetch artworks:", error);
    }
  };

  return (
    <div>
      {!token ? (
        <button onClick={initiateAuth}>Authenticate</button>
      ) : (
        <div>
          <h1>Artworks</h1>
          <ul>
            {artList.map((art) => (
              <li key={art.deviationid}>
                <img src={art.preview.src} alt={art.title} />
                <p>{art.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeviantArt;

