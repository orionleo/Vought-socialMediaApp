import React,{useState,useRef,useEffect } from 'react'
import {Typography,TextField,Button} from "@material-ui/core"
import {useDispatch} from "react-redux"
import {commentPost} from "../../actions/posts.js"


function Comments({post}) {
    const dispatch = useDispatch();
    const [comments,setComments] = useState(post?.comments);
    const [comment,setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async() =>{
      const finalComment = `${user.result.name}: ${comment}`
      setComment('');
      const newComments = await dispatch(commentPost(finalComment,post._id));
      setComments(newComments);

      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  return (
    <div>
      <div style={{ display: 'flex',justifyContent:'space-between'}}>
        <div style={{height: '200px',overflowY: 'auto',marginRight: '30px',}}>
          <Typography gutterBottom variant='h6' >Comments</Typography>
          {comments.map((c,i)=>(
            <Typography key = {i} gutterBottom variant='subtitle1'>
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
          </Typography>
          ))}
        <div ref = {commentsRef} />
        </div>
        {user!=null? (<div style={{width:'70%'}}>
        <Typography gutterBottom variant='h6'>Write a Comment</Typography>
        <TextField 
        fullWidth
        minRows={4}
        variant='outlined'
        label='Comment'
        multiline
        value={comment}
        onChange={(e)=>{e.preventDefault();setComment(e.target.value)}}
        />
        <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} variant = 'contained' color='primary' onClick={handleClick}>
          Comment
        </Button>
        </div>):(
          <h1>Log In to comment</h1>
        )}
      </div>
    </div>
  )
}

export default Comments