// pages/gallery.js
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Function to fetch gallery data
const fetchGalleryData = async (accessToken) => {
    console.log('Fetching gallery data with access token:', accessToken);
    
    const response = await fetch('https://www.deviantart.com/api/v1/oauth2/gallery?username=x-the-void-x', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty'
        }
    });

    if (!response.ok) {
        const errorBody = await response.text();  // Get error response body as text
        console.error('Fetching gallery failed:', response.status, errorBody); // Log status and error body
        throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gallery data fetched successfully:', data); // Log the retrieved data
    return data;
};

const Gallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = Cookies.get('access_token');

    console.log('Gallery component mounted. Access Token:', accessToken); // Log mounted state and access token

    useEffect(() => {
        const fetchGallery = async () => {
            if (!accessToken) {
                console.warn('Access token is missing. Prompting user to log in.');
                setError('Access token is missing. Please login again.');
                setLoading(false);
                return;
            }

            setLoading(true);
            console.log('Starting gallery data fetch...');
            try {
                const data = await fetchGalleryData(accessToken);
                setGalleryItems(data.gallery || []);
                console.log('Gallery items set successfully:', data.gallery); // Log gallery items
            } catch (err) {
                console.error('Error occurred while fetching gallery data:', err); // More detailed error logging
                setError(`Error: ${err.message}`);
            } finally {
                setLoading(false);
                console.log('Data fetching completed. Loading state set to false.'); // Log when loading is finished
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

export default Gallery;
