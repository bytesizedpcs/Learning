const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const authconfig = require('./Auth/auth0-variables');

const app = express();

const pusher = new Pusher({
  appId: authconfig.appId,
  key: authconfig.key,
  secret: authconfig.secret,
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
