import React, { useState, useEffect } from 'react'
import { TextField, Typography, Paper } from '@material-ui/core';
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js"
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider,Button } from '@mui/material';

const theme = createTheme({
  palette: {
    homelander:{
      main:'rgb(7,28,61)',
      contrastText:'rgb(255,255,255)'
    },
    starlight:{
      main:'rgb(229,230,224)',
      contrastText:'rgb(189,165,51)'
    }
  },
});

let Form = ({ currentId, setCurrentId }) => {
  // let [postData, setPostData] = useState({creator: '',title: '',message: '',tags: '',selectedFile: '' });
  let [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  let post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem('profile'));
  let history = useNavigate();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post])

  let stateKey;

  let handleSubmit = (e) => {
    e.preventDefault();
    // if(postData.creator===''||postData.title===''||postData.message===''||postData.tags===''||postData.selectedFile===''){
    if (postData.title === '' || postData.message === '' || postData.tags === '' || postData.selectedFile === '') {
      alert("Please fill in all the fields");
      return;
    }
    if (currentId != null) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }, user));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  }

  if (!user?.result?.name) {
    return (
      <Paper style={{ padding: '6px' }}>
        <Typography variant='h6' align='center'>
          Please Sign in First
        </Typography>
      </Paper>
    )
  }


  let clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: "" });
    // setPostData({creator: '',title: '',message: '',tags: '',selectedFile: ""});
    // window.location.reload(false);
    // window.location.reload(false);    // document.getElementById("fileInput").value=" ";
  }
  return (
    <Paper style={{ padding: '6px' }} elevation={6}>
      <form autoComplete="off" noValidate style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '8px' }} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Create a Supe( Post)'}</Typography>
        {/* <TextField name='creator' variant='outlined' label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
        <TextField name='title' style={{ marginTop: '10px' }} required variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name='message' style={{ marginTop: '10px' }} required variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name='tags' style={{ marginTop: '10px' }} required variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

        <div style={{ width: '97%', margin: '10px 0', }}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          <ThemeProvider theme={theme}>
          <Button onClick={handleSubmit} style={{ marginTop: "20px", marginBottom: '10px' }} variant="contained" color="homelander" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="starlight" style={{ marginTop: "10px" }} size="small" onClick={clear} fullWidth>Clear</Button>
          </ThemeProvider>
        </div>
      </form>

    </Paper>
  )
}

export default Form