import axios from 'axios';
import crypto from 'crypto';
import { serialize } from 'cookie';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const STATE_LENGTH = 32;

const generateState = () => crypto.randomBytes(STATE_LENGTH).toString('hex');

const redirectToAuth = (res) => {
  const state = generateState();
  console.log('Generated state:', state);
  const authUrl = `https://www.deviantart.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=gallery+browse+publish&state=${state}`;
  res.setHeader('Set-Cookie', serialize('state', state, { httpOnly: true, secure: true, sameSite: 'strict' }));
  res.redirect(authUrl);
};

const exchangeCodeForToken = async (code, state, req, res) => {
  try {
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
    console.log('Token response:', response.data);

    res.setHeader('Set-Cookie', [
      serialize('access_token', access_token, { httpOnly: true, secure: true, sameSite: 'strict' }),
      serialize('refresh_token', refresh_token, { httpOnly: true, secure: true, sameSite: 'strict' }),
    ]);

    return { access_token, refresh_token };
  } catch (error) {
    console.error('Error exchanging code for token:', error.message);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

export { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, STATE_LENGTH, generateState, redirectToAuth, exchangeCodeForToken };