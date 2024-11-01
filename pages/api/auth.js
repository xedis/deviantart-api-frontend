import { redirectToAuth, exchangeCodeForToken } from '../../utils/auth';

/**
 * Handles authorization code flow for DeviantArt API.
 *
 * If no code is present, redirects to DeviantArt authorization page.
 * If a code is present, exchanges it for an access token and redirects to /gallery.
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @return {Promise<void>} Resolves when the request has been handled.
 */
export default async function handler(req, res) {
  console.log('Auth handler called with query:', req.query);
  console.log('Auth handler cookies:', req.cookies);
  const { code, state } = req.query;

  if (!code) {
    console.log('No code present, redirecting to auth');
    redirectToAuth(res);
  } else if (!state) {
    console.error("No state present in query, can't exchange code for token");
    res.status(400).json({ error: 'No state present in query, can\'t exchange code for token' });
  } else {
    try {
      console.log('Exchanging code for token');
      await exchangeCodeForToken(code, state, req, res);
      console.log('Token exchange successful, redirecting to home');
      res.redirect('/gallery');
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      res.status(500).json({ error: 'Failed to exchange code for token', details: error.message });
    }
  }
}
