const notifications = document.getElementById('jsNoti');

const paintingNotification = (text, color, fontColor) => {
  const notification = document.createElement('div');
  const div = document.createElement('div');
  div.innerText = text;
  div.style.backgroundColor = color;
  div.style.color = fontColor;
  div.className = 'alert';
  notification.appendChild(div);
  notifications.appendChild(notification);
};
export const handleNotification = ({nickname}) => {
  paintingNotification(`"${nickname}" joined!`, 'blue', 'white');
};
export const handleDisconnected = ({nickname}) => {
  paintingNotification(`"${nickname}" left`, 'red', 'white');
};
