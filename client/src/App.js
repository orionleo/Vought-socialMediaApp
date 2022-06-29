import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { getPosts } from "./actions/posts.js"
import { BrowserRouter, Routes,useLocation, Route, Navigate } from 'react-router-dom';


import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';
import NavBar from './components/navBar/NavBar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import PostDetails from './components/PostDetails/PostDetails.jsx';
import Profile from './components/Profile/Profile.js';
import ChangePassword from './components/ChangePassword/ChangePassword.js';
import WrongPassword from './components/MemePages/WrongPassword.js';
import SamePasswords from './components/MemePages/SamePasswords.js';
import NotLoggedIn from './components/MemePages/NotLoggedIn.js';
import ChangedPassword from './components/MemePages/ChangedPassword.js';


function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter >
      <Container maxwidth="lg">
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Navigate replace to="/posts" />} />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search?searchQuery=none&tags=' exact element={<Navigate replace to="/posts" />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/profile' exact element={<Profile />} />
          <Route path='/posts/:id' exact element={<PostDetails />} />
          <Route path='/ChangePassword' exact element={<ChangePassword />} />
          <Route path='/wrongPassword' exact element={<WrongPassword />} />
          <Route path='/samePasswords' exact element={<SamePasswords />} />
          <Route path='/NotLoggedIn' exact element={<NotLoggedIn />} />
          <Route path={`/ChangedPassword}`} exact element={<ChangedPassword />} />
          {!user?<Route path='/auth' exact element={<Auth />} />:<Route path='/auth' exact element={<Navigate replace to="/posts" />} />}
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;