import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Paper, Grid, TextField } from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { useNavigate, useLocation } from 'react-router-dom';
// import { Chip } from "@mui/material"
import ChipInput from 'material-ui-chip-input'
import Paginate from '../Paginate';
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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {

    const query = useQuery();
    const history = useNavigate();
    const local = useLocation();


    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const tagsQuery = query.get('tags');
    

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            //search post
            // console.log('search');
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag != tagToDelete))
    }

    const searchPost = () => {
        if (search.trim() || tags.length > 0) {
            // console.log(search.trim());
            // console.log(tags);
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history('/');
        }
    }

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch])
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar style={{borderRadius: 4,marginBottom: '1rem',display: 'flex',padding: '16px',}} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                onKeyPress={handleKeyPress}
                                label="Search Among Supes..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value) }}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onKeyPress={handleKeyPress}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                variant='outlined'
                                label='Search Tags...'
                            />
                            <ThemeProvider theme={theme}>
                            <Button
                                onClick={searchPost}
                                variant='contained'
                                color='homelander'
                            >Search</Button>
                            </ThemeProvider>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper style={{ borderRadius: 4,marginTop: '1rem',padding: '16px',}} elevation={6}>
                                <Paginate page={Number(page)} />
                            </Paper>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home