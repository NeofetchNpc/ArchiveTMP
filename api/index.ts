import type { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';
import fs from 'fs';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const directoryPath = path.resolve('./uploads');

  try {
    // Filter hanya file gambar, video, dan audio
    const files = fs.readdirSync(directoryPath).filter((file) =>
      /\.(png|jpg|jpeg|mp4|mkv|avi|webm|mov|mp3|wav|ogg)$/i.test(file)
    );

    if (files.length === 0) {
      return res.status(404).json({ error: 'No images, videos, or audio files found in the directory.' });
    }

    // Pilih file secara acak
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(directoryPath, randomFile);

    // Validasi apakah file ada
    if (!fs.existsSync(filePath)) {
      return res.status(500).json({ error: 'File not found on server.' });
    }

    // URL CDN-like
    const cdnUrl = `https://cdn.neastooid.xyz/uploads/${randomFile}`;

    return res.json({
      data: cdnUrl,
      status: 'success',
      creator: 'yusupkakuu',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process files.' });
  }
}
