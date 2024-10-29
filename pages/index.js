// pages/index.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * A Next.js page that displays a list of a user's DeviantArt deviations.
 *
 * If the user is not logged in, it displays a "Login with DeviantArt" button.
 * If the user is logged in, it displays a list of their deviations.
 *
 * @return {ReactElement} The page element.
 */
export default function Home() {
  const [token, setToken] = useState(null);
  const [deviations, setDeviations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve tokens from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      setToken(accessToken);
      fetchDeviations(accessToken);
    }
  }, []);

  /**
   * Redirects the user to the login page.
   */
  const handleLogin = () => {
    window.location.href = 'https://da.xedis.net:5000/login';
  };

  /**
   * Fetches the user's deviations from DeviantArt.
   *
   * @param {string} accessToken The access token for the user.
   *
   * @return {Promise<void>} Resolves when the deviations are fetched.
   */
  const fetchDeviations = async (accessToken) => {
    try {
      const response = await axios.get('https://www.deviantart.com/api/v1/oauth2/gallery/all', {
        params: {
          access_token: accessToken,
          limit: 20,
        },
      });

      if (response.data && response.data.results) {
        setDeviations(response.data.results);
      } else {
        setError('Failed to fetch deviations.');
      }
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
