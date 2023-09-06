import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.scss';
const navBar = () => {
  return (
    <div className='navBar-container'>
      <div className='links-container'>
        <Link className='navBar-item' to={'/home'}>Home</Link>
        <Link className='navBar-item' to={'/register'}>Lupa</Link>
        <Link className='navBar-item' to={'/newPost'}>Subir post</Link>
        <Link className='navBar-item' to={'/explorer'}>Explorer</Link>
        <Link className='navBar-item' to={'/profile'}>Profile</Link>

      </div>
    </div>
  )
}

export default navBar