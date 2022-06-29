import React, { useState, useEffect } from 'react'
import { TextField, Typography, Paper, Avatar } from '@material-ui/core';
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../actions/auth.js"
import { createTheme, ThemeProvider, Button } from '@mui/material';
import Input from "./Input.js"
import googleAccountPassword from "../../images/gooleAccountPassword.jpeg"
import NotLoggedIn from '../MemePages/NotLoggedIn.js';

const theme = createTheme({
  palette: {
    homelander: {
      main: 'rgb(7,28,61)',
      contrastText: 'rgb(255,255,255)'
    },
    starlight: {
      main: 'rgb(229,230,224)',
      contrastText: 'rgb(189,165,51)'
    }
  },
});

const initialState = { oldPassword: '', newPassword: '', confirmNewPassword: '' };

let ChangePassword = () => {
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem('profile'));
  const history = useNavigate();

  const [passwordForm, setPasswordForm] = useState(initialState);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  if (!user?.result?.name) {
    return <NotLoggedIn />;
  }
  const isCustom = user.token.length < 500;

  

  let handleSubmit =  (e) => {
    e.preventDefault();
    if(passwordForm.confirmNewPassword!=passwordForm.newPassword){
      alert("new passwords don't match");
    }
    user.newPassword = passwordForm.newPassword;
    user.result.password = passwordForm.oldPassword;
    dispatch(changePassword(user.result._id,user,history));

  }

  if (!isCustom) {
    setTimeout(() => {
      history('/');
    }, 4700);
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-10px' }}>
        <img src={googleAccountPassword} style={{ width: '600px' }} />
      </div>
    )
  }

  const handleShowOldPassword = (e) => {
    setShowOldPassword((prevShowOldPassWord) => !prevShowOldPassWord)
  }
  const handleShowNewPassword = (e) => {
    setShowNewPassword((prevShowNewPassWord) => !prevShowNewPassWord)
  }

  const handleChange = (e) => {
    e.preventDefault();
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  };
  let clear = () => {
    history('/');
  }
  return (
    <Paper style={{ padding: '6px', width: '40%', height: '10%', margin: '0px auto' }} elevation={6}>
      <form autoComplete="off" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '8px' }} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">{`Vought! Here we help you correct your mistakes 😉`} </Typography>
          <Typography variant="h6"> {`${user.result.name.split(' ')[0][0].toUpperCase()}${user.result.name.split(' ')[0].substring(1)}`}</Typography>
          <Typography variant="subtitle2">{`(Change your password)`}</Typography>
          <Avatar
            alt={user.result.name}
            style={{ height: '96px', width: '96px', margin: '20px 0px', color: 'white', fontSize: "60px", backgroundColor: 'black' }}
            src={user.result.imageUrl || user.result.name.charAt(0)}
          />
        </div>
        <Input name="oldPassword" label="Enter your old Password"
          handleChange={handleChange}
          value={passwordForm.oldPassword}
          type={showOldPassword ? "text" : "password"}
          handleShowPassword={handleShowOldPassword}
        />
        <Input name="newPassword" label="Enter your new password"
          value={passwordForm.newPassword}
          handleChange={handleChange}
          type={showNewPassword ? "text" : "password"}
          handleShowPassword={handleShowNewPassword}
        />
        <Input name="confirmNewPassword" label="Confirm your new passsword"
          value={passwordForm.confirmNewPassword}
          handleChange={handleChange}
          type={showNewPassword ? "text" : "password"}
          handleShowPassword={handleShowNewPassword}
        />

        <div style={{ width: '97%', margin: '10px 0', }}>
          <ThemeProvider theme={theme}>
            <Button style={{ marginBottom: '10px', }} variant="contained" color="homelander" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="starlight" style={{ marginTop: "10px" }} size="small" onClick={clear} fullWidth>Go Home</Button>
          </ThemeProvider>
        </div>
      </form>

    </Paper>
  )
}

export default ChangePassword