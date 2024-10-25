import axios from 'axios';

export default async function handler(req, res) {
  const code = req.query.code;
  const tokenEndpoint = `https://www.deviantart.com/oauth2/token`;

  try {
    const response = await axios.post(tokenEndpoint, null, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI,
      },
    });

    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
}