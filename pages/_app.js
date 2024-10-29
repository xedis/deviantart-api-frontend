import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { code, error: authError } = router.query;

    if (code) {
      // Exchange code for token
      fetch('/api/auth?code=' + code)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setToken(data.access_token);
          }
        })
        .catch(err => {
          console.error('Error exchanging code for token:', err);
          setError('Failed to exchange code for token');
        });
    } else if (authError) {
      setError(authError);
    }
  }, [router.query]);

  // Wrap the Component with context providers if needed
  return (
    <Component 
      {...pageProps} 
      token={token} 
      error={error} 
      setError={setError}
    />
  );
}

export default MyApp;