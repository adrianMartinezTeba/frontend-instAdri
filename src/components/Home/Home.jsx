import React, { useEffect, useState } from 'react'
import './Home.scss'
import Posts from '../Posts/Posts'
import NavBar from '../NavBar/NavBar'
const Home = () => {
//   const [premio,setPremio]=useState([])
//   useEffect(()=>{
// const numsQueTocan = () =>{
//   const numeros = [];
//   while (numeros.length < 6) {
//     const numeroAleatorio = Math.floor(Math.random() * 49) + 1;
//     if (!numeros.includes(numeroAleatorio)) {
//       numeros.push(numeroAleatorio);
//     }
//   }
//   return numeros;
// }
// console.log(numsQueTocan());
//   },[])
  return (
    <div>
      <Posts/>
      <NavBar/>
    </div>
  )
}

export default Home
