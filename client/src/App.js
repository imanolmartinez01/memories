import React, { useState } from 'react'

import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as dotenv from 'dotenv'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  dotenv.config();

  return (
    <GoogleOAuthProvider  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <BrowserRouter>
        <Container maxwidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />}/>
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exxact component={PostDetails}/>
            <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App;