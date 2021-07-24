import minji from './events';

const socketController = (socket) => {
  const broadcast = (event, data) => {
    socket.broadcast.emit(event, data);
  };
  socket.on(minji.setNickname, ({nickname}) => {
    console.log(`${nickname} joined`);
    socket.nickname = nickname;
    socket.broadcast.emit(minji.newUser, {nickname});
  });
  socket.on(minji.disconnect, ({nickname}) => {
    console.log(`${nickname} disconnected!`);
    broadcast(minji.disconnected, {nickname: socket.nickname});
  });
};

export default socketController;
