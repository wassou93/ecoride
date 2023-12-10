var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var path = require('path');
var http = require("http");
var mongo = require('mongoose');
var dbconnect = require('./config/dbconnection.json');
var indexRouter = require('./routes/index');
const bodyParser = require("body-parser");
const offreRouter = require("./routes/offre");
const typeRouter = require("./routes/type");
const offre = require('./models/offre');
const type = require('./models/type');

// Appel des fonctions socket du contrôleur
const { affichesocketOffre, affichesocketType } = require("./controllers/offrecontroller");

mongo.connect(dbconnect.url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connecté'))
  .catch((err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/offre', offreRouter);
app.use('/type', typeRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);

// Setting up Socket.IO
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("Utilisateur connecté");


// Événement pour les offres
socket.on("aff", async (data) => {
  try {
    const result = await affichesocketOffre(data);
    console.log("Bienvenue", result);

    if (result) {
      // Émettre les détails à l'événement 'aff' pour le client
      io.to(socket.id).emit("aff", result);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
});



  // Événement pour les types
  socket.on("aff_type", async (data) => {
    const result = await affichesocketType(data);
    console.log("Bienvenue", JSON.stringify(result));
    io.emit("aff_type", result);
  });

  app.get('/offre', async (req, res) => {
    try {
      const offres = await Offre.find();
      res.render('offre.twig', { offre });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  });
  

  // Déconnexion de l'utilisateur
  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté");
  });
});

// Démarrage du serveur
server.listen(3002, () => {
  console.log('Serveur en cours d\'exécution sur le port 3002');
});


module.exports = app;

