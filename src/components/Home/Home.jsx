import React from 'react'
import './Home.scss'
import Posts from '../Posts/Posts'
import NavBar from '../NavBar/NavBar'
const Home = () => {
  return (
    <div>
      <Posts/>
      <NavBar/>
    </div>
  )
}

export default Home
