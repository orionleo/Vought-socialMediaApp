import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Toolbar, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import vought from "../../images/vought.png"
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
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
function NavBar() {
    // console.log(localStorage.getItem('profile'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();
    // console.log(user);


    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history('/');
        window.location.reload(false);
        setUser(null);
    }
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            // console.log(`Minutes left before logging out: ${(decodedToken.exp * 1000 - new Date().getTime())/3600000*60}`);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
                return;
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    return (
        <AppBar style={{
            borderRadius: 15,marginTop:'-5px',marginBottom: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px 50px',
        }} position='static' color='inherit'>
            <div style={{ display: 'flex', alignItems: 'center', }}>
                <a href='/' style={{ textDecoration: "none" }} >
                    <img style={{  marginTop: '5px'}} src={vought} alt="icon" height="80px" />
                </a>
            </div>
            <Toolbar style={{ display: 'flex', justifyContent: 'flex-end', width: '400px', }}>
                {user != null ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '400px', alignItems: 'center', }}>
                        <a href='/profile' style={{ textDecoration: "none" }}><Avatar alt={user?.result.name} style={{color:'white',backgroundColor:'black',height: '56px', width: '56px'}} src={user.result.imageUrl||user?.result.name.charAt(0)} /></a>
                        <Typography style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} variant="h6" >{user.result.name}</Typography>
                        <Button variant="contained" style={{ marginLeft: '20px' }}  onClick={logout}>LogOut</Button>
                    </div>
                ) : (
                    <ThemeProvider theme = {theme}>
                    <a href='/auth' style={{ textDecoration: "none" }}><Button variant='contained' color='homelander'>Sign In</Button></a>
                    </ThemeProvider>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar