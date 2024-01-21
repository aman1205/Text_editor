const express = require('express');
const app = express();
const { createServer } = require("http");
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const UserRouter = require('./routes/user')
const { Server } = require("socket.io");
const { Try } = require('@mui/icons-material');


const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

// Mongo DB Connections
mongoose.connect(process.env.MONGO_DB_URL, {
}).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});

//Attached Socekt server with express
// io.attachApp(app);

// Middleware Connections
app.use(cors())
app.use(express.json())

// Routes
app.use('/user' , UserRouter)

//Socket Connection 
try {
    io.on("connection", socket => {
        // ...
        console.log("Connected webSocket")
      });
} catch (error) {
    console.warn("Unable to connect Websocket " , error)
}
  
const PORT = process.env.PORT || 5000

// Connection
httpServer.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})