import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from "@material-ui/core";
import loading from "../../images/loading.jpeg"
import Post from './Post/Post.js'

let Posts = ({ setCurrentId }) => {

  let { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return 'No posts';
  return (

    isLoading? (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-10px' }}>

          <img src={loading} style={{ width: '600px' }} />
      </div>) :(
        <Grid style={{display: 'flex',alignItems: 'center', }} container alignItems='stretch' spacing={3}>
          {posts.map((post) =>
          (<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>)
          )}
        </Grid>
      )
  )
}

export default Posts