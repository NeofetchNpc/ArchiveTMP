import type { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';
import fs from 'fs';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const directoryPath = path.resolve('./uploads');

  try {
    // Baca semua file dalam folder 'uploaders' dan filter hanya gambar atau video
    const files = fs.readdirSync(directoryPath).filter((file) =>
      /\.(png|jpg|jpeg|mp4|mkv|avi|webm|mov)$/i.test(file)
    );

    if (files.length === 0) {
      return res.status(404).json({ error: 'No images or videos found in the directory.' });
    }

    // Pilih file secara acak
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const cdnUrl = `https://${req.headers.host}/${randomFile}`; // URL CDN-like

    return res.json({
      data: cdnUrl,
      status: 'success',
      creator: 'yusupkakuu',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process files.' });
  }
}
