const express = require('express');
//const fs = require('fs');
const booksRoutes = require('./Routes/books.js');
const userRoutes = require('./Routes/user.js');
const path = require('path');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://seznecalan:VbsfYfhwuPm1lsZZ@clusterhaz.mxirf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHaz'
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
