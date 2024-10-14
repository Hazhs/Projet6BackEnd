const Book = require('../models/book.js');

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    // id: req.body.id,
    // title: req.body.title,
    // author: req.body.author,
    // imageUrl: req.body.imageUrl,
    // year: req.body.year,
    // genre: req.body.genre,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: 'Livre créé' });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneBook = (req, res, next) => {
  const selectedBook = Book.find({ _id: req.body.id });
  selectedBook.then(() => {
    res
      .status(200)
      .json({ selectedBook })
      .catch((error) => {
        res.status(400).json({ error });
      });
  });
};

exports.modifyBook = (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: 'livre supprimé' });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllBook = (req, res, next) => {
  console.log('req for books array received');
  Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.setNewRating = (req, res, next) => {
  console.log('nouvel note ajouté');
};
