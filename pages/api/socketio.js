import { Server } from 'socket.io';
import {
  addUser,
  startGame,
  removeUser,
  pushState,
  handleAction,
  handleChallengeAction,
  handleCounterAction,
  handleChallengeCounterAction,
} from '../../game/game-state';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      socket.on('join', (gameId) => {
        console.log(`Socket ${socket.id} joining ${gameId}`);
        socket.join(gameId);
        pushState(socket, gameId);
      });
      socket.on('chat', (data) => {
        const { message, room } = data;
        console.log(`msg: ${message}, room: ${room}`);
        io.to(room).emit('chat', message);
      });
      socket.on('start-game', (data) => {
        startGame(socket, data.gameId);
      });

      socket.on('add-user', (data) => {
        console.log(`Trying to add user ${JSON.stringify(data)}`);
        // TODO need to mod the global game object to add the users?
        addUser(socket, data.gameId, {
          id: socket.id,
          name: data.username,
        });
        // socket.to(data.gameId).emit("state-update", updatedGameState);
      });

      socket.on('action', (data) => {
        // depending on the action type, call some function in game-state.js and pass the socket
        // so that it can re-emit the updated state
        handleAction(socket, data.gameId, data.action);
      });

      socket.on('challengeAction', (data) => {
        //
        handleChallengeAction(socket, data.gameId, data.action);
      });

      socket.on('counterAction', (data) => {
        handleCounterAction(socket, data.gameId, data.action);
      });

      socket.on('challengeCounterAction', (data) => {
        handleChallengeCounterAction(socket, data.gameId, data.action);
      });

      socket.on('disconnect', () => {
        removeUser(socket);
      });
    });
    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
