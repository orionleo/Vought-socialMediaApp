import React from 'react'
import { useNavigate } from "react-router-dom"
function NotFound() {
    const history = useNavigate();
    setTimeout(() => {
        history('/');
    }, 4000)

    return (
        <div>NotFound</div>
    )
}

export default NotFound