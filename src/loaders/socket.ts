import { createServer } from "http";
import { Server } from "socket.io";
import { Container } from "typedi";
import SocketService from "../services/socketService";
import config from "../config";

export default (app) => {
  const server = createServer(app);
  const io = new Server(server);
  const socketService = Container.get(SocketService);

  io.on('connection', (socket) => {
    console.log(`connected on socket with id ${socket.id}`);

    socket.on('join', (params, callback) => {
    })

    socket.on('createMessage', (message) => {
      console.log(`received ${message}`);
      io.emit('newMessage', "Hello user!Sent from server");
    })

    socket.on('createLocationMessage', (coords) => {
    })

    socket.on('disconnect', () => {
      console.log("disconnected...")
    });
  });
  
  server.listen(config.socketPort, () => {
    console.log(`Socket listening on ${config.socketPort}`);
  })
};