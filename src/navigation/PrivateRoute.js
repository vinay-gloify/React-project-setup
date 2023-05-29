import React from 'react'
import { Navigate, Outlet} from "react-router-dom";

const PrivateRoute = ({ children }) => {
    let auth = localStorage.getItem('token')
        if(!auth){
            return <Navigate to="/login" />
        }else{
            // auth ? children : <Navigate to="/login" /> //for layout type
           return children ? children : <Outlet/>    //for normal type
        }          
}

export default PrivateRoute