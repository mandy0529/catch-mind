const paintingNotification = (text, color, fontColor) => {
  const notifications = document.getElementById('jsNoti');
  const div = document.createElement('div');
  div.innerText = text;
  div.style.backgroundColor = color;
  div.style.color = fontColor;
  notifications.appendChild(div);
};
export const handleNotification = ({nickname}) => {
  paintingNotification(`"${nickname}" joined!`, 'blue', 'white');
};
export const handleDisconnected = ({nickname}) => {
  paintingNotification(`"${nickname}" left`, 'red', 'white');
};
