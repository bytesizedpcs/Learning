const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();

const pusher = new Pusher({
  appId: '439731',
  key: '03cf091129ce43ca5e96',
  secret: 'c1232359b115b3c4e452',
  cluster: 'us2',
  encrypted: true,
});

// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route for sending messages
app.post('/message/send', (req, res) => {
  pusher.trigger('private-reactchat', 'messages', {
    message: req.body.message,
    username: req.body.username,
  });

  res.sendStatus(200);
});

// route for Pusher authentication
app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);

  res.send(auth);
});

// setting port for node
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => {
  console.log('App running on port', app.get('port'));
});
