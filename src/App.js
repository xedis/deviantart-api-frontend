import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Deviation from './models/Deviation';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const BASE_URL = 'https://www.deviantart.com/api/v1/oauth2';

function App() {
  const [token, setToken] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      authenticateUser();
    }
  }, [token]);

  const authenticateUser = async () => {
    const authUrl = `https://www.deviantart.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  const handleFetchGalleries = async () => {
    if (!token) {
      await authenticateUser();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/galleries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newGalleries = response.data.galleries;
      const deviations = newGalleries.map((gallery) => {
        const deviation = new Deviation({
          deviationID: gallery.deviationid,
          title: gallery.title,
          metaDevID: gallery.metadevid,
          link: gallery.url,
          published: gallery.published,
          mature: gallery.mature,
          stats: gallery.stats,
          tierDeviationID: gallery.tierdeviationid,
          downloadable: gallery.downloadable,
          tierName: gallery.tiername,
          tierURL: gallery.tierurl,
          galleryName: gallery.galleryname,
          premiumGalleryID: gallery.premiumgalleryid,
          premType: gallery.premtype,
          dollarPrice: gallery.dollarprice,
          numSubs: gallery.numsubs,
          numViews: gallery.numviews,
          thumbsLink: gallery.thumbslink,
          matureLevel: gallery.maturelevel,
          matureClass: gallery.matureclass,
          tags: gallery.tags,
          desc: gallery.desc,
        });
        return deviation;
      });
      await Deviation.insertMany(deviations);
      setGalleries(deviations);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>DeviantArt Gallery Fetcher</h1>
      <button onClick={handleFetchGalleries}>Fetch Galleries</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {galleries.map((gallery) => (
            <li key={gallery.deviationID}>
              <h2>{gallery.title}</h2>
              <p>{gallery.desc}</p>
              <img src={gallery.thumbsLink} alt={gallery.title} />
            </li>
          ))}
        </ul>
      )}
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : null}
    </div>
  );
}

export default App;