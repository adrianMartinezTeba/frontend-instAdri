import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/users/usersSlice';

const Register = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={onChange}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
