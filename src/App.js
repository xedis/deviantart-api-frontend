import React, { useEffect, useState } from 'react';
import { authenticate as Authenticate, fetchGalleries, fetchMetadata } from './api';
import axios from 'axios';
import mongoose from 'mongoose';

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose schema and model
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

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [galleries, setGalleries] = useState([]);

  const authenticateUser = async () => {
    try {
      const newToken = await Authenticate();
      setToken(newToken);
    } catch (err) {
      setError(`Failed to authenticate: ${err.message}`);
    }
  };

  const handleFetchGalleries = async () => {
    if (!token) {
      await authenticateUser();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newGalleries = await fetchGalleries(token);
      setGalleries(newGalleries);
      await Promise.all(newGalleries.map(async (gallery) => {
        const metadata = await fetchMetadata(token, gallery.deviationid);
        return axios.post('/api/deviations', {
          deviationId: gallery.deviationid,
          title: gallery.title,
          url: gallery.url,
          views: metadata.views,
          // Add more fields as needed
        });
      }));
    } catch (err) {
      setError(`Failed to fetch galleries or metadata: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchMetadata = async (deviationId) => {
    if (!token) {
      await authenticateUser();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const metadata = await fetchMetadata(token, deviationId);
      console.log(metadata);
    } catch (err) {
      setError(`Failed to fetch metadata: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTokenFromUrl = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await axios.post('/api/token', { code });
          setToken(response.data.access_token);
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (err) {
          setError(`Authentication failed: ${err.message}`);
        }
      }
    };

    fetchTokenFromUrl();
  }, []);

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
