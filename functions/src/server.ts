import { firebaseConfig } from '../firebase/config';

import { onRequest } from 'firebase-functions/v2/https';
import { Request, Response } from 'express';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
const express = require('express');
const cors = require('cors');

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
    res.json({ ...userResponse });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('Something went wrong signing up!');
    }
  }
});

exports.nodeApi = onRequest(app);
