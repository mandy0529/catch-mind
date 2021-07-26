import {getSocket} from './socket';

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

export const disableChat = () => (textForm.style.display = 'none');
export const enableChat = () => (textForm.style.display = 'block');

if (textForm) {
  textForm.addEventListener('submit', handleSubmit);
}
