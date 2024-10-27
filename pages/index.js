// pages/index.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [token, setToken] = useState(null);
  const [deviations, setDeviations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve tokens from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get('access_token');

    if (access_token) {
      setToken(access_token);
      fetchDeviations(access_token);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = 'https://da.xedis.net:5000/login';
  };

  const fetchDeviations = async (accessToken) => {
    try {
      const response = await axios.get('https://www.deviantart.com/api/v1/oauth2/gallery/all', {
        params: {
          access_token: accessToken,
          limit: 20,
        },
      });

      setDeviations(response.data.results);
    } catch (error) {
      setError('Failed to fetch deviations.');
    }
  };

  return (
    <div>
      <h1>Your Deviations</h1>
      {!token ? (
        <button onClick={handleLogin}>Login with DeviantArt</button>
      ) : (
        <>
          {error && <p>{error}</p>}
          <ul>
            {deviations.map((deviation) => (
              <li key={deviation.id}>
                <a href={deviation.url}>{deviation.title}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}