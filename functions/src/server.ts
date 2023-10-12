import { onRequest } from 'firebase-functions/v2/https';
import { Request, Response } from 'express';

const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const app = express();

admin.initializeApp();

app.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Email and password are required');
  }
  try {
    const userResponse = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
      disabled: false,
    });
    const userId = userResponse.uid;
    const customToken = jwt.sign({ uid: userId }, process.env.TOKEN_KEY);

    res.json({ ...userResponse, customToken });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('Something went wrong signing up!');
    }
  }
});

/* Setting cors to true removed the CORS error */

exports.nodeApi = onRequest({ cors: true }, app);
