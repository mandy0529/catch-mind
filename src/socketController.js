import minji from './events';

let sockets = [];
let inProgress = false;

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
      const leader = chooseLeader();
    }
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
    startGame();
  });
  socket.on(minji.disconnect, () => {
    sockets = sockets.filter((leftSocket) => leftSocket.id !== socket.id);
    broadcast(minji.disconnected, {nickname: socket.nickname});
    superBroadcast(minji.playerUpdate, {sockets});
  });
  socket.on(minji.sendMsg, ({message}) => {
    broadcast(minji.newMsg, {message, nickname: socket.nickname});
  });

  socket.on(minji.beginPath, ({x, y}) => broadcast(minji.beganPath, {x, y}));

  socket.on(minji.strokePath, ({x, y, color}) => {
    broadcast(minji.strokedPath, {x, y, color});
    console.log(x, y);
  });
  socket.on(minji.fill, ({color}) => {
    broadcast(minji.filled, {color});
  });
};

export default socketController;
