// pages/index.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = '/api/auth';
  };

  return (
    <div>
      <h1>DeviantArt OAuth Test</h1>
      {!token ? (
        <button onClick={handleLogin}>Login with DeviantArt</button>
      ) : (
        <p>Access Token: {token}</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}