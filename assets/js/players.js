const board = document.getElementById('playerBoard');

const addPlayers = (players) => {
  board.innerText = '';
  players.forEach((player) => {
    const userPlayer = document.createElement('div');
    userPlayer.innerText = `${player.nickname} : ${player.point} point  `;
    board.appendChild(userPlayer);
  });
};
export const handlePlayerUpdate = ({sockets}) => addPlayers(sockets);
