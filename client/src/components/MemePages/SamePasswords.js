import React from 'react'
import { useNavigate } from "react-router-dom"
import samePasswords from "../../images/samePasswords.jpeg"
function SamePasswords() {
    const history = useNavigate();

    setTimeout(() => {
        history('/changepassword');
    }, 4700);
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-10px' }}>

            <img src={samePasswords} style={{ width: '480px' }} />
        </div>
    )
}

export default SamePasswords