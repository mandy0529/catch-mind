import {disableChat, enableChat} from './chat';
import {
  disableCanvas,
  hideCanvasControls,
  enableCanvas,
  showCanvasControls,
  resetCanvas,
} from './paint';

const board = document.getElementById('playerBoard');
const leaderNotification = document.getElementById('leaderNotification');
const noticeTime = document.getElementById('timeOut');
const list = document.getElementById('textList');

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

let timer = undefined;
const DURATION_TIME = 10;

const startGameTimer = () => {
  let remainingtime = DURATION_TIME;
  updateTimer(remainingtime);
  if (remainingtime <= 0) {
    clearInterval(timer);
    return;
  }
  timer = setInterval(() => {
    return updateTimer(--remainingtime);
  }, 1000);
  noticeTime.style.display = 'block';
};

const updateTimer = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  noticeTime.innerText = `${minutes} : ${seconds}`;
  noticeTime.style.display = 'block';
};
const resetTimer = () => {
  if (timer !== undefined) {
    clearInterval(timer);
  }
};

const resetChat = () => {};

export const handlePlayerUpdate = ({sockets}) => addPlayers(sockets);
export const handleGameStarted = () => {
  console.log('game started!!');
  resetTimer();
  setNotification('');
  disableCanvas();
  hideCanvasControls();
  enableChat();
  startGameTimer();
  updateTimer();
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
  resetTimer();
};
export const handleStartNotification = () => {
  setNotification('✅ game will start in 3 secs!');
};
