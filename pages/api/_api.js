import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { redirectToAuth, exchangeCodeForToken } from '../../utils/auth';

const DeviantArt = () => {
  const [token, setToken] = useState('');
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authorizationCode = queryParams.get('code');
    const state = queryParams.get('state');

    const fetchTokenAndArtworks = async () => {
    if (authorizationCode) {
    try {
          const { access_token } = await exchangeCodeForToken(authorizationCode, state, document.cookie);
          setToken(access_token);
          fetchArtworks(access_token);
    } catch (error) {
          console.error("Failed to exchange code for token:", error);
    }
      } else {
        redirectToAuth(window.location);
      }
  };

    fetchTokenAndArtworks();
  }, []);

  const fetchArtworks = async (accessToken) => {
    try {
      const response = await axios.get('https://www.deviantart.com/api/v1/oauth2/gallery/all', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
      {/* Render your artworks here */}
      {artworks.map((artwork) => (
        <div key={artwork.id}>{artwork.title}</div>
      ))}
    </div>
  );
};

export default DeviantArt;