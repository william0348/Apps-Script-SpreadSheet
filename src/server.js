import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getFacebookShares } from './facebook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/api/shares', async (req, res) => {
  try {
    const { url } = req.query;
    const data = await getFacebookShares(url);
    res.json({
      ok: true,
      data,
    });
  } catch (error) {
    const status = error?.details?.error?.code === 4 ? 429 : 400;
    res.status(status).json({
      ok: false,
      message: error.message,
      details: error.details ?? null,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: 'Not found',
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
