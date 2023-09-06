import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Wellcome.scss';

const Wellcome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }, 2000);
  }, []);

  return (
    <div className="container">
      <div className="logo">InstAdri</div>
      <div className="loading-text">Cargando...</div>
      <div className="loader"></div>
    </div>
  );
};

export default Wellcome;
