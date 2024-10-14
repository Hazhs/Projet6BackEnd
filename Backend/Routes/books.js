const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');
const BookCtrl = require('../controllers/books.js');

// #######################################
// #### Requête sans authentification ####
// #######################################

// ### Requête POST ###
// Sign Up ('/api/auth/signup')
// Login ('/api/auth/login')

router.get('/', BookCtrl.getAllBook);
router.get('/:id', BookCtrl.getOneBook);
//router.get('/bestrating', BookCtrl.bestRatedBooks);
router.post('//id', auth, multer, BookCtrl.createBook);
router.put('/:id', auth, BookCtrl.modifyBook);
router.delete('/:id', auth, BookCtrl.deleteBook);
//router.post('/:id/rating', auth, BookCtrl.setNewRating);

module.exports = router;
