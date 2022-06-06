import functions from "firebase-functions";
import express from "express";
import cors from 'cors';

import {getMessages, postMessage} from './src/messages.js'

const app = express();
app.use(cors());
app.use(express.json())

//routes

app.get('/messages', getMessages)
app.post('/messages/post', postMessage)

export const api = functions.https.onRequest(app);