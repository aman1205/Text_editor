const express = require('express');
const app = express();
const { createServer } = require("http");
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const UserRouter = require('./routes/user')
const Server = require("socket.io");
const Document = require("./models/document")
const cookieParser = require('cookie-parser');



const httpServer = createServer(app);
const io = Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// Mongo DB Connections
mongoose.connect(process.env.MONGO_DB_URL, {
}).then(response => {
    console.log('MongoDB Connection Succeeded.',)
}).catch(error => {
    console.log('Error in DB connection: ' + error.message)
});

// Middleware Connections
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(cookieParser());


// Routes
app.use('/user', UserRouter)
const defaultValue = "";

//Socket Connection 
try {
    io.on("connection", socket => {
        // ...
        console.log("Connected webSocket")

        socket.on("get-document", async documentId => {
            const document = await getDocumentOrCreate(documentId);
            socket.join(documentId)
            socket.emit("load-document", document.data)

            socket.on("send-changes", delta => {
                socket.broadcast.to(documentId).emit("recived-changes", delta)
            })


            socket.on("save-document", async data => {
                await Document.findByIdAndUpdate(documentId, { data })
            })
        })
        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });

    });
} catch (error) {
    console.warn("Unable to connect Websocket ", error.message)
}

const PORT = process.env.PORT || 5000

// Connection
httpServer.listen(PORT, () => {
    console.log('App running in port: ' + PORT)
})

async function getDocumentOrCreate(id) {
    if (id == null) return;
    const data = await Document.findById(id);
    if (data) return data;

    return await Document.create({ _id: id, data: defaultValue })
}