import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { code, error: authError, state } = router.query;
  
    if (code) {
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

  useEffect(() => {
    if (token) {
      // Save token in cookies
      document.cookie = `access_token=${token}; path=/;`;
    }
  }, [token]);

  return (
    <Component {...pageProps} />
  )
}

export default MyApp
