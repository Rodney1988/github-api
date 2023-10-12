import { onRequest } from 'firebase-functions/v2/https';
import { Request, Response } from 'express';

const express = require('express');
const admin = require('firebase-admin');
const app = express();
const jwt = require('jsonwebtoken');
const { defineString } = require('firebase-functions/params');

admin.initializeApp();

app.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const tokenKey = defineString(process.env.TOKEN_KEY);

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
    const customToken = jwt.sign({ uid: userId }, tokenKey);

    res.json({ ...userResponse, customToken });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('Something went wrong signing up!');
    }
  }
});

exports.nodeApi = onRequest(app);
