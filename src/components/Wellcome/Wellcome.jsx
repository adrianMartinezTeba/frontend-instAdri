import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
const Wellcome = () => {
    const navigate = useNavigate()
    useEffect(()=>{
      
setTimeout(() => {
    navigate('/login')
}, 2000);
    },[])
  return (
    <div>
      <h2>InstAdri</h2>
    </div>
  )
}

export default Wellcome
