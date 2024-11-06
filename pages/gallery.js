// pages/gallery.js
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const gallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = Cookies.get('access_token'); // Access the token from cookies
    console.log('gallery: accessToken:', accessToken);

    useEffect(() => {
        const fetchGallery = async () => {
            if (!accessToken) {
                setError('Access token is missing. Please login again.');
                setLoading(true);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch('https://www.deviantart.com/api/v1/oauth2/gallery?username=x-the-void-x', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }

                const data = await response.json();
                setGalleryItems(data.gallery || []);
            } catch (err) {
                setError(`Error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, [accessToken]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Gallery</h1>
            <div className="gallery">
                {galleryItems.map(item => (
                    <div key={item.id} className="gallery-item">
                        <img src={item.thumbnail} alt={item.title} />
                        <h2>{item.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default gallery;
