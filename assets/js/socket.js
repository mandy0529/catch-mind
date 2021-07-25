import {handleDisconnected, handleNotification} from './notification';
import {handleNewMessage} from './chat';
import {handleBeganPath, handleFilledPath, handleStrokedPath} from './paint';
import {handlePlayerUpdate} from './players';
let socket = null;

export const getSocket = () => socket;

export const updateSocket = (newSocket) => (socket = newSocket);
export const initSocket = (newSocket) => {
  const {minji} = window;
  socket = newSocket;
  socket.on(minji.newUser, handleNotification);
  socket.on(minji.disconnected, handleDisconnected);
  socket.on(minji.newMsg, handleNewMessage);
  socket.on(minji.beganPath, handleBeganPath);
  socket.on(minji.strokedPath, handleStrokedPath);
  socket.on(minji.filled, handleFilledPath);
  socket.on(minji.playerUpdate, handlePlayerUpdate);
};
