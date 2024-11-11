const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image.png': 'png',
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

const uploadedImg = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (req.body.book) {
      try {
        const originalName = req.file.originalname
          .split(' ')
          .join('_')
          .replace(/\.[^/.]+$/, '');
        const extension = MIME_TYPES[req.file.mimetype];
        const fileName = `${originalName}_${Date.now()}.${extension}`;
        const outputPath = path.join(__dirname, '..', 'images', fileName);

        sharp(req.file.buffer)
          .resize(400)
          .toFormat(extension === 'png' ? 'png' : 'jpeg', { quality: 80 })
          .toFile(outputPath);

        req.file.path = outputPath;
        next();
      } catch (sharpError) {
        console.error('Erreur lors de la compression de l image ', sharpError);
        res.status(500).json({ error: "Erreur lors du traitement de l'image" });
      }
    } else {
      next();
    }
  });
};

module.exports = uploadedImg;
