import { redirectToAuth, exchangeCodeForToken } from '../../utils/auth';
import { serialize } from 'cookie'; // Import the cookie module for serialization

export default async function handler(req, res) {
  console.log('(api/auth): Auth handler invoked with query:', req.query);
  console.log('(api/auth): Auth handler cookies:', req.cookies);
  const { code, state } = req.query;

  if (!code) {
    console.log('(api/auth): No code present, redirecting to auth');
    redirectToAuth(res);
  } else {
    try {
      console.log('(api/auth): Exchanging code for token');
      const { access_token, refresh_token } = await exchangeCodeForToken(code, state, req, res);
      console.log('(api/auth): Token exchange successful, setting cookie and redirecting to home');
      console.log('(api/auth): access_token:', access_token);

      // Set the access_token as a cookie
      res.setHeader('Set-Cookie', serialize('access_token', access_token, {
        httpOnly: true,
        secure: false, // Change to true in production
        sameSite: 'lax', // Adjust according to your needs
        path: '/', // Make sure it’s accessible on all pages
        csrf: true, // Make sure it’s accessible on all pages
        maxAge: 3600 * 24 * 30, // 30 days
        expires: new Date(Date.now() + 3600 * 24 * 30 * 1000) // 30 days
      }));
    
      res.redirect('/gallery'); // Redirect to gallery after successful login
    } catch (error) {
      console.error("api/auth: Error exchanging code for token:", error);
      res.status(500).json({ error: '(api/auth): Failed to exchange code for token', details: error.message });
    }
  }
}
