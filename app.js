// Importing required modules
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("../EcoRide/config/dbconnection.json");
const bodyParser = require("body-parser");
const fournisseurRouter = require("../EcoRide/routes/fournisseurr");
const path = require("path");




//question 9
const {

    affichesocket
} = require("./controllers/fournisseurcontroller");



// Connecting to MongoDB
mongoose.connect(dbConnection.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('mongo connecter'))
    .catch((err) => console.log(err));

// Setting up Express app
var app = express();

// Setting up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

// Setting up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Using fournisseur router
app.use("/Fournisseur", fournisseurRouter);

// Creating HTTP server
const server = http.createServer(app);

// Setting up Socket.IO
const io = require("socket.io")(server);
io.on("connection", (socket) => {
    console.log("user connected");
    socket.emit("msg", "user connected");



    // Setting up Afiiche Socket
    socket.on("aff", async(data) => {
        const r = await affichesocket(data);
        console.log("welcome", JSON.stringify(r));
        io.emit("aff", r);
    });


    // Setting p msg function
    socket.on("msg", (data) => {
        add(data.object)
        io.emit("msg", data.name + ":" + data.object);
    });


    // For disconnecting user
    socket.on("disconnect", () => {
        console.log("user disconnect");
        io.emit("msg", "user disconnect");
    })
});

// Starting server
server.listen(3000, () => {
    console.log('serveur run')
});

// Exporting app for testing
module.exports = app;