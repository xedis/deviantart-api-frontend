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
  res.setHeader('Set-Cookie', serialize('state', state, { httpOnly: true, secure: true, sameSite: 'strict' }));
  res.redirect(authUrl);
};

export const exchangeCodeForToken = async (code, state, req, res) => {
  try {
    console.log('exchangeCodeForToken called with code:', code, 'and state:', state);
    const savedState = req.cookies.state;
    console.log('Received state:', state);
    console.log('Saved state:', savedState);
    if (state !== savedState) {
      throw new Error('Invalid state');
    }

    console.log('Exchanging code for token');
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

    console.log('Token response:', response.data);
    const { access_token, refresh_token } = response.data;

    res.setHeader('Set-Cookie', [
      serialize('access_token', access_token, { httpOnly: true, secure: true, sameSite: 'strict' }),
      serialize('refresh_token', refresh_token, { httpOnly: true, secure: true, sameSite: 'strict' }),
    ]);

    return { access_token, refresh_token };
  } catch (error) {
    console.error('Error in exchangeCodeForToken:', error.message);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};