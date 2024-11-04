// pages/api/accommodation/[id]/images.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;

  // Define the directory path based on accommodation ID
  const imagesDirectory = path.join(
    process.cwd(),
    'public',
    'images',
    'accommodation',
    id.toString()
  );

  try {
    // Read all files in the directory
    const files = fs.readdirSync(imagesDirectory);

    // Filter out non-image files if necessary
    const imageFiles = files.filter((file) =>
      ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(
        path.extname(file).toLowerCase()
      )
    );

    // Construct image URLs
    const imageUrls = imageFiles.map(
      (file) => `/images/accommodation/${id}/${file}`
    );

    res.status(200).json({ images: imageUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load images' });
  }
}
