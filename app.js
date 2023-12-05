// Importing required modules
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("../ecoride/config/dbconnection.json");
const bodyParser = require("body-parser");
const fournisseurRouter = require("../ecoride/routes/fournisseurr");
const path = require("path");

const { affichesocket } = require("./controllers/fournisseurcontroller");
const fournisseur = require("./models/fournisseur");



// Connecting to MongoDB
mongoose.connect(dbConnection.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected'))
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

    // Setting up Affiche Socket
    socket.on("aff", async(data) => {
        try {
            const result = await affichesocket(data);
            //console.log("Welcome", JSON.stringify(result));
            console.log('Received aff event with result:', result);
            io.emit("aff", result);
        } catch (error) {
            console.error('Error handling "aff" event:', error);
        }
    });

    // Listen for the 'delete' event from the client
    socket.on('delete', async({ entityType, id }) => {
        try {
            // Assuming method to delete by ID
            const deletedEntry = await fournisseur.findByIdAndDelete(id);

            // Emit a confirmation message or updated list of entries
            socket.emit('deleteConfirmation', { entityType, deletedEntry });
        } catch (error) {
            // Handle errors
            console.error('Error deleting entry:', error.message);
            socket.emit('deleteError', { error: error.message });
        }
    });

    // Setting up msg function
    socket.on("msg", (data) => {
        // Assuming there is an 'add' function, you might need to define it
        // add(data.object);
        io.emit("msg", `${data.name}: ${data.object}`);
    });

    // For disconnecting user
    socket.on("disconnect", () => {
        console.log("user disconnect");
        io.emit("msg", "user disconnect");
    });
});

// Starting server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Exporting app for testing
module.exports = app;