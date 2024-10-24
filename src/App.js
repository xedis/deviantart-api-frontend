import React, { useEffect, useState } from 'react';
import { authenticate, fetchGalleries, fetchMetadata } from './api';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      axios.post('/api/token', { code })
        .then((response) => {
          setToken(response.data.access_token);
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(err => {
          setError('Authentication failed: ' + err.message);
        });
    }
  }, []);

  const handleFetchGalleries = async () => {
    if (!token) {
      authenticate();
      return;
    }

    setLoading(true);
    setError('');

    try {
      const galleries = await fetchGalleries(token);

      for (const gallery of galleries) {
        const metadata = await fetchMetadata(token, gallery.deviationid);
        await axios.post('/api/deviations', {
          deviationId: gallery.deviationid,
          title: gallery.title,
          url: gallery.url,
          views: metadata.views,
          // Add more fields as needed
        });
      }
    } catch (err) {
      setError('Failed to fetch galleries or metadata: ' + err.message);
    } finally {
      setLoading(false);
    }
      }
  };
  app.post('https://www.deviantart.com/api/v1/oauth2/gallery/all', async (req, res) => {
    try {
      const newDeviation = new Deviation(req.body);
      await newDeviation.save();
      res.status(200).json(newDeviation);
    } catch (error) {
      res.status(500).json({ error: 'Error saving deviation' });
    }
  });
  return (
    <div>
      <h1>DeviantArt Gallery Fetcher</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleFetchGalleries} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Artworks'}
      </button>
    </div>
  );
};

export default App;
