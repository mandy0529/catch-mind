import {getSocket} from './socket';

const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const mode = document.getElementById('jsMode');
const controls = document.getElementById('controls');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

const beginPath = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const strokePath = (x, y, color = null) => {
  let currentColor = ctx.strokeStyle;
  if (color !== null) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentColor;
};

const filledPath = (color = null) => {
  let currentColor = ctx.fillStyle;
  if (color !== null) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = currentColor;
};

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    beginPath(x, y);
    getSocket().emit(window.minji.beginPath, {x, y});
  } else {
    strokePath(x, y);
    getSocket().emit(window.minji.strokePath, {x, y, color: ctx.strokeStyle});
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function handleCanvasClick() {
  if (filling) {
    filledPath();
    getSocket().emit(window.minji.fill, {color: ctx.fillStyle});
  }
}

function handleCM(event) {
  event.preventDefault();
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
);

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

export const handleBeganPath = ({x, y}) => beginPath(x, y);
export const handleStrokedPath = ({x, y, color}) => {
  strokePath(x, y, color);
};
export const handleFilledPath = ({color}) => filledPath(color);
export const disableCanvas = () => {
  canvas.removeEventListener('mousemove', onMouseMove);
  canvas.removeEventListener('mousedown', startPainting);
  canvas.removeEventListener('mouseup', stopPainting);
  canvas.removeEventListener('mouseleave', stopPainting);
  canvas.removeEventListener('click', handleCanvasClick);
  canvas.removeEventListener('contextmenu', handleCM);
};
export const enableCanvas = () => {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
};
export const hideCanvasControls = () => (controls.style.display = 'none');
export const showCanvasControls = () => (controls.style.display = 'block');
export const resetCanvas = () => filledPath('white');
if (canvas) {
  hideCanvasControls();
}
