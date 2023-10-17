import { onRequest } from 'firebase-functions/v2/https';
import { Request, Response } from 'express';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const express = require('express');
const cors = require('cors');

const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE || 'mock_key',
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
initializeApp(firebaseConfig);
const auth = getAuth();

const app = express();
app.use(cors());

app.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Email and password are required');
  }

  try {
    const userResponse = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    res.json(userResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('Something went wrong signing up!');
    }
  }
});

exports.nodeApi = onRequest(app);
