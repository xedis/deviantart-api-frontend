import React, { useEffect, useState } from 'react';
import { authenticate, fetchGalleries, fetchMetadata } from './api';
import axios from 'axios';
import mongoose from 'mongoose';

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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const deviationSchema = new mongoose.Schema({
    deviationID: String,
    metaDevID: String,
    title: String,
    link: String,
    published: String,
    mature: String,
    stats: String,
    tierDeviationID: String,
    downloadable: String,
    tierName: String,
    tierURL: String,
    galleryName: String,
    premiumGalleryID: String,
    premType: String,
    dollarPrice: String,
    numSubs: String,
    numViews: String,
    thumbsLink: String,
    matureLevel: String,
    matureClass: String,
    tags: [String],
    desc: String
});

const Deviation = mongoose.model('Deviation', deviationSchema);

export default App;
