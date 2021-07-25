import {getSocket, minji} from './socket';

const textUl = document.getElementById('textUl');
const textForm = document.getElementById('textForm');

const createMsg = (text, nickname) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class"author">${nickname ? nickname : 'You'}:</span> ${text}
    `;
  textUl.appendChild(li);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const input = textForm.querySelector('input');
  const {value} = input;
  console.log(value);
  getSocket().emit(window.minji.sendMsg, {message: value});
  input.value = '';
  input.focus();
  createMsg(value);
};

export const handleNewMessage = ({message, nickname}) => {
  createMsg(message, nickname);
};

if (textForm) {
  textForm.addEventListener('submit', handleSubmit);
}

// export function handleMessageNotif(data) {
//   const {message, nickname} = data;
//   console.log(`${nickname}: ${message}`);
// }
