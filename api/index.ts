import type { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';
import fs from 'fs';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const directoryPath = path.resolve('./uploaders');
  try {
    const files = fs.readdirSync(directoryPath).filter(file => /\.(png|jpg|jpeg)$/i.test(file));

    if (files.length === 0) {
      return res.status(404).json({ error: 'No images found in the directory.' });
    }

    // Randomly select a file
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const cdnUrl = `https://${req.headers.host}/${randomFile}`; // Generates CDN-like URL

    return res.json({
      data: cdnUrl,
      status: succes,
      creator: yusupkakuu
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process images.' });
  }
}
