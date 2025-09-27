import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import admin from "firebase-admin";
import fs from "fs";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

const serviceAccount = JSON.parse(fs.read)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { messages, model, temperature } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }
    const completion = await openai.chat.completions.create({
      model: model || "gpt-4.1-mini",
      messages,
      temperature: temperature ?? 0.7,
    });
    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

let leaderboard = [

];

app.get('/api/leaderboard', async (req, res) => {
  try {
    const snapshot = await db.collection('leaderboard').orderBy('xp', 'desc').get();
    const data = snapshot.docs.map(doc => doc.data());
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('api/leaderboard', async (req, res) => {
  const { username, xp } = req.body;
  if (!username || typeof xp !== 'number') {
    return res.status(400).json({ error: 'Invalid data' });
  }
  try {
    await db.collection('leaderboard').doc(username).set({ username, xp });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));