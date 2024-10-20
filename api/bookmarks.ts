import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from '../src/lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const bookmarks = await sql`SELECT * FROM bookmarks ORDER BY id DESC`;
      res.status(200).json(bookmarks);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      res.status(500).json({ error: 'Failed to fetch bookmarks' });
    }
  } else if (req.method === 'POST') {
    const { title, url, description } = req.body;
    try {
      const newBookmark = await sql`
        INSERT INTO bookmarks (title, url, description)
        VALUES (${title}, ${url}, ${description})
        RETURNING *
      `;
      res.status(201).json(newBookmark[0]);
    } catch (error) {
      console.error('Error adding bookmark:', error);
      res.status(500).json({ error: 'Failed to add bookmark' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}