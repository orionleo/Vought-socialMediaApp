import React, { useState, useEffect } from 'react'
import { TextField, Typography, Paper, Avatar } from '@material-ui/core';
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../actions/auth.js"
import { createTheme, ThemeProvider, Button } from '@mui/material';

const theme = createTheme({
  palette: {
    homelander: {
      main: 'rgb(7,28,61)',
      contrastText: 'rgb(255,255,255)'
    },
    starlight: {
      main: 'rgb(229,230,224)',
      contrastText: 'rgb(189,165,51)'
    },
    greenLantern:{
      main:'rgb(36,84,38)',
      contrastText:'rgb(255,255,255)'
    }
  },
});

const initialState = { name: '', email: '', selectedFile: '' };
let Profile = () => {
  // let [profileData, setProfileData] = useState({creator: '',title: '',message: '',tags: '',selectedFile: '' });
  let [profileData, setProfileData] = useState(initialState);
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem('profile'));
  const [isExpanded, setIsExpanded] = useState(false);
  let history = useNavigate();
  let { authData } = useSelector((state) => state.auth);
  user.isChanged = false;

  const isCustom = user.token.length < 500;


  let handleSubmit = (e) => {
    e.preventDefault();
    if (profileData.selectedFile != '') {
      user.result.imageUrl = profileData.selectedFile;

    }
    if (profileData.name != '') {
      user.result.name = profileData.name;
    }
    if (profileData.email != '') {
      user.result.email = profileData.email;
      user.isChanged = true;
    }
    if (isCustom)
      dispatch(updateUser(user.result._id, user, history));
    else
      dispatch(updateUser(user.result.googleId, user, history));
  }

  if (!user?.result?.name) {
    return (
      <Paper style={{ padding: '6px' }} >
        <Typography variant='h6' align='center'>
          Please Sign in First
        </Typography>
      </Paper>
    )
  }


  let clear = () => {
    history('/');
  }

  return (
    <Paper style={{ padding: '6px', width: '40%', height: '10%', margin: '0px auto' }} elevation={6}>
      <form autoComplete="off" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '8px' }} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">{`Vought! Helping you be the better you`}</Typography>
          <Typography variant="h6"> {`${user.result.name.split(' ')[0][0].toUpperCase()}${user.result.name.split(' ')[0].substring(1)}`}</Typography>
          <Typography variant="subtitle2">{`(Update your Profile)`}</Typography>
          <Avatar
            alt={user.result.name}
            style={{ height: '96px', width: '96px', marginTop: '10px', color: 'white', fontSize: "60px", backgroundColor: 'black' }}
            src={user.result.imageUrl || user.result.name.charAt(0)}
          />
        </div>
        <TextField name='name' style={{ marginTop: '10px' }} variant='outlined' label={user.result.name} fullWidth value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
        {isCustom ?
          (
            <TextField name='email' style={{ marginTop: '10px' }} variant='outlined' label={user.result.email} fullWidth value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
          )
          : null
        }
        <div style={{ width: '97%', margin: '10px 0', }}>
          <Button variant="contained" style={{ marginTop: "10px", }} size="large" onClick={(e) => { setIsExpanded(!isExpanded) }} fullWidth>Upload profile picture</Button>
        </div>
        {isExpanded != false ? (
          <div style={{ width: '97%', margin: '10px 0', }}>

            <FileBase type="file" stlye={{ margin: '0px auto' }} multiple={false} onDone={({ base64 }) => setProfileData({ ...profileData, selectedFile: base64 })} />
          </div>

        ) : null}
        <div style={{ width: '97%', margin: '10px 0', }}>
          <ThemeProvider theme={theme}>
            <Button style={{ marginBottom: '10px', }} variant="contained" color="homelander" size="large" type="submit" fullWidth>Submit</Button>
        {isCustom ?
          (
            <Button variant="contained" color="greenLantern" style={{ marginTop: "10px" }} size="small" onClick={(e)=>{e.preventDefault();history('/changepassword')}} fullWidth>Change your Password</Button>
          )
          : null
        }
            <Button variant="contained" color="starlight" style={{ marginTop: "10px" }} size="small" onClick={clear} fullWidth>Clear</Button>
          </ThemeProvider>
        </div>
      </form>

    </Paper>
  )
}

export default Profile