import React, { useEffect } from 'react';
import './Profile.scss'; // Importa el archivo de estilos CSS correspondiente
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, reset } from '../../features/users/usersSlice';
const Profile = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError, user } = useSelector((state) => state.users);
useEffect(()=>{
dispatch(getUserInfo())
},[])
useEffect(()=>{
if (user) {
  reset()
}
console.log(user);
},[user])
  return (
    <div className="profile">
      <div className="profile-header">
      <img src={`http://localhost:8080/uploads/${user.profileImage}`} alt={user.name} />
        <h1>Nombre de Usuario</h1>
        <p>{user.username}</p>
      </div>
      <div className="profile-bio">
        <p>Descripción del usuario</p>
        <p>{user.bio}</p>
      </div>
      <div className="profile-stats">
        <div className="stats-item">
          <strong>123</strong> Publicaciones
        </div>
        <div className="stats-item">
          <strong>456</strong> Seguidores
        </div>
        <div className="stats-item">
          <strong>789</strong> Siguiendo
        </div>
      </div>
      {/* Aquí podrías agregar más contenido, como las publicaciones del usuario */}
    </div>
  );
};

export default Profile;
