const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');
const BookCtrl = require('../controllers/books.js');

router.get('/', BookCtrl.getAllBook);
router.post('/', auth, multer, BookCtrl.addBook);
router.get('/bestrating', BookCtrl.bestRating);
router.get('/:id', BookCtrl.getOneBook);
router.put('/:id', auth, multer, BookCtrl.modifyBook);
router.delete('/:id', auth, BookCtrl.deleteBook);
router.post('/:id/rating', auth, BookCtrl.Rating);

module.exports = router;
