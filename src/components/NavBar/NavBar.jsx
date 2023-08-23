import React from 'react'
import { Link } from 'react-router-dom';

const navBar = () => {
  return (
    <div className='navBar-container'>
      <div className='links-container'>
        <Link className='navBar-item' to={'/home'}>Home</Link>
        <Link className='navBar-item' to={'/register'}>Register</Link>
        <Link className='navBar-item' to={'/login'}>Login</Link>
        <Link className='navBar-item' to={'/'}>wellcome</Link>
      </div>
    </div>
  )
}

export default navBar