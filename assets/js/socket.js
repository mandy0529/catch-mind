import {handleDisconnected, handleNotification} from './notification';

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (newSocket) => (socket = newSocket);
export const initSocket = (newSocket) => {
  const {minji} = window;
  updateSocket(newSocket);
  newSocket.on(minji.newUser, handleNotification);
  newSocket.on(minji.disconnected, handleDisconnected);
};
