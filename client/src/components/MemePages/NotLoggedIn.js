import React from 'react'
import { useNavigate } from "react-router-dom"
import notLoggedIn from "../../images/notLoggedIn.jpeg"
import alreadyLoggedIn from "../../images/alreadyLoggedIn.jpeg"

function NotLoggedIn() {
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    let loggedIn = false;

    
    if (user != null) {
        setTimeout(() => {
            history('/');
        }, 4700);
        return (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-10px' }}>
        <img src={alreadyLoggedIn} style={{ width: '800px' }} />
    </div>)
    }
    else {
        setTimeout(() => {
            history('/auth');
        }, 4700);
        loggedIn = false;
        return (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-10px' }}>
            <img src={notLoggedIn} style={{ width: '430px' }} />
        </div>)
    }
}

export default NotLoggedIn