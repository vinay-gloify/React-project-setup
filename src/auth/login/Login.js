import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="btn btn-success" onClick={() => { navigate('/dashboard'); localStorage.setItem('token', 'true') }}>Login</button>
    </div>
  )
}

export default Login