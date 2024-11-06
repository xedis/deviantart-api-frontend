import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get('access_token'); // Ensure you're getting the token from cookies
    if (accessToken) {
      setIsLoggedIn(true);
      console.log('User is already logged in'); // For debugging
      window.location.href = '/gallery'; // Redirect to gallery if already logged in
    } else {
      console.log('No access token found. User is not logged in.'); // For debugging
    }
  }, []);

  const handleLogin = () => {
    window.location.href = '/api/auth'; // Redirect to the OAuth process
  };

  return (
    <div>
      <h1>Welcome to DeviantArt OAuth Demo</h1>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login with DeviantArt</button>
      ) : (
        <button onClick={() => window.location.href = '/gallery'}>Go to Gallery</button>
      )}
    </div>
  );
}


// ... existing code...
