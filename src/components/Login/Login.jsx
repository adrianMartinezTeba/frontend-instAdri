import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/users/usersSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { isSuccess, message, isError,user } = useSelector((state) => state.users);
  
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(()=>{
    console.log(user);
  },[])
  useEffect(()=>{
if (isSuccess) {
  navigate('/home')
  dispatch(reset())
  console.log(isSuccess);
}
  },[isSuccess])

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Email:</label>
          <input type="email" name='email' value={email} onChange={onChange} placeholder='email' />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" name="password" value={password} onChange={onChange} placeholder='password' />
        </div>
        <button type="submit">Iniciar sesión</button>
        <p>Si no tienes cuenta registrate haciendo click <Link to={'/register'}>aqui</Link></p>
        <p>O entra como invitado <Link to={'/home'}>aquí</Link></p>
      </form>
    </div>
  );
};

export default Login;