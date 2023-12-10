var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
var express = require('express');
var path = require('path');
var http = require("http");
var mongo = require('mongoose');
var dbconnect = require('./config/dbconnection.json');


var indexRouter = require('./routes/index');
const reponserouter = require("./routes/reponse");
const reclamationrouter = require("./routes/reclamation");


//// Controller functions here used by socket.io ...
const { add} = require("./controller/reclamationcontroller,reponsecontroller");
const {
 addreclamationsoket,
 addreponsesoket
} = require("./controller/joueurcontroller");
mongo.connect(dbconnect.url, {
  useUnifiedTopology:true,
  useNewUrlParser:true,
})
    .then(() => console.log('mongo connected'))
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

app.use('/', indexRouter);
app.use("/reponse", reponserouter);
app.use("/reclamation", reclamationrouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {

  addreclamationsoket(data);
  io.emit("reclamation", data);

});
io.on("connection", (socket) => {

  addreponsesoket(data);
  io.emit("reponse", data);

});
let callback = () => console.log("Server running...");
server.listen(3000, callback);


module.exports = app;
