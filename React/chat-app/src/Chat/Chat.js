import React, { Component } from 'react';
import './Chat.css';
import { FormControl, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Pusher from 'pusher-js';
import { AUTH_CONFIG } from '../Auth/auth0-variables';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      username: '',
      messages: [],
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillMount() {
    this.setState({ username: localStorage.username });

    this.pusher = new Pusher(AUTH_CONFIG.appId, {
      authEndpoint: '/pusher/auth',
      cluster: AUTH_CONFIG.cluster,
      encrypted: true,
    });

    this.chatRoom = this.pusher.subscribe('private-reactchat');
  }

  componentDidMount() {
    this.chatRoom.bind('message', (newMessage) => {
      this.setState({ messages: this.state.messages.concat(newMessage) });
    }, this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  sendMessage(event) {
    event.preventDefault();

    if (this.state.value !== '') {
      axios.post('/message/send', {
        username: this.state.username,
        message: this.state.value,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const messages = this.state.messages;
    const message = messages.map((item) => {
      return (
        <Grid>
          { message }
          <Row className="show-grid">
            <Col xs={12}>
              <div className="chatmessage-container">
                <div key={item.id} className="message-box">
                  <p><strong>{item.username}</strong></p>
                  <p>{item.message}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      );
    });

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            {message}
            <div className="chat-container">
              <form onSubmit={this.sendMessage}>
                <Col xs={5} xsOffset={3}>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter message here"
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={4}>
                  <input className="btn btn-primary" value="Send" type="submit" />
                </Col>
              </form>
              <h4 className="text-center">Welcome, {this.state.username}</h4>
              <h5 className="text-center">Begin chatting here.</h5>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Chat;
