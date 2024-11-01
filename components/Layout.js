// components/Layout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviationTable from './DeviationTable';

const Layout = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    const response = await axios.get('/api/gallery');
    setData(response.data);
    setLoading(false);
  };

  return (
    <div>
      <h1>DeviantArt Gallery Fetcher</h1>
      <button onClick={handleButtonClick}>Retrieve Gallery Info</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <DeviationTable data={data} />
        </table>
      )}
    </div>
  );
};

export default Layout;