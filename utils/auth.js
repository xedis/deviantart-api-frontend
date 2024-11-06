// pages/api/auth.js
import axios from 'axios';
import crypto from 'crypto';
import { serialize } from 'cookie';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const STATE_LENGTH = 32;

const generateState = () => crypto.randomBytes(STATE_LENGTH).toString('hex');

export const redirectToAuth = (res) => {
  const state = generateState();
  console.log('Generated state:', state);
  const authUrl = `https://www.deviantart.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=gallery+browse+publish&state=${state}`;
  res.setHeader('Set-Cookie', serialize('state', state, { httpOnly: true, secure: false, sameSite: 'lax' }));
  res.redirect(authUrl);
};

export const exchangeCodeForToken = async (code) => {
  const tokenEndpoint = `https://www.deviantart.com/oauth2/token`;
  const response = await axios.post(tokenEndpoint, new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { access_token, refresh_token } = response.data;
  console.log('(utils/auth):URLSearchParams.get(accesstoken):', access_token);
  return { access_token, refresh_token };
};

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) {
    redirectToAuth(res);
  } else {
    try {
      const { access_token } = await exchangeCodeForToken(code);
      res.setHeader('Set-Cookie', serialize('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax', // Adjust according to your needs
        path: '/gallery',
        csrf: true, // Make sure it’s accessible on all pages
    }));
    
      res.redirect('/gallery'); // Redirect to gallery after successful login
    } catch (error) {
      console.error("(utils/auth): Error exchanging code for token:", error);
      res.status(500).json({ error: 'Failed to exchange code for token', details: error.message });
    }
  }
}
