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
var reservationrouter=require("./routes/reservation");
var vehiculeroute=require("./routes/vehicule");
//// Routes here ...
var userRouter = require('./routes/user_routes');

//// Controller functions here used by socket.io ...
const { checkCredentials, getUserDetails, updateUserStatus } = require('./controllers/user_controller')

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
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use("/reservation",reservationrouter);
app.use("/vehicule",vehiculeroute);
//// Assign endpoints to routes here ...
app.use('/users', userRouter);

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

  //// Socket events here...
  console.log('User connected');

  //// Socket events here...
  console.log('User connected');

  // Handle login event
  socket.on('login', async (credentials) => {
    // Check username and password (implement your authentication logic)
    const isValid = await checkCredentials(credentials);
    let userDetails = "";
    if(isValid)  {
      console.log("valid");
      userDetails = await getUserDetails(credentials.username);
      await updateUserStatus(userDetails.id, true);
      userDetails = await getUserDetails(credentials.username);

      console.log(userDetails);
    } else {
      console.log("not valid");
    }
    // Emit the login result back to the client
    console.log("Emitting: " + (isValid ? 'Login successful!' : 'User not found'));
    socket.emit('loginResult', {
      success: isValid,
      message: (isValid ? 'Login successful!' : 'User not found'),
      user: userDetails,
    });
  });

  // Handle login event
  socket.on('logout', async (credentials) => {
    // Check username and password (implement your authentication logic)
    const isValid = await checkCredentials(credentials);
    let userDetails = "";
    if(isValid)  {
      console.log("valid");
      userDetails = await getUserDetails(credentials.username);
      await updateUserStatus(userDetails.id, false);
      userDetails = await getUserDetails(credentials.username);

      console.log(userDetails);
    } else {
      console.log("not valid");
    }
    // Emit the login result back to the client
    console.log("Emitting: " + (isValid ? 'Logout successful!' : 'User not found'));
    socket.emit('logoutResult', {
      success: isValid,
      message: (isValid ? 'Logout successful!' : 'User not found'),
      user: userDetails,
    });
  });

  // Handle other socket events...
  
  // Écoute de l'événement d'ajout de conducteur
  socket.on('conducteurAjoute', (data) => {

    socket.emit('conducteurAjouteNotification', data);
  });
  // Disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

});
let callback = () => console.log("Server running...");
server.listen(3000, callback);


module.exports = app;
