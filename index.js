const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const isDev = app.settings.env === 'development'
const URL = isDev ? 'http://localhost:3000': ''
app.use(cors()) // Allow CORS for all origins

const httpServer = createServer(app);

const io = new Server(httpServer, { 
  cors: { 
    origin: "http://localhost:3000", // Specify the origin of your frontend
    transports: ['websocket'] // Specify the transport mechanism to avoid the polling error
  }
});

io.on("connection", (socket) => {
  console.log("server connected");

  socket.on('beginPath', (arg) => {
    socket.broadcast.emit('beginPath', arg);
  });

  socket.on('drawLine', (arg) => {
    socket.broadcast.emit('drawLine', arg);
  });
  socket.on('changeConfig', (arg) => {
   socket.broadcast.emit('changeConfig', arg);
 });
});

httpServer.listen(5000, () => {
  console.log('Server is running on port 5000');
});


