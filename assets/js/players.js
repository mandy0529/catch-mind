import {disableChat} from './chat';
import {
  disableCanvas,
  hideCanvasControls,
  enableCanvas,
  showCanvasControls,
  resetCanvas,
} from './paint';
const board = document.getElementById('playerBoard');
const leaderNotification = document.getElementById('leaderNotification');

const setNotification = (text) => {
  leaderNotification.innerText = '';
  leaderNotification.innerText = text;
};
const addPlayers = (players) => {
  board.innerText = '';
  players.forEach((player) => {
    const userPlayer = document.createElement('div');
    userPlayer.innerText = `${player.nickname} : ${player.point}  `;
    board.appendChild(userPlayer);
  });
};
export const handlePlayerUpdate = ({sockets}) => addPlayers(sockets);
export const handleGameStarted = () => {
  setNotification('');
  disableCanvas();
  hideCanvasControls();
};
export const handleLeaderNotification = ({word}) => {
  enableCanvas();
  showCanvasControls();
  setNotification(`you are leader. keyword : ${word}`);
  disableChat();
};
export const handleGameEnded = () => {
  setNotification(`✋🏻 game ended!`);
  disableCanvas();
  hideCanvasControls();
  resetCanvas();
};
export const handleStartNotification = () => {
  setNotification('✅ game will start in 3 secs!');
};
