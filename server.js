//run node server.js to run me.
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');
  // console.log('adapter ', io.sockets.adapter);
  console.log('handshake', io.sockets.handshake);

  socket.on('joinRoom', (data) => {
    socket.join(data.room);
  });

  socket.on('getRooms', () => {
    const rooms = io.sockets.adapter.rooms;
    const roomlist = {};

    for (let [key, value] of rooms) {
      roomlist[key] = value.size;
      // console.log('key', key, 'value', value.size);
    }

    console.log('roomlist: ', roomlist);

    io.emit('roomList', roomlist);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log(`Server listening on port ${4000}`);
});
