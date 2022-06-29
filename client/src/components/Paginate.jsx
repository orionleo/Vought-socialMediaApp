import React,{useState,useEffect} from 'react'
import {Pagination,PaginationItem} from '@mui/material';
import useStyles from "./styles.js"
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"

import { getPosts } from '../actions/posts.js';

function Paginate({page}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {numberOfPages} = useSelector((state)=>state.posts);

  useEffect(()=>{
    if(page){
      dispatch(getPosts(page));
    }
  },[page])
  return (
    <Pagination 
      style={{ul:{justifyContent:'space-around'},justifyContent:'center',display:'flex',alignItems:'center'}}
      count={numberOfPages}
      page={Number(page)||1}
      variant='outlined'
      color='primary'
      renderItem={(item)=>(
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}  />
      )}

    />
  )
}

export default Paginate