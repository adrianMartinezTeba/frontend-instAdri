import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unFollow, getUserById, reset,getUserLogged } from '../../features/users/usersSlice';
import { useParams } from 'react-router-dom';
import './User.scss';

const User = () => {
  const dispatch = useDispatch();
  const [btnFollow, setBtnFollow] = useState(false);
  const { userLogged, user, isSuccessUser, isErrorUser, isLoadingUser } = useSelector((state) => state.users);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getUserLogged());
  }, [dispatch, id]);

  useEffect(() => {
    if (userLogged && user) {
      // Verificar si el usuario logueado sigue al usuario del perfil
      console.log(userLogged);
      console.log(user._id);
      const isFollowing = userLogged.following.includes(user._id);
      console.log(isFollowing);
      setBtnFollow(isFollowing);
    }
  }, [userLogged, user]);

  useEffect(() => {
    if (isSuccessUser) {
      dispatch(reset());
    }
  }, [isSuccessUser]);
useEffect(() => {
  
},[btnFollow])
const handleFollow = async (id) => {
  try {
    await dispatch(follow(id));
    await dispatch(getUserById(id));
    setBtnFollow(true); // Actualiza el estado local
  } catch (error) {
    console.error('Error al seguir al usuario', error);
    // Puedes mostrar un mensaje de error o realizar otras acciones aquí
  }
}

const handleUnFollow = async (id) => {
  try {
    await dispatch(unFollow(id));
    await dispatch(getUserById(id));
    setBtnFollow(false); // Actualiza el estado local
  } catch (error) {
    console.error('Error al dejar de seguir al usuario', error);
    // Puedes mostrar un mensaje de error o realizar otras acciones aquí
  }
}

  return (
    <div className="user-profile">
      {isErrorUser ? (
        <p>Ha habido un error al encontrar el usuario</p>
      ) : isLoadingUser ? (
        <p>Cargando...</p>
      ) : user ? (
        <div>
          <div className="profile-header">
            <img src={`http://localhost:8080/uploads/${user.profileImage}`} alt={user.username} />
            <h1>{user.name}</h1>
            <p>@{user.username}</p>
          </div>
          <div className="profile-bio">
            <p>{user.bio}</p>
          </div>
          <div className="profile-stats">
            <div className="stats-item">
              <strong>{user.posts?.length}</strong> Publicaciones
            </div>
            <div className="stats-item">
              <strong>{user.followers?.length}</strong> Seguidores
            </div>
            <div className="stats-item">
              <strong>{user.following?.length}</strong> Siguiendo
            </div>
          </div>
         <button onClick={() => (btnFollow ? handleUnFollow(user._id) : handleFollow(user._id))}>
            {btnFollow ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default User;
