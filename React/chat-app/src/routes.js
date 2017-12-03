import React from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import history from './history';

import Auth from './Auth/Auth';
import Profile from './Profile/Profile';
import Chat from './Chat/Chat';
import Callback from './Callback/Callback';

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <BrowserRouter history={history} component={App}>
      <div>
        {/* '/' route */}
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        {/* 'Homepage route */}
        <Route path="/home" render={(props) => <App auth={auth} {...props} />} />
        {/* 'Chat route */}
        <Route path="/chat" render={(props) => (
          !auth.isAuthenticated() ? (
            <Redirect to="/home"/>
          ) : (
            <Chat auth={auth} {...props} />
          )
        )} />
        {/* 'Profile' route */}
        <Route path="/profile" render={(props) => (
          !auth.isAuthenticated() ? (
            <Redirect to="/home" />
          ) : (
            <Profile auth={auth} {...props} />
          )
        )} />
        {/* 'Callback' route */}
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />
        }} />
      </div>
    </BrowserRouter>
  );
};

export default makeMainRoutes;
