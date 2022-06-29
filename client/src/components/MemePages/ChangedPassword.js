import React from 'react'
import { useNavigate } from "react-router-dom"
import changedPassword from "../../images/changedPassword.jpeg"

function ChangedPassword() {
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    setTimeout(() => {
        history('/');
    }, 4700);
    return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-10px' }}>
        <img src={changedPassword} style={{ width: '480px' }} />
    </div>
    )
}

export default ChangedPassword