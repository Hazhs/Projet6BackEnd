const express = require("express");

const app = express();

//Permet à Express de prendre les requêtes avec Content-type = application/json et associe le body à l'objet req
app.use(express.json());

//Permet de recevoir des requêtes d'un localhost différent (!3000 par exemple)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  console.log("requête reçue");
  next();
});

//GET
// app.use('/api/stuff', (req, res, next) => {
//   const stuff = 1;

//   res.status(200).json(stuff);
// });

//POST
// app.post('/api/stuff', (req, res, next) => {
//   console.log(req.body);
//   res.status(201).json({
//     message: 'Objet créé !'
//   });
// });

app.use((req, res) => {
  console.log("réponse envoyé avec succès");
});

module.exports = app;
