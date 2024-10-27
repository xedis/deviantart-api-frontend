import App from 'next/app';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { redirectToAuth, exchangeCodeForToken } from '../utils/auth';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const BASE_URL = 'https://www.deviantart.com/api/v1/oauth2';

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code) {
      exchangeCodeForToken(code, state, document.cookie)
        .then(({ access_token }) => {
          setToken(access_token);
          handleFetchGalleries(access_token);
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error);
          setError(error.message);
        });
    } else if (!token) {
      redirectToAuth(window.location);
    }
  }, [token]);

  const handleFetchGalleries = async (accessToken) => {
    if (!accessToken) {
      throw new Error('No token provided');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/galleries`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 10, // Add pagination limit
          offset: 0, // Add pagination offset
        },
      });

      if (!response.data || !response.data.results) {
        throw new Error('No response data or results');
      }

      const newGalleries = response.data.results.map(gallery => new Deviation(gallery));
      setGalleries(newGalleries);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return <Component {...pageProps} token={token} galleries={galleries} />;
}

export default MyApp;