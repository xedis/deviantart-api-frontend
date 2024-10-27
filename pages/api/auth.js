import { redirectToAuth, exchangeCodeForToken } from '../../utils/auth';

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    redirectToAuth(res);
  } else {
    try {
      await exchangeCodeForToken(code, state, req, res);
      res.redirect('/');
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      res.status(500).json({ error: 'Failed to exchange code for token' });
    }
  }
}