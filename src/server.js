import express from 'express';
import {join} from 'path';
import socketIO from 'socket.io';
import socketController from './socketController';
import events from './events';

const app = express();

const PORT = 5000;

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'static')));

app.use('/', (req, res) => {
  res.render('home', {minji: JSON.stringify(events)});
});

const server = app.listen(PORT, () =>
  console.log(`✅ my server on http://localhost:${PORT}`)
);
const io = socketIO(server);

io.on('connection', (socket) => socketController(socket));
