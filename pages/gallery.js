import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Cookies from 'js-cookie';

const Gallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const accessToken = Cookies.get('access_token');
      const response = await axios.get(`https://www.deviantart.com/api/v1/oauth2/gallery/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data.results);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <h1>Gallery</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <TableRows data={data} />
        </table>
      )}
    </Layout>
  );
};

export default Gallery;