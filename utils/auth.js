import axios from 'axios';
import crypto from 'crypto';
import { serialize } from 'cookie';
import sqlite3 from 'sqlite3';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const STATE_LENGTH = 32;
const DB_FILE = process.env.NEXT_PUBLIC_DB_FILE;

const generateState = () => crypto.randomBytes(STATE_LENGTH).toString('hex');
const generateSessionId = () => crypto.randomBytes(STATE_LENGTH).toString('hex');

const redirectToAuth = (res) => {
  const state = generateState();
  const sessionId = generateSessionId();
  console.log('Generated state:', state);
  const authUrl = `https://www.deviantart.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=gallery+browse+publish&state=${state}`;
  res.setHeader('Set-Cookie', serialize('state', state, { httpOnly: true, secure: true, sameSite: 'strict' }));
  res.redirect(authUrl); 
  const db = new sqlite3.Database(DB_FILE);
  console.log('Connected to database', DB_FILE);
  db.run('INSERT INTO sessions (id, state) VALUES (?, ?)', sessionId, state, (err) => {
    if (err) {
      console.error('Failed to insert session into database:', err);
    } else {
      console.log('Inserted session into database');
    }
  });
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

    const db = new sqlite3.Database(DB_FILE);
    console.log('Connected to database', DB_FILE);

    db.run('INSERT INTO tokens (sessionId, accessToken, refreshToken, state, createdAt, updatedAt) VALUES ( $sessionId, $access_token, $refresh_token, $state, $createdAt, $updatedAt)', {
      $access_token: access_token,
      $refresh_token: refresh_token,
      $state: state,
      $sessionId: req.sessionId,
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
    }, (err) => {
      if (err) {
        console.error('Error storing token in database:', err.message);
      }
    })

    db.close();
    return { access_token, refresh_token };
  } catch (error) {
    console.error('Error exchanging code for token:', error.message);
    console.error('Error response:', error.response?.data);
    throw error;
  } 
};

export const handleRedirectCallback = async (req, res) => {
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const accessToken = urlParams.get('access_token');
  const stateParam = urlParams.get('state');

  if (accessToken) {
    // Set token in cookies
    res.setHeader('Set-Cookie', serialize('access_token', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' }));
  }
<<<<<<< HEAD

  if (stateParam) {
    // Handle state parameter (if necessary)
  }

  // Redirect to home page
  res.redirect('/');
};
=======
};

export { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, STATE_LENGTH, generateState, redirectToAuth, exchangeCodeForToken };
>>>>>>> main
