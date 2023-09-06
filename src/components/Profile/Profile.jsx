import React, { useEffect } from 'react';
import './Profile.scss'; // Importa el archivo de estilos CSS correspondiente
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogged, reset } from '../../features/users/usersSlice';
import NavBar from '../NavBar/NavBar';

const Profile = () => {
  const dispatch = useDispatch();
  const { isSuccessUser, isErrorUser,isLoadingUser, userLogged } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUserLogged());
    console.log(userLogged);

  }, []);

  useEffect(() => {
    if (userLogged) {
      reset();
    }
    console.log(userLogged);
  }, [userLogged]);
useEffect(() => {
  if (isSuccessUser) {
    dispatch(reset());
  }
}, [isSuccessUser]);
  return (
   <>
   {isErrorUser ? (
     <p>Ha habido un error al encontrar el usuario</p>
   ): isLoadingUser ? (
     <p>Cargando...</p>
   ): userLogged ? (
    <div>
      <div className="profile">
      <div className="profile-header">
        <img src={`http://localhost:8080/uploads/${userLogged.profileImage}`} alt={userLogged.username} />
        <h1>{userLogged.name}</h1>
        <p>@{userLogged.username}</p>
      </div>
      <div className="profile-bio">
        <p>{userLogged.bio}</p>
      </div>
      <div className="profile-stats">
        <div className="stats-item">
          <strong>{userLogged.posts.length}</strong> Publicaciones
        </div>
        <div className="stats-item">
          <strong>{userLogged.followers.length}</strong> Seguidores
        </div>
        <div className="stats-item">
          <strong>{userLogged.following.length}</strong> Siguiendo
        </div>
      </div>
      <div className="profile-posts">
        {userLogged.posts.map((post) => (
          <div className="post" key={post._id}>
            <h2>{post.name}</h2>
            <img src={`http://localhost:8080/uploads/${post.image}`} alt={post.name} />
            <p>Likes: {post.likes ? post.likes.length : 0}</p>
          </div>
        ))}
      </div>
      <NavBar />
      {/* Aquí podrías agregar más contenido, como las publicaciones del usuario */}
        </div>
    </div>
   ) : null}
   </>
  );
};

export default Profile;
