import React, { useEffect, useState } from 'react';
import { authenticate as apiAuthenticate, fetchGalleries, fetchMetadata } from './api';
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
      const newToken = await apiAuthenticate();
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
      const newGalleries = await fetchGalleries(token); // Assuming fetchGalleries takes a token
      setGalleries(newGalleries);

      await Promise.all(newGalleries.map(async (gallery) => {
        try {
          const metadata = await fetchMetadata(token, gallery.deviationid);

          // Construct the deviation data
          const deviationData = {
            deviationId: gallery.deviationid,
            title: gallery.title,
            url: gallery.url,
            isPublished: gallery.is_published,
            isMature: gallery.is_mature,
            matureLevel: gallery.mature_level,
            matureClass: gallery.mature_class,
            stats: gallery.stats,
            tierDeviationId: gallery.primary_tier.deviationid,
            tierTitle: gallery.primary_tier.title,
            tierUrl: gallery.primary_tier.url,
            isDownloadable: gallery.is_downloadable,
            primaryTierDeviationId: gallery.primary_tier.deviationid,
            primaryTierTitle: gallery.primary_tier.title,
            primaryTierUrl: gallery.primary_tier.url,
            primaryTierIsDownloadable: gallery.primary_tier.is_downloadable,
            premiumFolderDataGalleryId: gallery.premium_folder_data.gallery_id,
            premiumFolderDataType: gallery.premium_folder_data.type,
            premiumFolderDataDollarPrice: gallery.premium_folder_data.dollar_price,
            thumbsSrc: gallery.thumbs.map((thumb) => thumb.src),
            tags: metadata.tags,
            description: metadata.description,
          };

          const response = await Deviation.create(deviationData); // Save the deviation data to MongoDB
          console.log(response);
        } catch (error) {
          console.error(`Failed to fetch metadata for gallery ${gallery.deviationid}: ${error.message}`);
        }
      }));
        } catch (err) {
      setError(`Failed to fetch galleries or metadata: ${err.message}`);
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
    <div style={{ textAlign: 'center' }}>
      <h1>DeviantArt Gallery Fetcher</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleFetchGalleries} disabled={loading} style={buttonStyle}>
        {loading ? 'Loading...' : 'Fetch Galleries'}
      </button>
      <button onClick={apiAuthenticate} style={buttonStyle}>
        Authenticate with DeviantArt
      </button>
      <div>{galleries.length > 0 && <ul>{galleries.map(gallery => <li key={gallery.id}>{gallery.name}</li>)}</ul>}</div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#0078d7',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1em',
  transition: 'background-color 0.3s ease',
  margin: '10px',
};

export default App;