import React from 'react'
import { useDispatch } from "react-redux";
import { setProfileClear } from '../../redux/slices/profileSlice';

const Header = () => {

  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/add-product-form">ProductForm</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/react-hook-form">ReactHookForm</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/yup-react-hook-form">YupReactHookForm</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="/contact-us">Contact Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="/login" onClick={()=> {localStorage.removeItem('token');dispatch(setProfileClear())} }>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header