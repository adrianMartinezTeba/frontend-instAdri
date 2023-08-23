import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
const Wellcome = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
      console.log(user);
setTimeout(() => {
  if (user) {
    navigate('/home')
  }else{
    navigate('/login')
  }  
}, 2000);
    },[])
  return (
    <div>
      <h2>InstAdri</h2>
    </div>
  )
}

export default Wellcome
