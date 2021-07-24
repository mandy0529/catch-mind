import {initSocket} from './socket';

const nickname_LS = 'nickname';
const body = document.querySelector('body');
const jsLogin = document.getElementById('jsLogin');
const nickname = localStorage.getItem(nickname_LS);

const logout = 'loggedOut';
const login = 'loggedIn';

const userLogin = (nickname) => {
  const socket = io('/');
  socket.emit(window.minji.setNickname, {nickname});
  initSocket(socket);
};

if (nickname === null) {
  body.className = logout;
} else {
  body.className = login;
  userLogin(nickname);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const input = jsLogin.querySelector('input');
  const {value} = input;
  input.value = '';
  localStorage.setItem(nickname_LS, value);
  body.className = login;
  userLogin(value);
}

if (jsLogin) {
  jsLogin.addEventListener('submit', handleFormSubmit);
}
