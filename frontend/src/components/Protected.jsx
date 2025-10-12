import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

function Protected({ children }) {
    const token = Cookies.get('token') 
    

    // console.log("Token:", token)

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default Protected
