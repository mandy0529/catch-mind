import minji from './events';
import {chooseWords} from './words';

let sockets = [];
let inProgress = false;
let word = null;
let leader = null;

const chooseLeader = () => {
  return sockets[Math.floor(Math.random() * sockets.length)];
};

const socketController = (socket, io) => {
  const broadcast = (event, data) => {
    socket.broadcast.emit(event, data);
  };

  const superBroadcast = (event, data) => {
    io.emit(event, data);
  };

  const startGame = () => {
    if (inProgress === false) {
      inProgress = true;
      leader = chooseLeader();
      word = chooseWords();
      setTimeout(() => {
        superBroadcast(minji.gameStarted);
      }, 2000);
      setTimeout(() => {
        io.to(leader.id).emit(minji.leaderNotification, {word});
      }, 3000);
      superBroadcast(minji.startNotification);
    }
  };
  const finishGame = () => {
    inProgress = false;
    superBroadcast(minji.gameEnded);
  };

  const addPoints = (id) => {
    sockets.map((socket) => {
      if (socket.id === id) {
        socket.point += 10;
      }
      return sockets;
    });
    superBroadcast(minji.playerUpdate, {sockets});
  };

  socket.on(minji.setNickname, ({nickname}) => {
    console.log(`${nickname} joined`);
    socket.nickname = nickname;
    sockets.push({
      id: socket.id,
      point: 0,
      nickname: nickname,
    });
    broadcast(minji.newUser, {nickname});
    superBroadcast(minji.playerUpdate, {sockets});
    if (sockets.length === 2) {
      startGame();
    }
  });

  socket.on(minji.disconnect, () => {
    sockets = sockets.filter((leftSocket) => leftSocket.id !== socket.id);
    if (sockets.length === 1) {
      finishGame();
    } else if (leader) {
      if (leader.id === socket.id) {
        finishGame();
      }
    }
    broadcast(minji.disconnected, {nickname: socket.nickname});
    superBroadcast(minji.playerUpdate, {sockets});
  });

  socket.on(minji.sendMsg, ({message}) => {
    if (message === word) {
      superBroadcast(minji.newMsg, {
        message: `winner is ${socket.nickname}, word was " ${word} " `,
        nickname: 'Bot',
      });
      addPoints(socket.id);
      finishGame();
      setTimeout(() => startGame(), 2000);
    } else {
      broadcast(minji.newMsg, {message, nickname: socket.nickname});
    }
  });

  socket.on(minji.beginPath, ({x, y}) => broadcast(minji.beganPath, {x, y}));

  socket.on(minji.strokePath, ({x, y, color}) => {
    broadcast(minji.strokedPath, {x, y, color});
  });

  socket.on(minji.fill, ({color}) => {
    broadcast(minji.filled, {color});
  });
};

export default socketController;
