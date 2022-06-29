import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { deletePost, likePost } from "../../../actions/posts.js"


let Post = ({ post, setCurrentId }) => {
  const history = useNavigate();


  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [likes, setLikes] = useState(post.likes);

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);
  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(likes.filter((id) => id != userId));
    }
    else {
      setLikes([...post.likes, userId]);
    }

  }

  const Like = () => {
    if (likes.length > 0) {
      return likes.find((like) => like ==userId)
        ? (
          <>
            <ThumbUpIcon fontSize='small' /> &nbsp;{likes.length > 2 ? `${likes.length} like${likes.length > 1 ? 's' : ''}` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
          </>
        ) : <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
    }
    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  }
  const openPost = () => {
    history(`/posts/${post._id}`);
  }

  return (
    <Card style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',borderRadius: '15px',position: 'relative',}} raised elevation={6}>


      <CardMedia style={{width:'202.5px',paddingTop: '56.25%',backgroundColor: 'rgba(0, 0, 0, 0.5)',backgroundBlendMode: 'darken',}} image={post.selectedFile} title={post.title}></CardMedia>
      <div style={{   position: 'absolute', top: '20px',color: 'white',}}>
        <Typography style={{ fontSize: '15px', marginLeft:'10px'}}>{post.name}</Typography>
        <Typography style={{ fontSize: '12px',marginLeft:'10px' }}>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(userId== post?.creator) && (
        <div style={{position: 'absolute',top: '20px',right: '20px',color: 'white',}}>
          <Button style={{ color: 'white' }} onClick={(e) => {
            e.stopPropagation();
            setCurrentId(post._id);
          }}>
            <MoreHorizIcon style={{ marginLeft: '100px' }} fontSize='default' />
          </Button>
        </div>)
      }

      <ButtonBase style={{padding: '0 16px 8px 16px',display: 'flex',flexDirection:'column',justifyContent: 'space-between',}} onClick={openPost} >
        <div style={{display: 'flex',justifyContent: 'space-between',margin: '20px',}}>
          <Typography style={{ fontSize: '8px' }} color="textSecondary">{post.tags.map((tag) => `#${tag}`)}</Typography>
        </div>
        <Typography style={{padding: '0px',fontSize: '15px'}} gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography style={{ fontSize: '12px' }} color='textSecondary' component='p' gutterBottom>{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions style={{padding: '0 16px 8px 16px',display: 'flex',flexDirection:'column',justifyContent: 'space-between',marginTop: '-30px'}}>
        <div>

          <Button size="small" disabled={!user?.result} color="primary" onClick={handleLike}>
            <Like  />
          </Button>
          {(userId== post?.creator) && (
            <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id));  }}>
              <DeleteIcon fontSize='small' />
              Delete
            </Button>
          )}
        </div>
      </CardActions>

    </Card>
  )
}

export default Post