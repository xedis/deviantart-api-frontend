import App from 'next/app';
import React from 'react';
import axios from 'axios';
import Deviation from './Deviation';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const BASE_URL = 'https://www.deviantart.com/api/v1/oauth2';

function MyApp({ Component, pageProps }) {
  const [token, setToken] = React.useState(null);
  const [galleries, setGalleries] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      exchangeCodeForToken(code);
    } else if (!token) {
      authenticateUser();
    }
  }, [token]);

  const authenticateUser = () => {
    const authUrl = `https://www.deviantart.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.post(`${BASE_URL}/token`, null, {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URI,
        },
      });
      setToken(response.data.access_token);
      handleFetchGalleries(response.data.access_token);
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      setError(error.message);
    }
  };

  const handleFetchGalleries = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/galleries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 10, // Add pagination limit
          offset: 0, // Add pagination offset
        },
      });

      const newGalleries = response.data.galleries.map(gallery => new Deviation(gallery));
      await Deviation.insertMany(newGalleries);
      setGalleries(newGalleries);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>DeviantArt Gallery Fetcher</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={() => handleFetchGalleries(token)}>Fetch Galleries</button>
          <ul> 
            {galleries.map(gallery => (
              <li key={gallery.deviationID}>
                <h2>{gallery.title}</h2>
                <p>{gallery.username}</p>
                <p>{gallery.date}</p>
                <p>{gallery.deviationID}</p>
                <img src={gallery.thumbsLink} alt={gallery.title} />
                <p>{gallery.desc}</p>
                <p>{gallery.url}</p>
                <p>{gallery.deviationType}</p>
                <p>{gallery.premiumDeviationID}</p>
                <p>{gallery.premiumType}</p>
                <p>{gallery.price}</p>

                <p>{gallery.subs}</p>
                <p>{gallery.views}</p>
                <p>{gallery.thumbsLink}</p>
                <p>{gallery.matureLevel}</p>
                <p>{gallery.matureClass}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default MyApp;